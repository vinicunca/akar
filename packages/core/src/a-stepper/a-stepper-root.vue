<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { DataOrientation, Direction } from '~~/shared';

import { createContext } from '~~/shared';

export interface AStepperRootContext {
  changeModelValue: (value: number) => void;
  dir: Ref<Direction>;
  linear: Ref<boolean>;
  modelValue: Ref<number | undefined>;
  orientation: Ref<DataOrientation>;
  totalAStepperItems: Ref<Set<HTMLElement>>;
}

export interface AStepperRootProps extends APrimitiveProps {
  /**
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps
   */
  defaultValue?: number;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** Whether or not the steps must be completed in order */
  linear?: boolean;
  /** The controlled value of the step to activate. Can be bound as `v-model`. */
  modelValue?: number;
  /**
   * The orientation the steps are laid out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: DataOrientation;
}
export type AStepperRootEmits = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: number | undefined];
};

export const [
  injectAStepperRootContext,
  provideAStepperRootContext,
] = createContext<AStepperRootContext>('AStepperRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, nextTick, ref, toRefs, watch } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useDirection, useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<AStepperRootProps>(),
  {
    orientation: 'horizontal',
    linear: true,
    defaultValue: 1,
  },
);
const emits = defineEmits<AStepperRootEmits>();

defineSlots<{
  default: (props: {
    /** Go to a specific step */
    goToStep: (step: number) => void;
    /** Whether or not the first step is active */
    isFirstStep: boolean;
    /** Whether or not the last step is active */
    isLastStep: boolean;
    /** Whether or not the next step is disabled */
    isNextDisabled: boolean;
    /** Whether or not the previous step is disabled */
    isPrevDisabled: boolean;
    /** Current step */
    modelValue: number | undefined;
    /** Go to the next step */
    nextStep: () => void;
    /** Go to the previous step */
    prevStep: () => void;
    /** Total number of steps */
    totalSteps: number;
  }) => any;
}>();

const { dir: propDir, orientation: propOrientation, linear } = toRefs(props);
const dir = useDirection(propDir);
useForwardExpose();

const totalAStepperItems = ref<Set<HTMLElement>>(new Set());

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false,
  },
);

const totalAStepperItemsArray = computed(() => Array.from(totalAStepperItems.value));

const isFirstStep = computed(() => modelValue.value === 1);
const isLastStep = computed(() => modelValue.value === totalAStepperItemsArray.value.length);

const totalSteps = computed(() => totalAStepperItems.value.size);

function goToStep(step: number) {
  if (step > totalSteps.value) {
    return;
  }

  if (step < 1) {
    return;
  }

  if (totalAStepperItems.value.size && !!totalAStepperItemsArray.value[step] && !!totalAStepperItemsArray.value[step].getAttribute('disabled')) {
    return;
  }

  if (
    linear.value
    && (step > (modelValue.value ?? 1) + 1)
  ) {
    return;
  }

  modelValue.value = step;
}
const nextAStepperItem = ref<HTMLElement | null>(null);
const prevAStepperItem = ref<HTMLElement | null>(null);
const isNextDisabled = computed(() =>
  nextAStepperItem.value
    ? nextAStepperItem.value.getAttribute('disabled') === ''
    : true,
);
const isPrevDisabled = computed(() =>
  prevAStepperItem.value
    ? prevAStepperItem.value.getAttribute('disabled') === ''
    : true,
);

watch(
  modelValue,
  async () => {
    await nextTick(() => {
      nextAStepperItem.value = totalAStepperItemsArray.value.length && modelValue.value! < totalAStepperItemsArray.value.length
        ? totalAStepperItemsArray.value[modelValue.value!]
        : null;
      prevAStepperItem.value = totalAStepperItemsArray.value.length && modelValue.value! > 1
        ? totalAStepperItemsArray.value[modelValue.value! - 2]
        : null;
    });
  },
);

watch(
  totalAStepperItemsArray,
  async () => {
    await nextTick(() => {
      nextAStepperItem.value = totalAStepperItemsArray.value.length && modelValue.value! < totalAStepperItemsArray.value.length
        ? totalAStepperItemsArray.value[modelValue.value!]
        : null;
      prevAStepperItem.value = totalAStepperItemsArray.value.length && modelValue.value! > 1
        ? totalAStepperItemsArray.value[modelValue.value! - 2]
        : null;
    });
  },
);

provideAStepperRootContext({
  modelValue,
  changeModelValue: (value: number) => {
    modelValue.value = value;
  },
  orientation: propOrientation,
  dir,
  linear,
  totalAStepperItems,
});
</script>

<template>
  <APrimitive
    role="group"
    aria-label="progress"
    :as="as"
    :as-child="asChild"
    :data-linear="linear ? '' : undefined"
    :data-orientation="orientation"
  >
    <slot
      :model-value="modelValue"
      :total-steps="totalAStepperItems.size"
      :is-next-disabled="isNextDisabled"
      :is-prev-disabled="isPrevDisabled"
      :is-first-step="isFirstStep"
      :is-last-step="isLastStep"
      :go-to-step="goToStep"
      :next-step="() => goToStep((modelValue ?? 1) + 1)"
      :prev-step="() => goToStep((modelValue ?? 1) - 1)"
    />

    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      :style="{
        transform: 'translateX(-100%)',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
      }"
    >
      Step {{ modelValue }} of {{ totalAStepperItems.size }}
    </div>
  </APrimitive>
</template>
