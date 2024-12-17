import { isBrowser } from '@vinicunca/perkakas';
import { watchEffect } from 'vue';

const DATA_AKAR_FOCUS_GUARD = 'data-akar-focus-guard';

/** Number of components which have requested interest to have focus guards */
let count = 0;

/**
 * Injects a pair of focus guards at the edges of the whole DOM tree
 * to ensure `focusin` & `focusout` events can be caught consistently.
 */
export function useFocusGuards() {
  watchEffect((cleanupFn) => {
    if (!isBrowser) {
      return;
    }

    const edgeGuards = document.querySelectorAll(`[${DATA_AKAR_FOCUS_GUARD}]`);

    document.body.insertAdjacentElement(
      'afterbegin',
      edgeGuards[0] ?? createFocusGuard(),
    );
    document.body.insertAdjacentElement(
      'beforeend',
      edgeGuards[1] ?? createFocusGuard(),
    );
    count++;

    cleanupFn(() => {
      if (count === 1) {
        document
          .querySelectorAll(`[${DATA_AKAR_FOCUS_GUARD}]`)
          .forEach((node) => {
            node.remove();
          });
      }

      count--;
    });
  });
}

function createFocusGuard() {
  const element = document.createElement('span');
  element.setAttribute(DATA_AKAR_FOCUS_GUARD, '');
  element.tabIndex = 0;
  element.style.outline = 'none';
  element.style.opacity = '0';
  element.style.position = 'fixed';
  element.style.pointerEvents = 'none';

  return element;
}
