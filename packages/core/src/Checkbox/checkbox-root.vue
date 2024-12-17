<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { AcceptableValue, FormFieldProps } from '~~/shared/types';
import type { CheckboxCheckedState } from './utils';
import { isDeepEqual } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { createContext, isValueEqualOrExist, useFormControl, useForwardExpose } from '~~/shared';
import { injectACheckboxGroupRootContext } from './checkbox-group-root.vue';

export interface ACheckboxRootProps extends APrimitiveProps, FormFieldProps {
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: 'indeterminate' | boolean;
  /** The controlled value of the checkbox. Can be binded with v-model. */
  modelValue?: 'indeterminate' | boolean;
  /** When `true`, prevents the user from interacting with the checkbox */
  disabled?: boolean;
  /**
   * The value given as data when submitted with a `name`.
   *  @defaultValue "on"
   */
  value?: AcceptableValue;
  /** Id of the element */
  id?: string;
}

export type ACheckboxRootEmits = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: 'indeterminate' | boolean];
};

interface CheckboxRootContext {
  disabled: Ref<boolean>;
  state: Ref<CheckboxCheckedState>;
}

export const [injectACheckboxRootContext, provideCheckboxRootContext]
  = createContext<CheckboxRootContext>('ACheckboxRoot');
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { ARovingFocusItem } from '~~/roving-focus';
import { AVisuallyHiddenInput } from '~~/visually-hidden';
import { getState, isIndeterminate } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ACheckboxRootProps>(), {
  modelValue: undefined,
  value: 'on',
  as: 'button',
});
const emits = defineEmits<ACheckboxRootEmits>();

defineSlots<{
  default: (props: {
    /** Current value */
    modelValue: typeof modelValue.value;
    /** Current state */
    state: typeof checkboxState.value;
  }) => any;
}>();

const { forwardRef, currentElement } = useForwardExpose();

const checkboxGroupContext = injectACheckboxGroupRootContext(null);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
}) as Ref<CheckboxCheckedState>;

const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);

const checkboxState = computed<CheckboxCheckedState>(() => {
  if (checkboxGroupContext?.modelValue.value !== undefined) {
    return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
  } else {
    return modelValue.value === 'indeterminate' ? 'indeterminate' : modelValue.value;
  }
});

function handleClick() {
  if (checkboxGroupContext?.modelValue.value !== undefined) {
    const modelValueArray = [...(checkboxGroupContext.modelValue.value || [])];
    if (isValueEqualOrExist(modelValueArray, props.value)) {
      const index = modelValueArray.findIndex((i) => isDeepEqual(i, props.value));
      modelValueArray.splice(index, 1);
    } else {
      modelValueArray.push(props.value);
    }
    checkboxGroupContext.modelValue.value = modelValueArray;
  } else {
    modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
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
