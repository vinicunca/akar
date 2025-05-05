import type { Ref } from 'vue';
import { isBrowser } from '@vinicunca/perkakas';
import { nextTick, ref, watchEffect } from 'vue';
import { handleAndDispatchCustomEvent } from '~~/shared';

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

export const DISMISSABLE_LAYER_NAME = 'DismissableLayer';
export const CONTEXT_UPDATE = 'dismissableLayer.update';
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside';
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside';

const DATA_DISMISSABLE_LAYER = '[data-dismissable-layer]';

function isLayerExist(
  { layerElement, targetElement }:
  {
    layerElement: HTMLElement;
    targetElement: HTMLElement;
  },
) {
  const targetLayer = targetElement.closest(
    DATA_DISMISSABLE_LAYER,
  );

  const mainLayer = layerElement.dataset.dismissableLayer === ''
    ? layerElement
    : layerElement.querySelector(
      DATA_DISMISSABLE_LAYER,
    ) as HTMLElement;

  const nodeList = Array.from(
    layerElement.ownerDocument.querySelectorAll('[data-dismissable-layer]'),
  );

  return (
    targetLayer
    && (
      mainLayer === targetLayer
      || nodeList.indexOf(mainLayer) < nodeList.indexOf(targetLayer)
    )
  );
}

/**
 * Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behavior present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */
export function usePointerDownOutside(
  {
    element,
    onPointerDownOutside,
  }:
  {
    element?: Ref<HTMLElement | undefined>;
    onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  },
) {
  const ownerDocument: Document = element?.value?.ownerDocument ?? globalThis?.document;

  const isPointerInsideDOMTree = ref(false);
  const handleClickRef = ref(() => {});

  watchEffect((cleanupFn) => {
    if (!isBrowser) {
      return;
    }

    async function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | undefined;

      if (!element?.value || !target) {
        return;
      }

      if (isLayerExist({ layerElement: element.value, targetElement: target })) {
        isPointerInsideDOMTree.value = false;
        return;
      }

      if (event.target && !isPointerInsideDOMTree.value) {
        const eventDetail = { originalEvent: event };

        function handleAndDispatchPointerDownOutsideEvent() {
          handleAndDispatchCustomEvent({
            name: POINTER_DOWN_OUTSIDE,
            handler: onPointerDownOutside,
            detail: eventDetail,
          });
        }

        /**
         * On touch devices, we need to wait for a click event because browsers implement
         * a ~350ms delay between the time the user stops touching the display and when the
         * browser executes events. We need to ensure we don't reactivate pointer-events within
         * this timeframe otherwise the browser may execute events that should have been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event
         * isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be
         * certain that it was raised, and therefore cleaned-up.
         */
        if (event.pointerType === 'touch') {
          ownerDocument.removeEventListener('click', handleClickRef.value);
          handleClickRef.value = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener('click', handleClickRef.value, {
            once: true,
          });
        } else {
          handleAndDispatchPointerDownOutsideEvent();
        }
      } else {
        // We need to remove the event listener in case the outside click has been canceled.
        // See: https://github.com/radix-ui/primitives/issues/2171
        ownerDocument.removeEventListener('click', handleClickRef.value);
      }
      isPointerInsideDOMTree.value = false;
    };
    /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is how the DOM works, ie:
     * ```
     * button.addEventListener('pointerdown', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerdown', () => {
     *     console.log('I will also log');
     *   })
     * });
     */
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener('pointerdown', handlePointerDown);
    }, 0);

    cleanupFn(() => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener('pointerdown', handlePointerDown);
      ownerDocument.removeEventListener('click', handleClickRef.value);
    });
  });

  return {
    onPointerDownCapture: () => {
      isPointerInsideDOMTree.value = true;
    },
  };
}

/**
 * Listens for when focus happens outside a DOM subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */
export function useFocusOutside(
  {
    element,
    onFocusOutside,
  }:
  {
    element?: Ref<HTMLElement | undefined>;
    onFocusOutside?: (event: FocusOutsideEvent) => void;
  },
) {
  const ownerDocument: Document = element?.value?.ownerDocument ?? globalThis?.document;

  const isFocusInsideDOMTree = ref(false);
  watchEffect((cleanupFn) => {
    if (!isBrowser) {
      return;
    }

    async function handleFocus(event: FocusEvent) {
      if (!element?.value) {
        return;
      }

      await nextTick();
      await nextTick();

      const target = event.target as HTMLElement | undefined;

      if (
        !element.value
        || !target
        || isLayerExist({
          layerElement: element.value,
          targetElement: target,
        })
      ) {
        return;
      }

      if (event.target && !isFocusInsideDOMTree.value) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent({
          name: FOCUS_OUTSIDE,
          handler: onFocusOutside,
          detail: eventDetail,
        });
      }
    };

    ownerDocument.addEventListener('focusin', handleFocus);

    cleanupFn(() => ownerDocument.removeEventListener('focusin', handleFocus));
  });

  return {
    onFocusCapture: () => {
      isFocusInsideDOMTree.value = true;
    },
    onBlurCapture: () => {
      isFocusInsideDOMTree.value = false;
    },
  };
}

export function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
