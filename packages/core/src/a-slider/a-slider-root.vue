<script lang="ts">
import type { Ref } from 'vue';

import { clamp, isIncludedIn } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';

import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { createContext, type DataOrientation, type Direction, type FormFieldProps } from '~~/shared';

import { ARROW_KEYS, getClosestValueIndex, getDecimalCount, getNextSortedValues, hasMinStepsBetweenValues, PAGE_KEYS, roundValue } from './utils';

export interface ASliderRootProps extends APrimitiveProps, FormFieldProps {
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: Array<number>;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** Whether the slider is visually inverted. */
  inverted?: boolean;
  /** The maximum value for the range. */
  max?: number;
  /** The minimum value for the range. */
  min?: number;
  /** The minimum permitted steps between multiple thumbs. */
  minStepsBetweenThumbs?: number;
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: Array<number>;
  /** The orientation of the slider. */
  orientation?: DataOrientation;
  /** The stepping interval. */
  step?: number;
}

export type ASliderRootEmits = {
  /**
   * Event handler called when the slider value changes
   */
  'update:modelValue': [payload: Array<number> | undefined];
  /**
   * Event handler called when the value changes at the end of an interaction.
   *
   * Useful when you only need to capture a final value e.g. to update a backend service.
   */
  'valueCommit': [payload: Array<number>];
};

export interface ASliderRootContext {
  disabled: Ref<boolean>;
  max: Ref<number>;
  min: Ref<number>;
  modelValue?: Readonly<Ref<Array<number> | undefined>>;
  orientation: Ref<DataOrientation>;
  thumbElements: Ref<Array<HTMLElement>>;
  valueIndexToChangeRef: Ref<number>;
}

export const [
  injectASliderRootContext,
  provideASliderRootContext,
] = createContext<ASliderRootContext>('ASliderRoot');
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ref, toRaw, toRefs } from 'vue';

import { useCollection } from '~~/collection';
import { useDirection, useFormControl, useForwardExpose } from '~~/shared';

import ASliderHorizontal from './a-slider-horizontal.vue';
import ASliderVertical from './a-slider-vertical.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ASliderRootProps>(),
  {
    defaultValue: () => [0],
    disabled: false,
    inverted: false,
    max: 100,
    min: 0,
    minStepsBetweenThumbs: 0,
    orientation: 'horizontal',
    step: 1,
  },
);

const emits = defineEmits<ASliderRootEmits>();

defineSlots<{
  default: (props: {
    /** Current slider values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const {
  disabled,
  max,
  min,
  orientation,
  dir: propsDir,
  step,
  minStepsBetweenThumbs,
} = toRefs(props);

const dir = useDirection(propsDir);
const { currentElement, forwardRef } = useForwardExpose();
const isFormControl = useFormControl(currentElement);
const { ACollectionSlot } = useCollection({ isProvider: true });

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<Array<number>>;

const valueIndexToChangeRef = ref(0);
const valuesBeforeSlideStartRef = ref(modelValue.value);

function handleSlideStart(value: number) {
  const closestIndex = getClosestValueIndex({
    values: modelValue.value,
    nextValue: value,
  });

  updateValues({
    atIndex: closestIndex,
    value,
  });
}

function handleSlideMove(value: number) {
  updateValues({
    atIndex: valueIndexToChangeRef.value,
    value,
  });
}

function handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
  const nextValue = modelValue.value[valueIndexToChangeRef.value];
  const hasChanged = nextValue !== prevValue;

  if (hasChanged) {
    emits('valueCommit', toRaw(modelValue.value));
  }
}

function updateValues(
  { atIndex, commit = false, value }:
  { atIndex: number; commit?: boolean; value: number },
) {
  const decimalCount = getDecimalCount(step.value);
  const snapToStep = roundValue({
    value: Math.round((value - min.value) / step.value) * step.value + min.value,
    decimalCount,
  });
  const nextValue = clamp(snapToStep, { min: min.value, max: max.value });

  const nextValues = getNextSortedValues({
    prevValues: modelValue.value,
    nextValue,
    atIndex,
  });

  if (hasMinStepsBetweenValues({
    values: nextValues,
    minStepsBetweenValues: minStepsBetweenThumbs.value * step.value,
  })) {
    valueIndexToChangeRef.value = nextValues.indexOf(nextValue);
    const hasChanged = String(nextValues) !== String(modelValue.value);
    if (hasChanged && commit) {
      emits('valueCommit', nextValues);
    }

    if (hasChanged) {
      thumbElements.value[valueIndexToChangeRef.value]?.focus();
      modelValue.value = nextValues;
    }
  }
}

function handlePointerDown() {
  if (!disabled.value) {
    valuesBeforeSlideStartRef.value = modelValue.value;
  }
}

function handleStepKeyDown(
  { event, direction }:
  { direction: number; event: KeyboardEvent },
) {
  if (!disabled.value) {
    const isPageKey = isIncludedIn(event.key, PAGE_KEYS);
    const isSkipKey = isPageKey || (event.shiftKey && isIncludedIn(event.key, ARROW_KEYS));
    const multiplier = isSkipKey ? 10 : 1;
    const value = modelValue.value[valueIndexToChangeRef.value];
    const stepInDirection = step.value * multiplier * direction;

    updateValues({
      value: value + stepInDirection,
      atIndex: valueIndexToChangeRef.value,
      commit: true,
    });
  }
}

const thumbElements = ref<Array<HTMLElement>>([]);

provideASliderRootContext({
  disabled,
  max,
  min,
  modelValue,
  orientation,
  thumbElements,
  valueIndexToChangeRef,
});
</script>

<template>
  <ACollectionSlot>
    <component
      :is="orientation === 'horizontal' ? ASliderHorizontal : ASliderVertical"
      v-bind="$attrs"
      :ref="forwardRef"
      :as-child="asChild"
      :as="as"
      :min="min"
      :max="max"
      :dir="dir"
      :inverted="inverted"
      :aria-disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      @pointerdown="handlePointerDown"
      @slide-start="!disabled && handleSlideStart($event)"
      @slide-move="!disabled && handleSlideMove($event)"
      @slide-end="!disabled && handleSlideEnd()"
      @home-key-down="!disabled && updateValues({
        value: min,
        atIndex: 0,
        commit: true,
      })"
      @end-key-down="!disabled && updateValues({
        value: max,
        atIndex: modelValue.length - 1,
        commit: true,
      })"
      @step-key-down="handleStepKeyDown"
    >
      <slot :model-value="modelValue" />

      <AVisuallyHiddenInput
        v-if="isFormControl && name"
        type="number"
        :value="modelValue"
        :name="name"
        :required="required"
        :disabled="disabled"
        :step="step"
      />
    </component>
  </ACollectionSlot>
</template>
