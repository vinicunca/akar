<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '../primitive';
import type { AcceptableValue, FormFieldProps } from '../shared/types';
import type { CheckboxCheckedState } from './utils';
import { isDeepEqual, isNullish } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { createContext, isValueEqualOrExist, useFormControl, useForwardExpose } from '../shared';
import { injectACheckboxGroupRootContext } from './checkbox-group-root.vue';

export interface ACheckboxRootProps<T = boolean> extends APrimitiveProps, FormFieldProps {
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: 'indeterminate' | T;
  /** The controlled value of the checkbox. Can be binded with v-model. */
  modelValue?: T | 'indeterminate' | null;
  /** When `true`, prevents the user from interacting with the checkbox */
  disabled?: boolean;
  /**
   * The value given as data when submitted with a `name`.
   *  @defaultValue "on"
   */
  value?: AcceptableValue;
  /** Id of the element */
  id?: string;
  /**
   * The value used when the checkbox is checked. Defaults to `true`.
   */
  trueValue?: T;
  /**
   * The value used when the checkbox is unchecked. Defaults to `false`.
   */
  falseValue?: T;
}

export type ACheckboxRootEmits<T = boolean> = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: 'indeterminate' | T];
};

interface CheckboxRootContext {
  disabled: Ref<boolean>;
  state: Ref<CheckboxCheckedState>;
}

export const [
  injectACheckboxRootContext,
  provideCheckboxRootContext,
] = createContext<CheckboxRootContext>('ACheckboxRoot');
</script>

<script setup lang="ts" generic="T = boolean">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { ARovingFocusItem } from '../roving-focus';
import { AVisuallyHiddenInput } from '../visually-hidden';
import { getState, isIndeterminate } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ACheckboxRootProps<T>>(),
  {
    modelValue: undefined,
    value: 'on',
    as: 'button',
    trueValue: (() => true) as unknown as undefined,
    falseValue: (() => false) as unknown as undefined,
  },
);

const emits = defineEmits<ACheckboxRootEmits<T>>();

defineSlots<{
  default?: (props: {
    /** Current value */
    modelValue: typeof modelValue.value;
    /** Current state */
    state: typeof checkboxState.value;
  }) => any;
}>();

const { forwardRef, currentElement } = useForwardExpose();

const checkboxGroupContext = injectACheckboxGroupRootContext(null);

const modelValue = useVModel(
  props as any,
  'modelValue',
  emits as any,
  {
    defaultValue: props.defaultValue ?? props.falseValue,
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<T | 'indeterminate'>;

const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);

const isChecked = computed(() => isDeepEqual(modelValue.value, props.trueValue));

const checkboxState = computed<CheckboxCheckedState>(() => {
  if (!isNullish(checkboxGroupContext?.modelValue.value)) {
    return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
  } else {
    if (modelValue.value === 'indeterminate') {
      return 'indeterminate';
    }

    return isChecked.value;
  }
});

function handleClick() {
  if (!isNullish(checkboxGroupContext?.modelValue.value)) {
    const modelValueArray = [...(checkboxGroupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, props.value)) {
      const index = modelValueArray.findIndex((i) => isDeepEqual(i, props.value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(props.value);
    }
    checkboxGroupContext.modelValue.value = modelValueArray;
  } else {
    if (modelValue.value === 'indeterminate') {
      modelValue.value = props.trueValue as T;
    } else {
      modelValue.value = isChecked.value ? props.falseValue as T : props.trueValue as T;
    }
  }
}

const isFormControl = useFormControl(currentElement);
const ariaLabel = computed(() => props.id && currentElement.value
  ? (document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent
  : undefined);

provideCheckboxRootContext({
  disabled,
  state: checkboxState,
});
</script>

<template>
  <component
    v-bind="$attrs"
    :is="checkboxGroupContext?.rovingFocus.value ? ARovingFocusItem : APrimitive"
    :id="id"
    :ref="forwardRef"
    role="checkbox"
    :as-child="asChild"
    :as="as"
    :type="as === 'button' ? 'button' : undefined"
    :aria-checked="isIndeterminate(checkboxState) ? 'mixed' : checkboxState"
    :aria-required="required"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :data-state="getState(checkboxState)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :focusable="checkboxGroupContext?.rovingFocus.value ? !disabled : undefined"
    @keydown.enter.prevent="() => {
      // According to WAI ARIA, Checkboxes don't activate on enter keypress
    }"
    @click="handleClick"
  >
    <slot
      :model-value="modelValue"
      :state="checkboxState"
    />

    <AVisuallyHiddenInput
      v-if="isFormControl && name && !checkboxGroupContext"
      type="checkbox"
      :checked="!!checkboxState"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
    />
  </component>
</template>
