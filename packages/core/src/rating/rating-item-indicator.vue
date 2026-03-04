<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ARatingItemProps extends APrimitiveProps {
  step: number;
}
</script>

<script setup lang="ts">
import { useActiveElement } from '@vueuse/core';
import { computed } from 'vue';
import { ARadioGroupIndicator, ARadioGroupItem } from '../radio-group';
import { useForwardExpose } from '../shared';
import { injectARatingItemContext } from './rating-item.vue';
import { injectARatingRootContext } from './rating-root.vue';

const props = defineProps<ARatingItemProps>();

const rootContext = injectARatingRootContext();
const { currentElement, forwardRef } = useForwardExpose();
const activeElement = useActiveElement();
const itemContext = injectARatingItemContext();

const isActive = computed(() => {
  return (
    rootContext.hoveredRating.value > 0 && props.step <= rootContext.hoveredRating.value
  ) || (
    rootContext.hoveredRating.value === 0 && props.step <= rootContext.modelValue.value
  );
});

const isVisible = computed(() => {
  return activeElement.value === currentElement.value
    || rootContext.step.value === 1
    || props.step % 1 === 0
    || props.step === rootContext.hoveredRating.value
    || props.step === rootContext.modelValue.value;
});

function handleMouseEnter() {
  rootContext.changeHoveredRating(props.step);
}
</script>

<template>
  <ARadioGroupItem
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
    :style="{
      ['--akar-rating-item-step-width']: `${((step % 1 || 1) * 100)}%`,
      ['--akar-rating-item-step-opacity']: isVisible ? 1 : 0,
      ['--akar-rating-item-step-z-index']: itemContext.steps.value.length - itemContext.steps.value.indexOf(step),

    }"
    :value="step"
    :data-state="isActive ? 'active' : undefined"
    :disabled="rootContext.disabled.value"
    @select="rootContext.changeModelValue(step)"
    @mouseenter="handleMouseEnter"
  >
    <ARadioGroupIndicator
      force-mount
      as-child
    >
      <slot />
    </ARadioGroupIndicator>
  </ARadioGroupItem>
</template>
