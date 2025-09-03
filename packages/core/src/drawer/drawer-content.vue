<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { ADialogContent } from '../dialog';
import { injectADrawerRootContext } from './drawer.context';
import { useScaleBackground } from './use-scale-background';

const {
  isOpen,
  snapPointsOffset,
  hasSnapPoints,
  drawerRef,
  onPress,
  onDrag,
  onRelease,
  modal,
  emitOpenChange,
  dismissible,
  keyboardIsOpen,
  direction,
  handleOnly,
} = injectADrawerRootContext();

useScaleBackground();

const delayedSnapPoints = ref(false);

const snapPointHeight = computed(() => {
  if (snapPointsOffset.value && snapPointsOffset.value.length > 0) {
    return `${snapPointsOffset.value[0]}px`;
  }

  return '0';
});

function handlePointerDownOutside(event: Event) {
  if (!modal.value || event.defaultPrevented) {
    event.preventDefault();
    return;
  }

  if (keyboardIsOpen.value) {
    keyboardIsOpen.value = false;
  }

  if (dismissible.value) {
    emitOpenChange(false);
  } else {
    event.preventDefault();
  }
}

function handlePointerDown(event: PointerEvent) {
  if (handleOnly.value) {
    return;
  }

  onPress(event);
}

function handleOnDrag(event: PointerEvent) {
  if (handleOnly.value) {
    return;
  }

  onDrag(event);
}

function handleEscapeKeyDown(event: KeyboardEvent) {
  if (!dismissible.value) {
    event.preventDefault();
  }
}

watchEffect(() => {
  if (hasSnapPoints.value) {
    window.requestAnimationFrame(() => {
      delayedSnapPoints.value = true;
    });
  }
});
</script>

<template>
  <ADialogContent
    ref="drawerRef"
    data-akar-drawer=""
    :data-akar-drawer-direction="direction"
    :data-akar-delayed-snap-points="delayedSnapPoints ? 'true' : 'false'"
    :data-akar-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :style="{ '--akar-snap-point-height': snapPointHeight }"
    @pointerdown="handlePointerDown"
    @pointermove="handleOnDrag"
    @pointerup="onRelease"
    @pointer-down-outside="handlePointerDownOutside"
    @open-auto-focus.prevent
    @escape-key-down="handleEscapeKeyDown"
  >
    <slot />
  </ADialogContent>
</template>
