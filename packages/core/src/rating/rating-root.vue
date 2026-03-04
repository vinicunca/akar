<script lang="ts">
import type { ARadioGroupRootProps } from '../radio-group';
import { createContext, useForwardExpose } from '../shared';

export interface ARatingRootContext {
  modelValue: Ref<number>;
  items: ComputedRef<Array<number>>;
  hoveredRating: Ref<number>;
  disabled: Ref<boolean>;
  step: Ref<number>;
  changeModelValue: (rating: number) => void;
  changeHoveredRating: (rating: number) => void;
}

export interface ARatingRootProps extends Omit<ARadioGroupRootProps, 'modelValue' | 'defaultValue'> {
  /**
   * The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs
   */
  defaultValue?: number;
  /** The controlled value of the tab to activate. Can be bind as `v-model`. */
  modelValue?: number;
  length?: number;
  clearable?: boolean;
  hoverable?: boolean;
  step?: 1 | 0.5 | 0.25 | 0.1;

}
export type ARatingRootEmits = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: number];
};

export const [
  injectARatingRootContext,
  provideARatingRootContext,
] = createContext<ARatingRootContext>('ARatingRoot');
</script>

<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue';
import { reactiveOmit, useVModel } from '@vueuse/core';
import { computed, ref, toRefs } from 'vue';
import { ARadioGroupRoot } from '../radio-group';

const props = withDefaults(
  defineProps<ARatingRootProps>(),
  {
    orientation: 'horizontal',
    length: 5,
    step: 1,
  },
);

const emits = defineEmits<ARatingRootEmits>();

defineSlots<{
  default?: (props: {
    modelValue: number | undefined;
    items: Array<number>;
  }) => any;
}>();

const { length, disabled, clearable, hoverable, step } = toRefs(props);

useForwardExpose();

const modelValue = useVModel<ARatingRootProps, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<number>;

const items = computed(() => {
  return Array.from({ length: length.value }, (_, i) => i + 1);
});

const hoveredRating = ref<number>(0);

function changeModelValue(rating: number) {
  if (disabled.value) {
    return;
  }

  if (clearable.value && modelValue.value === rating) {
    hoveredRating.value = 0;
    modelValue.value = 0;
  } else {
    modelValue.value = rating;
  }
}

function changeHoveredRating(rating: number) {
  if (disabled.value || !hoverable.value) {
    return;
  }

  hoveredRating.value = rating;
}

provideARatingRootContext({
  modelValue,
  items,
  hoveredRating,
  disabled,
  step,
  changeModelValue,
  changeHoveredRating,
});
</script>

<template>
  <ARadioGroupRoot
    v-bind="reactiveOmit(props, 'length', 'clearable', 'hoverable', 'step')"
    :disabled="disabled"
  >
    <slot
      :items="items"
      :model-value="modelValue"
    />
  </ARadioGroupRoot>
</template>
