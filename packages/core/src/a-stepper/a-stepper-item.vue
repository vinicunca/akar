<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { APrimitive } from '~~/a-primitive';
import { createContext } from '~~/shared';

import { injectAStepperRootContext } from './a-stepper-root.vue';

export const [
  injectAStepperItemContext,
  provideAStepperItemContext,
] = createContext<AStepperItemContext>('AStepperItem');

export type AStepperState = 'active' | 'completed' | 'inactive';

export interface AStepperItemContext {
  descriptionId: string;
  disabled: Ref<boolean>;
  isFocusable: Ref<boolean>;
  state: Ref<AStepperState>;
  step: Ref<number>;
  titleId: string;
}

export interface AStepperItemProps extends APrimitiveProps {
  /** Shows whether the step is completed. */
  completed?: boolean;
  /** When `true`, prevents the user from interacting with the tab. */
  disabled?: boolean;
  /** A unique value that associates the stepper item with an index */
  step: number;
}
</script>

<script setup lang="ts">
import { computed, toRefs, useId } from 'vue';

import { useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<AStepperItemProps>(),
  {
    completed: false,
    disabled: false,
  },
);

defineSlots<{
  default: (props: {
    /** The current state of the stepper item */
    state: AStepperState;
  }) => any;
}>();

const { disabled, step, completed } = toRefs(props);

const { forwardRef } = useForwardExpose();

const rootContext = injectAStepperRootContext();

const titleId = useId();
const descriptionId = useId();

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

provideAStepperItemContext({
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
