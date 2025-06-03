<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/primitive';
import { computed, toRefs } from 'vue';
import { APrimitive } from '~~/primitive';
import { createContext, useForwardExpose, useId } from '~~/shared';
import { injectAStepperRootContext } from './stepper-root.vue';

export const [injectAStepperItemContext, provideStepperItemContext] = createContext<StepperItemContext>('AStepperItem');

export type StepperState = 'active' | 'completed' | 'inactive';

export interface StepperItemContext {
  titleId: string;
  descriptionId: string;
  step: Ref<number>;
  state: Ref<StepperState>;
  disabled: Ref<boolean>;
  isFocusable: Ref<boolean>;
}

export interface AStepperItemProps extends APrimitiveProps {
  /** A unique value that associates the stepper item with an index */
  step: number;
  /** When `true`, prevents the user from interacting with the step. */
  disabled?: boolean;
  /** Shows whether the step is completed. */
  completed?: boolean;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<AStepperItemProps>(), {
  completed: false,
  disabled: false,
});

defineSlots<{
  default?: (props: {
    /** The current state of the stepper item */
    state: StepperState;
  }) => any;
}>();

const { disabled, step, completed } = toRefs(props);

const { forwardRef } = useForwardExpose();

const rootContext = injectAStepperRootContext();

const titleId = useId(undefined, 'akar-stepper-item-title');
const descriptionId = useId(undefined, 'akar-stepper-item-description');

const itemState = computed(() => {
  if (completed.value) {
    return 'completed';
  }
  if (rootContext.modelValue.value === step.value) {
    return 'active';
  }
  if (rootContext.modelValue.value! > step.value) {
    return 'completed';
  }
  return 'inactive';
});

const isFocusable = computed(() => {
  if (disabled.value) {
    return false;
  }
  if (rootContext.linear.value) {
    return step.value <= rootContext.modelValue.value! || step.value === rootContext.modelValue.value! + 1;
  }

  return true;
});

provideStepperItemContext({
  titleId,
  descriptionId,
  state: itemState,
  disabled,
  step,
  isFocusable,
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
    :aria-current="itemState === 'active' ? 'true' : undefined"
    :data-state="itemState"
    :disabled="disabled || !isFocusable ? '' : undefined"
    :data-disabled="disabled || !isFocusable ? '' : undefined"
    :data-orientation="rootContext.orientation.value"
  >
    <slot :state="itemState" />
  </APrimitive>
</template>
