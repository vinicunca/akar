<script lang="ts">
import type { HTMLAttributes, Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext, type FormFieldProps } from '~~/shared';

export interface ANumberFieldRootProps extends APrimitiveProps, FormFieldProps {
  defaultValue?: number;
  /** When `true`, prevents the user from interacting with the Number Field. */
  disabled?: boolean;
  /** Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user. */
  formatOptions?: Intl.NumberFormatOptions;
  /** Id of the element */
  id?: string;
  /** The locale to use for formatting dates */
  locale?: string;
  /** The largest value allowed for the input. */
  max?: number;
  /** The smallest value allowed for the input. */
  min?: number;
  modelValue?: number;
  /** The amount that the input value changes with each increment or decrement "tick". */
  step?: number;
}

export type ANumberFieldRootEmits = {
  'update:modelValue': [val: number];
};

interface ANumberFieldRootContext {
  applyInputValue: (val: string) => void;
  disabled: Ref<boolean>;
  handleDecrease: (multiplier?: number) => void;
  handleIncrease: (multiplier?: number) => void;
  handleMinMaxValue: (type: 'max' | 'min') => void;
  id: Ref<string | undefined>;
  inputEl: Ref<HTMLInputElement | undefined>;
  inputMode: Ref<HTMLAttributes['inputmode']>;
  isDecreaseDisabled: Ref<boolean>;
  isIncreaseDisabled: Ref<boolean>;
  max: Ref<number | undefined>;
  min: Ref<number | undefined>;
  modelValue: Ref<number>;
  onInputElement: (el: HTMLInputElement) => void;
  textValue: Ref<string>;
  validate: (val: string) => boolean;
}

export const [
  injectANumberFieldRootContext,
  provideANumberFieldRootContext,
] = createContext<ANumberFieldRootContext>('ANumberFieldRoot');
</script>

<script setup lang="ts">
import { clamp } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs } from 'vue';

import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { snapValueToStep, useFormControl, useLocale } from '~~/shared';

import { handleDecimalOperation, useNumberFormatter, useNumberParser } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ANumberFieldRootProps>(),
  {
    as: 'div',
    defaultValue: undefined,
    step: 1,
  },
);

const emits = defineEmits<ANumberFieldRootEmits>();
const {
  disabled,
  min,
  max,
  step,
  formatOptions,
  id,
  locale: propLocale,
} = toRefs(props);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<number>;

const { primitiveElement, currentElement } = usePrimitiveElement();

const locale = useLocale(propLocale);
const isFormControl = useFormControl(currentElement);
const inputEl = ref<HTMLInputElement>();

const isDecreaseDisabled = computed(() => {
  return clampInputValue(modelValue.value) === min.value
    || (
      min.value
      && !Number.isNaN(modelValue.value ?? Number.NaN)
        ? (
            handleDecimalOperation({
              operator: '-',
              value1: modelValue.value,
              value2: step.value,
            })
            < min.value
          )
        : false
    );
});

const isIncreaseDisabled = computed(() => {
  return clampInputValue(modelValue.value) === max.value
    || (
      max.value
      && !Number.isNaN(modelValue.value ?? Number.NaN)
        ? (
            handleDecimalOperation({
              operator: '+',
              value1: modelValue.value,
              value2: step.value,
            })
            > max.value
          )
        : false
    );
},
);

function handleChangingValue(type: 'decrease' | 'increase', multiplier = 1) {
  inputEl.value?.focus();
  const currentInputValue = numberParser.parse(inputEl.value?.value ?? '');

  if (props.disabled) {
    return;
  }

  if (Number.isNaN(currentInputValue)) {
    modelValue.value = min.value ?? 0;
  } else {
    if (type === 'increase') {
      modelValue.value = clampInputValue(currentInputValue + ((step.value ?? 1) * multiplier));
    } else {
      modelValue.value = clampInputValue(currentInputValue - ((step.value ?? 1) * multiplier));
    }
  }
}

function handleIncrease(multiplier = 1) {
  handleChangingValue('increase', multiplier);
}

function handleDecrease(multiplier = 1) {
  handleChangingValue('decrease', multiplier);
}

function handleMinMaxValue(type: 'max' | 'min') {
  if (type === 'min' && min.value !== undefined) {
    modelValue.value = clampInputValue(min.value);
  } else if (type === 'max' && max.value !== undefined) {
    modelValue.value = clampInputValue(max.value);
  }
}

// Formatter
const numberFormatter = useNumberFormatter({ locale, options: formatOptions });
const numberParser = useNumberParser({ locale, options: formatOptions });

const inputMode = computed<HTMLAttributes['inputmode']>(() => {
  /**
   * The inputMode attribute influences the software keyboard that is shown on touch devices.
   * Browsers and operating systems are quite inconsistent about what keys are available, however.
   * We choose between numeric and decimal based on whether we allow negative and fractional numbers,
   * and based on testing on various devices to determine what keys are available in each inputMode.
   */
  const hasDecimals = numberFormatter.resolvedOptions().maximumFractionDigits! > 0;

  return hasDecimals ? 'decimal' : 'numeric';
});

/**
 * Replace negative textValue formatted using currencySign: 'accounting'
 * with a textValue that can be announced using a minus sign.
 */
const textValueFormatter = useNumberFormatter({ locale, options: formatOptions });
const textValue = computed(() =>
  Number.isNaN(modelValue.value ?? Number.NaN)
    ? ''
    : textValueFormatter.format(modelValue.value),
);

function validate(val: string) {
  return numberParser.isValidPartialNumber(val, min.value, max.value);
}

function setInputValue(val: string) {
  if (inputEl.value) {
    inputEl.value.value = val;
  }
}

function clampInputValue(val: number) {
  // Clamp to min and max, round to the nearest step, and round to specified number of digits
  let clampedValue: number;

  if (step.value === undefined || Number.isNaN(step.value)) {
    clampedValue = clamp(val, {
      min: min.value,
      max: max.value,
    });
  } else {
    clampedValue = snapValueToStep({
      value: val,
      min: min.value,
      max: max.value,
      step: step.value,
    });
  }

  clampedValue = numberParser.parse(numberFormatter.format(clampedValue));
  return clampedValue;
}

function applyInputValue(val: string) {
  const parsedValue = numberParser.parse(val);

  modelValue.value = clampInputValue(parsedValue);
  // Set to empty state if input value is empty
  if (!val.length) {
    return setInputValue(val);
  }

  // if it failed to parse, then reset input to formatted version of current number
  if (Number.isNaN(parsedValue)) {
    return setInputValue(textValue.value);
  }

  return setInputValue(textValue.value);
}

provideANumberFieldRootContext({
  modelValue,
  handleDecrease,
  handleIncrease,
  handleMinMaxValue,
  inputMode,
  inputEl,
  onInputElement: (el) => {
    inputEl.value = el;
  },
  textValue,
  validate,
  applyInputValue,
  disabled,
  max,
  min,
  isDecreaseDisabled,
  isIncreaseDisabled,
  id,
});
</script>

<template>
  <APrimitive
    v-bind="$attrs"
    ref="primitiveElement"
    role="group"
    :as="as"
    :as-child="asChild"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot
      :model-value="modelValue"
      :text-value="textValue"
    />

    <AVisuallyHiddenInput
      v-if="isFormControl && name"
      type="text"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </APrimitive>
</template>
