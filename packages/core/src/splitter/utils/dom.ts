import type { PanelData } from '../splitter-panel.vue';
import { isBrowser } from '@vinicunca/perkakas';

export function getPanelElement(
  id: string,
  scope: HTMLElement | ParentNode = document,
): HTMLElement | null {
  if (!isBrowser) {
    return null;
  }
  const element = scope.querySelector(`[data-panel-id="${id}"]`);
  if (element) {
    return element as HTMLElement;
  }

  return null;
}

export function getPanelElementsForGroup(
  groupId: string,
  scope: HTMLElement | ParentNode = document,
): Array<HTMLElement> {
  if (!isBrowser) {
    return [];
  }
  return Array.from(
    scope.querySelectorAll(`[data-panel][data-panel-group-id="${groupId}"]`),
  );
}

export function getPanelGroupElement(
  id: string,
  rootElement: HTMLElement | ParentNode = document,
): HTMLElement | null {
  if (!isBrowser) {
    return null;
  }
  // If the root element is the PanelGroup
  if (
    rootElement instanceof HTMLElement
    && (rootElement as HTMLElement)?.dataset?.panelGroupId === id
  ) {
    return rootElement as HTMLElement;
  }

  // Else query children
  const element = rootElement.querySelector(
    `[data-panel-group][data-panel-group-id="${id}"]`,
  );
  if (element) {
    return element as HTMLElement;
  }

  return null;
}

export function getResizeHandleElement(
  id: string,
  scope: HTMLElement | ParentNode = document,
): HTMLElement | null {
  if (!isBrowser) {
    return null;
  }
  const element = scope.querySelector(`[data-panel-resize-handle-id="${id}"]`);
  if (element) {
    return element as HTMLElement;
  }

  return null;
}

export function getResizeHandleElementIndex(
  groupId: string,
  id: string,
  scope: HTMLElement | ParentNode = document,
): null | number {
  if (!isBrowser) {
    return null;
  }
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index = handles.findIndex(
    (handle) => handle.getAttribute('data-panel-resize-handle-id') === id,
  );
  return index ?? null;
}

export function getResizeHandleElementsForGroup(
  groupId: string,
  scope: HTMLElement | ParentNode = document,
): Array<HTMLElement> {
  if (!isBrowser) {
    return [];
  }
  return Array.from(
    scope.querySelectorAll(
      `[data-panel-resize-handle-id][data-panel-group-id="${groupId}"]`,
    ),
  );
}

export function getResizeHandlePanelIds(
  groupId: string,
  handleId: string,
  panelsArray: Array<PanelData>,
  scope: HTMLElement | ParentNode = document,
): [idBefore: null | string, idAfter: null | string] {
  const handle = getResizeHandleElement(handleId, scope);
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index = handle ? handles.indexOf(handle) : -1;

  const idBefore: null | string = panelsArray[index]?.id ?? null;
  const idAfter: null | string = panelsArray[index + 1]?.id ?? null;

  return [idBefore, idAfter];
}
