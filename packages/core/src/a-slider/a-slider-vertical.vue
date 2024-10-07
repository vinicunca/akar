<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';

import { useForwardExpose } from '~~/shared';

import type { ASliderOrientationPrivateEmits, ASliderOrientationPrivateProps } from './utils';

import ASliderImpl from './a-slider-impl.vue';
import { BACK_KEYS, linearScale, provideASliderOrientationContext } from './utils';

interface ASliderVerticalProps extends ASliderOrientationPrivateProps {}

const props = defineProps<ASliderVerticalProps>();
const emits = defineEmits<ASliderOrientationPrivateEmits>();

const { max, min, inverted } = toRefs(props);

const { forwardRef, currentElement: sliderElement } = useForwardExpose();

const rectRef = ref<DOMRect>();
const isSlidingFromBottom = computed(() => !inverted.value);

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef.value || sliderElement.value!.getBoundingClientRect();
  const input: [number, number] = [0, rect.height];
  const output: [number, number] = isSlidingFromBottom.value
    ? [max.value, min.value]
    : [min.value, max.value];
  const getLinearValue = linearScale({ input, output });

  rectRef.value = rect;

  return getLinearValue(pointerPosition - rect.top);
}

function handleSlideStart(event: PointerEvent) {
  emits('slideStart', getValueFromPointer(event.clientY));
}

function handleSlideMove(event: PointerEvent) {
  emits('slideMove', getValueFromPointer(event.clientY));
}

function handleSlideEnd() {
  rectRef.value = undefined;
  emits('slideEnd');
}

function handleStepKeyDown(event: KeyboardEvent) {
  const slideDirection = isSlidingFromBottom.value
    ? 'from-bottom'
    : 'from-top';
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key);

  emits('stepKeyDown', {
    event,
    direction: isBackKey ? -1 : 1,
  });
}

provideASliderOrientationContext({
  startEdge: isSlidingFromBottom.value ? 'bottom' : 'top',
  endEdge: isSlidingFromBottom.value ? 'top' : 'bottom',
  size: 'height',
  direction: isSlidingFromBottom.value ? 1 : -1,
});
</script>

<template>
  <ASliderImpl
    :ref="forwardRef"
    data-orientation="vertical"
    :style="{
      ['--akar-slider-thumb-transform']: 'translateY(50%)',
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
