<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export type ASliderImplEmits = {
  endKeyDown: [event: KeyboardEvent];
  homeKeyDown: [event: KeyboardEvent];
  slideEnd: [event: PointerEvent];
  slideMove: [event: PointerEvent];
  slideStart: [event: PointerEvent];
  stepKeyDown: [event: KeyboardEvent];
};

export interface ASliderImplProps extends APrimitiveProps {}
</script>

<script lang="ts" setup>
import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';

import { APrimitive } from '~~/a-primitive';

import { injectASliderRootContext } from './a-slider-root.vue';
import { ARROW_KEYS, PAGE_KEYS } from './utils';

const props = withDefaults(
  defineProps<ASliderImplProps>(),
  {
    as: 'span',
  },
);

const emits = defineEmits<ASliderImplEmits>();
const rootContext = injectASliderRootContext();

function handlePointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement;

  target.setPointerCapture(event.pointerId);

  // Prevent browser focus behavior because we focus a thumb manually when values change.
  event.preventDefault();

  /**
   * Touch devices have a delay before focusing so it won't focus if touch
   * immediately moves away from the target (sliding).
   * Regardless, we still want the thumb to focus
   */
  if (rootContext.thumbElements.value.includes(target)) {
    target.focus();
  } else {
    emits('slideStart', event);
  }
}

function handlePointerMove(event: PointerEvent) {
  const target = event.target as HTMLElement;

  if (target.hasPointerCapture(event.pointerId)) {
    emits('slideMove', event);
  }
}

function handlePointerUp(event: PointerEvent) {
  const target = event.target as HTMLElement;

  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId);
    emits('slideEnd', event);
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === KEY_CODES.HOME) {
    emits('homeKeyDown', event);
    // Prevent scrolling to page start
    event.preventDefault();
  } else if (event.key === KEY_CODES.END) {
    emits('endKeyDown', event);
    // Prevent scrolling to page end
    event.preventDefault();
  } else if (isIncludedIn(event.key, [...ARROW_KEYS, ...PAGE_KEYS])) {
    emits('stepKeyDown', event);
    // Prevent scrolling for directional key presses
    event.preventDefault();
  }
}
</script>

<template>
  <APrimitive
    data-slider-impl
    v-bind="props"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @keydown="handleKeyDown"
  >
    <slot />
  </APrimitive>
</template>
