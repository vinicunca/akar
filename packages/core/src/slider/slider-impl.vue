<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { isIncludedIn, KEY_CODES } from '@vinicunca/perkakas';

export type SliderImplEmits = {
  slideStart: [event: PointerEvent];
  slideMove: [event: PointerEvent];
  slideEnd: [event: PointerEvent];
  homeKeyDown: [event: KeyboardEvent];
  endKeyDown: [event: KeyboardEvent];
  stepKeyDown: [event: KeyboardEvent];
};

export interface SliderImplProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectASliderRootContext } from './slider-root.vue';
import { ARROW_KEYS, PAGE_KEYS } from './utils';

const props = withDefaults(defineProps<SliderImplProps>(), {
  as: 'span',
});
const emits = defineEmits<SliderImplEmits>();
const rootContext = injectASliderRootContext();
</script>

<template>
  <APrimitive
    data-slider-impl
    v-bind="props"
    @keydown="(event) => {
      if (event.key === KEY_CODES.HOME) {
        emits('homeKeyDown', event);
        // Prevent scrolling to page start
        event.preventDefault();
      }
      else if (event.key === KEY_CODES.END) {
        emits('endKeyDown', event);
        // Prevent scrolling to page end
        event.preventDefault();
      }
      else if (isIncludedIn(event.key, [...ARROW_KEYS, ...PAGE_KEYS])) {
        emits('stepKeyDown', event)
        // Prevent scrolling for directional key presses
        event.preventDefault();
      }
    }"
    @pointerdown="(event) => {
      const target = event.target as HTMLElement;
      target.setPointerCapture(event.pointerId);
      // Prevent browser focus behaviour because we focus a thumb manually when values change.
      event.preventDefault();
      // Touch devices have a delay before focusing so won't focus if touch immediately moves
      // away from target (sliding). We want thumb to focus regardless.
      if (rootContext.thumbElements.value.includes(target)) {
        target.focus();
      }
      else {
        emits('slideStart', event)
      }
    }"
    @pointermove="(event) => {
      const target = event.target as HTMLElement;
      if (target.hasPointerCapture(event.pointerId)) emits('slideMove', event);
    }"
    @pointerup="(event) => {
      const target = event.target as HTMLElement;
      if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
        emits('slideEnd', event)
      }
    }"
  >
    <slot />
  </APrimitive>
</template>
