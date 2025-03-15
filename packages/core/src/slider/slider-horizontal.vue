<script setup lang="ts">
import type { Direction, SliderOrientationPrivateEmits, SliderOrientationPrivateProps } from './utils';
import { computed, ref, toRefs } from 'vue';
import { useForwardExpose } from '~~/shared';
import SliderImpl from './slider-impl.vue';
import { injectASliderRootContext } from './slider-root.vue';
import { BACK_KEYS, linearScale, provideSliderOrientationContext } from './utils';

interface SliderHorizontalProps extends SliderOrientationPrivateProps {
  dir?: Direction;
}

const props = defineProps<SliderHorizontalProps>();
const emits = defineEmits<SliderOrientationPrivateEmits>();
const { max, min, dir, inverted } = toRefs(props);

const { forwardRef, currentElement: sliderElement } = useForwardExpose();
const rootContext = injectASliderRootContext();

const offsetPosition = ref<number>();
const rectRef = ref<ClientRect>();
const isSlidingFromLeft = computed(() => (dir?.value === 'ltr' && !inverted.value) || (dir?.value !== 'ltr' && inverted.value));

function getValueFromPointerEvent(
  { event, slideStart }:
  { event: PointerEvent; slideStart?: boolean },
) {
  const rect = rectRef.value || sliderElement.value!.getBoundingClientRect();

  // Get the currently active thumb element
  const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
  const thumbWidth = rootContext.thumbAlignment.value === 'contain' ? thumb.clientWidth : 0;

  // Calculate offset for dragging, but only when needed
  if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === 'contain') {
    offsetPosition.value = event.clientX - thumb.getBoundingClientRect().left;
  }

  // Define the input range (slider track width minus thumb width)
  const input: [number, number] = [0, rect.width - thumbWidth];

  const output: [number, number] = isSlidingFromLeft.value
    ? [min.value, max.value]
    : [max.value, min.value];
  const value = linearScale(input, output);

  rectRef.value = rect;

  const position = slideStart
    ? event.clientX - rect.left - thumbWidth / 2
    : event.clientX - rect.left - (offsetPosition.value ?? 0);

  return value(position);
}

function handleSlideStart(event: PointerEvent) {
  const value = getValueFromPointerEvent({ event, slideStart: true });
  emits('slideStart', value);
}

function handleSlideMove(event: PointerEvent) {
  const value = getValueFromPointerEvent({ event });
  emits('slideMove', value);
}

function handleSlideEnd() {
  rectRef.value = undefined;
  offsetPosition.value = undefined;
  emits('slideEnd');
}

function handleStepKeyDown(event: KeyboardEvent) {
  const slideDirection = isSlidingFromLeft.value ? 'from-left' : 'from-right';
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
  emits('stepKeyDown', event, isBackKey ? -1 : 1);
}

provideSliderOrientationContext({
  startEdge: isSlidingFromLeft.value ? 'left' : 'right',
  endEdge: isSlidingFromLeft.value ? 'right' : 'left',
  direction: isSlidingFromLeft.value ? 1 : -1,
  size: 'width',
});
</script>

<template>
  <SliderImpl
    :ref="forwardRef"
    :dir="dir"
    data-orientation="horizontal"
    :style="{
      ['--akar-slider-thumb-transform']:
        !isSlidingFromLeft && rootContext.thumbAlignment.value === 'overflow'
          ? 'translateX(50%)'
          : 'translateX(-50%)',
    }"
    @slide-start="handleSlideStart"
    @slide-move="handleSlideMove"
    @slide-end="handleSlideEnd"
    @step-key-down="handleStepKeyDown"
    @end-key-down="emits('endKeyDown', $event)"
    @home-key-down="emits('homeKeyDown', $event)"
  >
    <slot />
  </SliderImpl>
</template>
