<script lang="ts">
import type { ComputedRef } from 'vue';
import type { APrimitiveProps } from '../primitive';
import { createContext } from '../shared';
import { injectARatingRootContext } from './rating-root.vue';

interface ARatingItemContext {
  steps: ComputedRef<Array<number>>;
}

export interface ARatingItemProps extends APrimitiveProps {
  item: number;
}

export const [
  injectARatingItemContext,
  provideARatingItemContext,
] = createContext<ARatingItemContext>('ARatingItem');
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';

const props = withDefaults(
  defineProps<ARatingItemProps>(),
  { as: 'label' },
);
defineSlots<{
  default?: (props: {
    steps: Array<number>;
  }) => any;
}>();

const rootContext = injectARatingRootContext();

const steps = computed(() => {
  const groupStartValue = (props.item - 1);
  const groupEndValue = props.item;
  const stepSize = rootContext.step.value;

  const numberOfSteps = Math.ceil((groupEndValue - groupStartValue) / stepSize);

  return Array.from({ length: numberOfSteps }, (_, index) =>
    Number((groupStartValue + (index + 1) * stepSize).toFixed(2)));
});

provideARatingItemContext({ steps });
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
  >
    <slot :steps="steps" />
  </APrimitive>
</template>
