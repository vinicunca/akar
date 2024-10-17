<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { createContext } from '~~/shared';

import type { SwipeEvent } from './utils';

export type AToastRootImplEmits = {
  close: [];
  /** Event handler called when the escape key is down. It can be prevented by calling `event.preventDefault`. */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when the dismiss timer is paused. This occurs when the pointer is moved over the viewport, the viewport is focused or when the window is blurred. */
  pause: [];
  /** Event handler called when the dismiss timer is resumed. This occurs when the pointer is moved away from the viewport, the viewport is blurred or when the window is focused. */
  resume: [];
  swipeCancel: [event: SwipeEvent];
  /** Event handler called at the end of a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeEnd: [event: SwipeEvent];
  /** Event handler called during a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeMove: [event: SwipeEvent];
  /** Event handler called when starting a swipe interaction. It can be prevented by calling `event.preventDefault`. */
  swipeStart: [event: SwipeEvent];
};

export interface AToastRootImplProps extends APrimitiveProps {
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `AToastProvider`.
   */
  duration?: number;
  /**
   * The controlled open state of the dialog. Can be bind as `v-model:open`.
   */
  open?: boolean;
  /**
   * Control the sensitivity of the toast for accessibility purposes.
   *
   * For toasts that are the result of a user action, choose `foreground`. AToasts generated from background tasks should use `background`.
   */
  type?: 'background' | 'foreground';
}

export const [
  injectAToastRootContext,
  provideAToastRootContext,
] = createContext<{ onClose: () => void }>('AToastRoot');
</script>

<script setup lang="ts">
import { isBrowser } from '@vinicunca/perkakas';
import { onKeyStroke, useRafFn } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useCollection } from '~~/collection';
import { useForwardExpose } from '~~/shared';

import AToastAnnounce from './a-toast-announce.vue';
import { injectAToastProviderContext } from './a-toast-provider.vue';
import {
  getAnnounceTextContent,
  handleAndDispatchCustomEvent,
  isDeltaInDirection,
  TOAST_SWIPE_CANCEL,
  TOAST_SWIPE_END,
  TOAST_SWIPE_MOVE,
  TOAST_SWIPE_START,
  VIEWPORT_PAUSE,
  VIEWPORT_RESUME,
} from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AToastRootImplProps>(),
  {
    open: false,
    as: 'li',
  },
);

const emits = defineEmits<AToastRootImplEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const { ACollectionItem } = useCollection();

const providerContext = injectAToastProviderContext();
const pointerStartRef = ref<{ x: number; y: number } | null>(null);
const swipeDeltaRef = ref<{ x: number; y: number } | null>(null);
const duration = computed(() => props.duration || providerContext.duration.value);

const closeTimerStartTimeRef = ref(0);
const closeTimerRemainingTimeRef = ref(duration.value);
const closeTimerRef = ref(0);
const remainingTime = ref(duration.value);

const remainingRaf = useRafFn(
  () => {
    const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value;
    remainingTime.value = Math.max(closeTimerRemainingTimeRef.value - elapsedTime, 0);
  },
  { fpsLimit: 60 },
);

function startTimer(duration: number) {
  if (!duration || duration === Number.POSITIVE_INFINITY) {
    return;
  }
  // startTimer is used inside a watch with immediate set to true.
  // This results in code execution during SSR.
  // Ensure this code only runs in a browser environment
  if (!isBrowser) {
    return;
  }
  window.clearTimeout(closeTimerRef.value);
  closeTimerStartTimeRef.value = new Date().getTime();
  closeTimerRef.value = window.setTimeout(handleClose, duration);
}

function handleClose() {
  // focus viewport if focus is within toast to read the remaining toast
  // count to SR users and ensure focus isn't lost
  const isFocusInAToast = currentElement.value?.contains(document.activeElement);
  if (isFocusInAToast) {
    providerContext.viewport.value?.focus();
  }

  // when manually close the toast, we reset isClosePausedRef
  providerContext.isClosePausedRef.value = false;
  emits('close');
}

const announceTextContent = computed(() =>
  currentElement.value
    ? getAnnounceTextContent(currentElement.value)
    : null,
);

if (props.type && !['background', 'foreground'].includes(props.type)) {
  const error = 'Invalid prop `type` supplied to `AToast`. Expected `foreground | background`.';
  throw new Error(error);
}

watchEffect(() => {
  const viewport = providerContext.viewport.value;
  if (viewport) {
    const handleResume = () => {
      startTimer(closeTimerRemainingTimeRef.value);
      remainingRaf.resume();
      emits('resume');
    };
    const handlePause = () => {
      const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value;
      closeTimerRemainingTimeRef.value = closeTimerRemainingTimeRef.value - elapsedTime;
      window.clearTimeout(closeTimerRef.value);
      remainingRaf.pause();
      emits('pause');
    };
    viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
    viewport.addEventListener(VIEWPORT_RESUME, handleResume);
    return () => {
      viewport.removeEventListener(VIEWPORT_PAUSE, handlePause);
      viewport.removeEventListener(VIEWPORT_RESUME, handleResume);
    };
  }
});

// start timer when toast opens or duration changes.
// we include `open` in deps because closed !== unmounted when animating
// so it could reopen before being completely unmounted
watch(
  () => [props.open, duration.value],
  () => {
  // Reset the timer when the toast is rerendered with the new duration
    closeTimerRemainingTimeRef.value = duration.value;

    if (props.open && !providerContext.isClosePausedRef.value) {
      startTimer(duration.value);
    }
  },
  { immediate: true },
);

onKeyStroke('Escape', (event) => {
  emits('escapeKeyDown', event);
  if (!event.defaultPrevented) {
    providerContext.isFocusedAToastEscapeKeyDownRef.value = true;
    handleClose();
  }
});

onMounted(() => {
  providerContext.onAToastAdd();
});
onUnmounted(() => {
  providerContext.onAToastRemove();
});

provideAToastRootContext({ onClose: handleClose });

function handlePointerDown(event: PointerEvent) {
  pointerStartRef.value = { x: event.clientX, y: event.clientY };
}

function handlePointerMove(event: PointerEvent) {
  if (!pointerStartRef.value) {
    return;
  }
  const x = event.clientX - pointerStartRef.value.x;
  const y = event.clientY - pointerStartRef.value.y;
  const hasSwipeMoveStarted = Boolean(swipeDeltaRef);
  const isHorizontalSwipe = ['left', 'right'].includes(providerContext.swipeDirection.value);
  const clamp = ['left', 'up'].includes(providerContext.swipeDirection.value)
    ? Math.min
    : Math.max;
  const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
  const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
  const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2;
  const delta = { x: clampedX, y: clampedY };
  const eventDetail = { originalEvent: event, delta };
  if (hasSwipeMoveStarted) {
    swipeDeltaRef.value = delta;
    handleAndDispatchCustomEvent({
      name: TOAST_SWIPE_MOVE,
      handler: (ev: SwipeEvent) => emits('swipeMove', ev),
      detail: eventDetail,
    });
  } else if (isDeltaInDirection({
    delta,
    direction: providerContext.swipeDirection.value,
    threshold: moveStartBuffer,
  })) {
    swipeDeltaRef.value = delta;
    handleAndDispatchCustomEvent({
      name: TOAST_SWIPE_START,
      handler: (ev: SwipeEvent) => emits('swipeStart', ev),
      detail: eventDetail,
    });
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  } else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
    // User is swiping in wrong direction so we disable swipe gesture
    // for the current pointer down interaction
    pointerStartRef.value = null;
  }
}

function handlePointerUp(event: PointerEvent) {
  const delta = swipeDeltaRef;
  const target = event.target as HTMLElement;
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId);
  }
  swipeDeltaRef.value = null;
  pointerStartRef.value = null;
  if (delta.value) {
    const toast = event.currentTarget;
    const eventDetail = { originalEvent: event, delta: delta.value };
    if (
      isDeltaInDirection({
        delta: delta.value,
        direction: providerContext.swipeDirection.value,
        threshold: providerContext.swipeThreshold.value,
      })
    ) {
      handleAndDispatchCustomEvent({
        name: TOAST_SWIPE_END,
        handler: (ev: SwipeEvent) => emits('swipeEnd', ev),
        detail: eventDetail,
      });
    } else {
      handleAndDispatchCustomEvent({
        name: TOAST_SWIPE_CANCEL,
        handler: (ev: SwipeEvent) => emits('swipeCancel', ev),
        detail: eventDetail,
      });
    }
    // Prevent click event from triggering on items within the toast when
    // pointer up is part of a swipe gesture
    toast?.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    });
  }
}
</script>

<template>
  <AToastAnnounce
    v-if="announceTextContent"
    role="status"
    :aria-live="type === 'foreground' ? 'assertive' : 'polite'"
    aria-atomic
  >
    {{ announceTextContent }}
  </AToastAnnounce>

  <Teleport
    v-if="providerContext.viewport.value"
    :to="providerContext.viewport.value"
  >
    <ACollectionItem>
      <APrimitive
        :ref="forwardRef"
        role="status"
        aria-live="off"
        aria-atomic
        tabindex="0"
        v-bind="$attrs"
        :as="as"
        :as-child="asChild"
        :data-state="open ? 'open' : 'closed'"
        :data-swipe-direction="providerContext.swipeDirection.value"
        :style="{ userSelect: 'none', touchAction: 'none' }"
        @pointerdown.left="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
      >
        <slot
          :remaining="remainingTime"
          :duration="duration"
        />
      </APrimitive>
    </ACollectionItem>
  </Teleport>
</template>
