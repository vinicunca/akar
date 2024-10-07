<script lang="ts" setup>
import { computed, ref } from 'vue';

import { type Direction, useForwardExpose } from '~~/shared';

import ASliderImpl from './a-slider-impl.vue';
import { type ASliderOrientationPrivateEmits, type ASliderOrientationPrivateProps, BACK_KEYS, linearScale, provideASliderOrientationContext } from './utils';

interface ASliderHorizontalProps extends ASliderOrientationPrivateProps {
  dir?: Direction;
}

const props = defineProps<ASliderHorizontalProps>();
const emits = defineEmits<ASliderOrientationPrivateEmits>();

const {
  forwardRef,
  currentElement: sliderElement,
} = useForwardExpose();

const isSlidingFromLeft = computed(
  () => (props.dir === 'ltr' && !props.inverted)
    || (props.dir !== 'ltr' && props.inverted),
);

const rectRef = ref<DOMRect>();

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
  const input: [number, number] = [0, rect.width];
  const output: [number, number] = isSlidingFromLeft.value
    ? [props.min, props.max]
    : [props.max, props.min];

  const getValue = linearScale({ input, output });

  rectRef.value = rect;

  return getValue(pointerPosition - rect.left);
}

function handleSlideStart(event: PointerEvent) {
  emits('slideStart', getValueFromPointer(event.clientX));
}

function handleSlideMove(event: PointerEvent) {
  emits('slideMove', getValueFromPointer(event.clientX));
}

function handleSlideEnd() {
  rectRef.value = undefined;
  emits('slideEnd');
}

function handleStepKeyDown(event: KeyboardEvent) {
  const slideDirection = isSlidingFromLeft.value
    ? 'from-left'
    : 'from-right';
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key);

  emits('stepKeyDown', {
    event,
    direction: isBackKey ? -1 : 1,
  });
}

provideASliderOrientationContext({
  startEdge: isSlidingFromLeft.value ? 'left' : 'right',
  endEdge: isSlidingFromLeft.value ? 'right' : 'left',
  direction: isSlidingFromLeft.value ? 1 : -1,
  size: 'width',
});
</script>

<template>
  <ASliderImpl
    :ref="forwardRef"
    :dir="dir"
    data-orientation="horizontal"
    :style="{
      ['--akar-slider-thumb-transform']: 'translateX(-50%)',
    }"
    @slide-start="handleSlideStart"
    @slide-move="handleSlideMove"
    @slide-end="handleSlideEnd"
    @step-key-down="handleStepKeyDown"
    @end-key-down="emits('endKeyDown', $event)"
    @home-key-down="emits('homeKeyDown', $event)"
  >
    <slot />
  </ASliderImpl>
</template>
