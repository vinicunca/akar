import type { PanelGroupStorage } from '../a-splitter-group.vue';
import type { PanelData } from '../a-splitter-panel.vue';

/**
 * PanelGroup might be rendering in a server-side environment where localStorage is not available
 * or on a browser with cookies/storage disabled.
 * In either case, this function avoids accessing localStorage until needed,
 * and avoids throwing user-visible errors.
 */
export function initializeDefaultStorage(storageObject: PanelGroupStorage) {
  try {
    if (typeof localStorage !== 'undefined') {
      // Bypass this check for future calls
      storageObject.getItem = (name: string) => {
        return localStorage.getItem(name);
      };

      storageObject.setItem = (name: string, value: string) => {
        localStorage.setItem(name, value);
      };
    } else {
      throw new TypeError('localStorage not supported in this environment');
    }
  } catch (error) {
    console.error(error);

    storageObject.getItem = () => null;
    storageObject.setItem = () => {};
  }
}

export interface PanelConfigurationState {
  expandToSizes: {
    [panelId: string]: number;
  };
  layout: Array<number>;
};

export interface SerializedPanelGroupState {
  [panelIds: string]: PanelConfigurationState;
};

function getPanelGroupKey(autoSaveId: string): string {
  return `akar:${autoSaveId}`;
}

/**
 * Panel ids might be user-provided (stable) or useId generated (non-deterministic)
 * so they should not be used as part of the serialization key.
 * Using the min/max size attributes should work well enough as a backup.
 * Pre-sorting by minSize allows remembering layouts even if panels are re-ordered/dragged.
 */
function getPanelKey(panels: Array<PanelData>): string {
  return panels
    .map((panel) => {
      const { constraints, id, idIsFromProps, order } = panel;
      if (idIsFromProps) {
        return id;
      } else {
        return order
          ? `${order}:${JSON.stringify(constraints)}`
          : JSON.stringify(constraints);
      }
    })
    .sort((a, b) => a.localeCompare(b))
    .join(',');
}

function loadSerializedPanelGroupState(
  { autoSaveId, storage }:
  { autoSaveId: string; storage: PanelGroupStorage },
): null | SerializedPanelGroupState {
  try {
    const panelGroupKey = getPanelGroupKey(autoSaveId);
    const serialized = storage.getItem(panelGroupKey);
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (typeof parsed === 'object' && parsed != null) {
        return parsed as SerializedPanelGroupState;
      }
    }
  } catch {}

  return null;
}

export function loadPanelGroupState(
  { autoSaveId, panels, storage }:
  { autoSaveId: string; panels: Array<PanelData>; storage: PanelGroupStorage },
): null | PanelConfigurationState {
  const state = loadSerializedPanelGroupState({ autoSaveId, storage }) ?? {};
  const panelKey = getPanelKey(panels);
  return state[panelKey] ?? null;
}

export function savePanelGroupState(
  {
    autoSaveId,
    panels,
    panelSizesBeforeCollapse,
    sizes,
    storage,
  }:
  {
    autoSaveId: string;
    panels: Array<PanelData>;
    panelSizesBeforeCollapse: Map<string, number>;
    sizes: Array<number>;
    storage: PanelGroupStorage;
  },
): void {
  const panelGroupKey = getPanelGroupKey(autoSaveId);
  const panelKey = getPanelKey(panels);
  const state = loadSerializedPanelGroupState({ autoSaveId, storage }) ?? {};

  state[panelKey] = {
    expandToSizes: Object.fromEntries(panelSizesBeforeCollapse.entries()),
    layout: sizes,
  };

  try {
    storage.setItem(panelGroupKey, JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
}
