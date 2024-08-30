import { isBrowser } from '@vinicunca/perkakas';
import { watchEffect } from 'vue';

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
    const edgeGuards = document.querySelectorAll('[data-akar-focus-guard]');
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
          .querySelectorAll('[data-akar-focus-guard]')
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
  element.setAttribute('data-akar-focus-guard', '');
  element.tabIndex = 0;
  element.style.cssText
    = 'outline: none; opacity: 0; position: fixed; pointer-events: none';
  return element;
}
