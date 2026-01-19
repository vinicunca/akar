/* eslint-disable no-console */
/* eslint-disable regexp/no-super-linear-backtracking */

import type { MaybeRef } from 'vue';
import { isFunction, isString } from '@vinicunca/perkakas';
import { useActiveElement, useDebounceFn, useEventListener } from '@vueuse/core';
import { computed, ref, toValue } from 'vue';
import { useKbd } from './use-kbd';

type Handler = (event?: any) => void;

export interface PShortcutConfig {
  handler: Handler;
  usingInput?: string | boolean;
}

export interface PShortcutsConfig {
  [key: string]: PShortcutConfig | Handler | false | null | undefined;
}

export interface PShortcutsOptions {
  chainDelay?: number;
  layoutIndependent?: boolean;
}

interface Shortcut {
  handler: Handler;
  enabled: boolean;
  chained: boolean;
  // KeyboardEvent attributes
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  // code?: string
  // keyCode?: number
}

const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/;
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/;
// keyboard keys which can be combined with Shift modifier (in addition to alphabet keys)
const shiftableKeys = ['arrowleft', 'arrowright', 'arrowup', 'arrowright', 'tab', 'escape', 'enter', 'backspace'];

// Simple key to code conversion for layout independence
function convertKeyToCode(key: string): string {
  // Handle single letters
  if (/^[a-z]$/i.test(key)) {
    return `Key${key.toUpperCase()}`;
  }
  // Handle digits
  if (/^\d$/.test(key)) {
    return `Digit${key}`;
  }
  // Handle function keys
  if (/^f\d+$/i.test(key)) {
    return key.toUpperCase();
  }
  // Handle common special keys
  const specialKeys: Record<string, string> = {
    space: 'Space',
    enter: 'Enter',
    escape: 'Escape',
    tab: 'Tab',
    backspace: 'Backspace',
    delete: 'Delete',
    arrowup: 'ArrowUp',
    arrowdown: 'ArrowDown',
    arrowleft: 'ArrowLeft',
    arrowright: 'ArrowRight',
  };
  return specialKeys[key.toLowerCase()] || key;
}

export function defineShortcuts(config: MaybeRef<PShortcutsConfig>, options: PShortcutsOptions = {}) {
  const chainedInputs = ref<Array<string>>([]);
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length);
  };
  const debouncedClearChainedInput = useDebounceFn(
    clearChainedInput,
    options.chainDelay ?? 800,
  );

  const { macOS } = useKbd();
  const activeElement = useActiveElement();
  const layoutIndependent = options.layoutIndependent ?? false;

  // precompute shiftable codes if layoutIndependent
  const shiftableCodes = shiftableKeys.map(convertKeyToCode);

  const usingInput = computed(() => {
    const tagName = activeElement.value?.tagName;
    const contentEditable = activeElement.value?.contentEditable;

    const usingInput = !!(tagName === 'INPUT' || tagName === 'TEXTAREA' || contentEditable === 'true' || contentEditable === 'plaintext-only');

    if (usingInput) {
      return ((activeElement.value as any)?.name as string) || true;
    }

    return false;
  });

  // Map config to full detailed shortcuts
  const shortcuts = computed<Array<Shortcut>>(() => {
    return Object.entries(toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null;
      }

      // Parse key and modifiers
      let shortcut: Partial<Shortcut>;

      if (key.includes('-') && key !== '-' && !key.includes('_') && !key.match(chainedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }

      if (key.includes('_') && key !== '_' && !key.match(combinedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }

      const chained = key.includes('-') && key !== '-' && !key.includes('_');
      if (chained) {
        // convert each part to code if layoutIndependent, otherwise keep raw key
        if (layoutIndependent) {
          const parts = key.split('-').map((p) => convertKeyToCode(p));
          shortcut = {
            key: parts.join('-'),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
          };
        } else {
          shortcut = {
            key: key.toLowerCase(),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
          };
        }
      } else {
        const keySplit = key.toLowerCase().split('_').map((k) => k);
        let baseKey = keySplit.filter((k) => !['meta', 'command', 'ctrl', 'shift', 'alt', 'option'].includes(k)).join('_');
        if (layoutIndependent) {
          baseKey = convertKeyToCode(baseKey);
        }
        shortcut = {
          key: baseKey,
          metaKey: keySplit.includes('meta') || keySplit.includes('command'),
          ctrlKey: keySplit.includes('ctrl'),
          shiftKey: keySplit.includes('shift'),
          altKey: keySplit.includes('alt') || keySplit.includes('option'),
        };
      }
      shortcut.chained = chained;

      // Convert Meta to Ctrl for non-MacOS
      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false;
        shortcut.ctrlKey = true;
      }

      // Retrieve handler function
      if (isFunction(shortcutConfig)) {
        shortcut.handler = shortcutConfig;
      } else if (typeof shortcutConfig === 'object') {
        shortcut = { ...shortcut, handler: shortcutConfig.handler };
      }

      if (!shortcut.handler) {
        console.trace('[Shortcut] Invalid value');
        return null;
      }

      let enabled = true;
      if (!(shortcutConfig as PShortcutConfig).usingInput) {
        enabled = !usingInput.value;
      } else if (isString((shortcutConfig as PShortcutConfig).usingInput)) {
        enabled = usingInput.value === (shortcutConfig as PShortcutConfig).usingInput;
      }
      shortcut.enabled = enabled;

      return shortcut;
    }).filter(Boolean) as Array<Shortcut>;
  });

  function onKeyDown(event: KeyboardEvent) {
    // Input autocomplete triggers a keydown event
    if (!event.key) {
      return;
    }

    const alphabetKey = layoutIndependent ? /^Key[A-Z]$/i.test(event.code) : /^[a-z]$/i.test(event.key);
    const shiftableKey = layoutIndependent ? shiftableCodes.includes(event.code) : shiftableKeys.includes(event.key.toLowerCase());

    let chainedKey;
    // push either code or key depending on layoutIndependent flag
    chainedInputs.value.push(
      layoutIndependent ? event.code : event.key,
    );
    // try matching a chained shortcut
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join('-');

      for (const shortcut of shortcuts.value.filter((s) => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue;
        }

        if (shortcut.enabled) {
          event.preventDefault();
          shortcut.handler(event);
        }
        clearChainedInput();
        return;
      }
    }

    // try matching a standard shortcut
    for (const shortcut of shortcuts.value.filter((s) => !s.chained)) {
      if (layoutIndependent) {
        // compare by code
        if (event.code !== shortcut.key) {
          continue;
        }
      } else {
        if (event.key.toLowerCase() !== shortcut.key) {
          continue;
        }
      }

      if (event.metaKey !== shortcut.metaKey) {
        continue;
      }
      if (event.ctrlKey !== shortcut.ctrlKey) {
        continue;
      }
      // shift modifier is only checked in combination with alphabet keys and some extra keys
      // (shift with special characters would change the key)
      if ((alphabetKey || shiftableKey) && event.shiftKey !== shortcut.shiftKey) {
        continue;
      }

      if (shortcut.enabled) {
        event.preventDefault();
        shortcut.handler(event);
      }

      clearChainedInput();

      return;
    }

    debouncedClearChainedInput();
  }

  return useEventListener('keydown', onKeyDown);
}

export function extractShortcuts(
  items: Array<any> | Array<Array<any>>,
  separator: '_' | '-' = '_',
) {
  const shortcuts: Record<string, Handler> = {};

  function traverse(items: Array<any>) {
    items.forEach((item) => {
      if (item.kbds?.length && (item.onSelect || item.onClick)) {
        const shortcutKey = item.kbds.join(separator);
        shortcuts[shortcutKey] = item.onSelect || item.onClick;
      }
      if (item.children) {
        traverse(item.children.flat());
      }
      if (item.items) {
        traverse(item.items.flat());
      }
    });
  }

  traverse(items.flat());

  return shortcuts;
}
