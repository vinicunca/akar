<script lang="ts">
import type { ComputedRef, Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { DataOrientation, Direction, FormFieldProps } from '../shared/types';
import { clamp, isIncludedIn } from '@vinicunca/perkakas';
import { useCollection } from '~~/collection';
import { createContext, useDirection, useFormControl, useForwardExpose } from '~~/shared';

type ThumbAlignment = 'contain' | 'overflow';

export interface ASliderRootProps extends APrimitiveProps, FormFieldProps {
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: Array<number>;
  /** The controlled value of the slider. Can be bind as `v-model`. */
  modelValue?: Array<number> | null;
  /** When `true`, prevents the user from interacting with the slider. */
  disabled?: boolean;
  /** The orientation of the slider. */
  orientation?: DataOrientation;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether the slider is visually inverted. */
  inverted?: boolean;
  /** The minimum value for the range. */
  min?: number;
  /** The maximum value for the range. */
  max?: number;
  /** The stepping interval. */
  step?: number;
  /** The minimum permitted steps between multiple thumbs. */
  minStepsBetweenThumbs?: number;
  /**
   * The alignment of the slider thumb.
   * - `contain`: thumbs will be contained within the bounds of the track.
   * - `overflow`: thumbs will not be bound by the track. No extra offset will be added.
   * @defaultValue 'contain'
   */
  thumbAlignment?: ThumbAlignment;
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

export interface SliderRootContext {
  orientation: Ref<DataOrientation>;
  disabled: Ref<boolean>;
  min: Ref<number>;
  max: Ref<number>;
  modelValue?: Readonly<Ref<Array<number> | null | undefined>>;
  currentModelValue: ComputedRef<Array<number>>;
  valueIndexToChangeRef: Ref<number>;
  thumbElements: Ref<Array<HTMLElement>>;
  thumbAlignment: Ref<ThumbAlignment>;
}

export const [
  injectASliderRootContext,
  provideSliderRootContext,
] = createContext<SliderRootContext>('ASliderRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, ref, toRaw, toRefs } from 'vue';
import { AVisuallyHiddenInput } from '~~/visually-hidden';
import SliderHorizontal from './slider-horizontal.vue';
import SliderVertical from './slider-vertical.vue';
import {
  ARROW_KEYS,
  getClosestValueIndex,
  getDecimalCount,
  getNextSortedValues,
  hasMinStepsBetweenValues,
  PAGE_KEYS,
  roundValue,
} from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ASliderRootProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
  disabled: false,
  minStepsBetweenThumbs: 0,
  defaultValue: () => [0],
  inverted: false,
  thumbAlignment: 'contain',
  as: 'span',
});
const emits = defineEmits<ASliderRootEmits>();

defineSlots<{
  default?: (props: {
    /** Current slider values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const {
  min,
  max,
  step,
  minStepsBetweenThumbs,
  orientation,
  disabled,
  thumbAlignment,
  dir: propDir,
} = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef, currentElement } = useForwardExpose();
const isFormControl = useFormControl(currentElement);

const { ACollectionSlot } = useCollection({ isProvider: true });

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
}) as Ref<Array<number> | null>;

const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);

const valueIndexToChangeRef = ref(0);
const valuesBeforeSlideStartRef = ref(currentModelValue.value);

function handleSlideStart(value: number) {
  const closestIndex = getClosestValueIndex(currentModelValue.value, value);
  updateValues(value, closestIndex);
}

function handleSlideMove(value: number) {
  updateValues(value, valueIndexToChangeRef.value);
}

function handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
  const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
  const hasChanged = nextValue !== prevValue;
  if (hasChanged) {
    emits('valueCommit', toRaw(currentModelValue.value));
  }
}

function updateValues(value: number, atIndex: number, { commit } = { commit: false }) {
  const decimalCount = getDecimalCount(step.value);
  const snapToStep = roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount);
  const nextValue = clamp(snapToStep, { min: min.value, max: max.value });

  const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);

  if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
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

const thumbElements = ref<Array<HTMLElement>>([]);
provideSliderRootContext({
  modelValue,
  currentModelValue,
  valueIndexToChangeRef,
  thumbElements,
  orientation,
  min,
  max,
  disabled,
  thumbAlignment,
});
</script>

<template>
  <ACollectionSlot>
    <component
      :is="orientation === 'horizontal' ? SliderHorizontal : SliderVertical"
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
      @pointerdown="() => {
        if (!disabled) {
          valuesBeforeSlideStartRef = currentModelValue;
        }
      }"
      @slide-start="!disabled && handleSlideStart($event)"
      @slide-move="!disabled && handleSlideMove($event)"
      @slide-end="!disabled && handleSlideEnd()"
      @home-key-down="!disabled && updateValues(min, 0, { commit: true })"
      @end-key-down="!disabled && updateValues(max, currentModelValue.length - 1, { commit: true })"
      @step-key-down="(event, direction) => {
        if (!disabled) {
          const isPageKey = isIncludedIn(event.key, PAGE_KEYS);
          const isSkipKey = isPageKey || (event.shiftKey && isIncludedIn(event.key, ARROW_KEYS));
          const multiplier = isSkipKey ? 10 : 1;
          const atIndex = valueIndexToChangeRef;
          const value = currentModelValue[atIndex];
          const stepInDirection = step * multiplier * direction;
          updateValues(value + stepInDirection, atIndex, { commit: true });
        }
      }"
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
