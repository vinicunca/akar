<!-- eslint-disable sonar/no-duplicate-string -->
<script lang="ts">
import type { Ref } from 'vue';

import { isString } from '@vinicunca/perkakas';

import type { APrimitiveProps } from '~~/a-primitive';

import { createContext, type Direction, type FormFieldProps } from '~~/shared';

type ActivationMode = 'dblclick' | 'focus' | 'none';
type SubmitMode = 'blur' | 'both' | 'enter' | 'none';

type AEditableRootContext = {
  activationMode: Ref<ActivationMode>;
  autoResize: Ref<boolean>;
  cancel: () => void;
  disabled: Ref<boolean>;
  edit: () => void;
  id: Ref<string | undefined>;
  inputRef: Ref<HTMLInputElement | undefined>;
  isEditing: Ref<boolean>;
  isEmpty: Ref<boolean>;
  maxLength: Ref<number | undefined>;
  modelValue: Ref<string | undefined>;
  name: Ref<string | undefined>;
  placeholder: Ref<{ edit: string; preview: string }>;
  readonly: Ref<boolean>;
  selectOnFocus: Ref<boolean>;
  startWithEditMode: Ref<boolean>;
  submit: () => void;
  submitMode: Ref<SubmitMode>;
};

export interface AEditableRootProps extends APrimitiveProps, FormFieldProps {
  /** The activation event of the editable field */
  activationMode?: ActivationMode;
  /** Whether the editable field should auto resize */
  autoResize?: boolean;
  /** The default value of the editable field */
  defaultValue?: string;
  /** The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether the editable field is disabled */
  disabled?: boolean;
  /** The id of the field */
  id?: string;
  /** The maximum number of characters allowed */
  maxLength?: number;
  /** The value of the editable field */
  modelValue?: string;
  /** The placeholder for the editable field */
  placeholder?: { edit: string; preview: string } | string;
  /** Whether the editable field is read-only */
  readonly?: boolean;
  /** Whether to select the text in the input when it is focused. */
  selectOnFocus?: boolean;
  /** Whether to start with the edit mode active */
  startWithEditMode?: boolean;
  /** The submit event of the editable field */
  submitMode?: SubmitMode;
}

export type AEditableRootEmits = {
  /** Event handler called when a value is submitted */
  'submit': [value: string | undefined];
  /** Event handler called whenever the model value changes */
  'update:modelValue': [value: string];
  /** Event handler called when the editable field changes state */
  'update:state': [state: 'cancel' | 'edit' | 'submit'];
};

export const [
  injectAEditableRootContext,
  provideAEditableRootContext,
] = createContext<AEditableRootContext>('EditableRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs } from 'vue';

import { useFocusOutside, usePointerDownOutside } from '~~/a-dismissable-layer';
import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { useDirection, useFormControl } from '~~/shared';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<AEditableRootProps>(),
  {
    as: 'div',
    disabled: false,
    submitMode: 'blur',
    activationMode: 'focus',
    selectOnFocus: false,
    placeholder: 'Enter text...',
    autoResize: false,
    required: false,
  },
);

const emits = defineEmits<AEditableRootEmits>();
defineSlots<{
  default: (props: {
    /** Function to cancel the value of the editable */
    cancel: () => void;
    /** Function to set the editable in edit mode */
    edit: () => void;
    /** Whether the editable field is in edit mode */
    isEditing: boolean;
    /** Whether the editable field is empty */
    isEmpty: boolean;
    /** The value of the editable field */
    modelValue: typeof modelValue.value;
    /** Function to submit the value of the editable */
    submit: () => void;
  }) => any;
}>();

const {
  id,
  name,
  defaultValue,
  startWithEditMode,
  placeholder: propPlaceholder,
  maxLength,
  disabled,
  dir: propDir,
  submitMode,
  activationMode,
  selectOnFocus,
  readonly,
  autoResize,
  required,
} = toRefs(props);

const inputRef = ref<HTMLInputElement | undefined>();
const dir = useDirection(propDir);
const isEditing = ref(startWithEditMode.value ?? false);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: defaultValue.value ?? '',
    passive: (props.modelValue === undefined) as false,
  },
);

const { primitiveElement, currentElement } = usePrimitiveElement();

const isFormControl = useFormControl(currentElement);

const placeholder = computed(() => {
  return isString(propPlaceholder.value)
    ? { edit: propPlaceholder.value, preview: propPlaceholder.value }
    : propPlaceholder.value;
});

const previousValue = ref(modelValue.value);

function cancel() {
  modelValue.value = previousValue.value;
  isEditing.value = false;
  emits('update:state', 'cancel');
}

function edit() {
  isEditing.value = true;
  emits('update:state', 'edit');
}

function submit() {
  previousValue.value = modelValue.value;
  isEditing.value = false;

  emits('update:state', 'submit');
  emits('submit', modelValue.value);
}

function handleDismiss() {
  if (isEditing.value) {
    if (submitMode.value === 'blur' || submitMode.value === 'both') {
      submit();
    } else {
      cancel();
    }
  }
}

const pointerDownOutside = usePointerDownOutside({
  onPointerDownOutside: () => handleDismiss(),
  element: currentElement,
});
const focusOutside = useFocusOutside({
  onFocusOutside: () => handleDismiss(),
  element: currentElement,
});
const isEmpty = computed(() => modelValue.value === '');

defineExpose({
  /** Function to submit the value of the editable */
  submit,
  /** Function to cancel the value of the editable */
  cancel,
  /** Function to set the editable in edit mode */
  edit,
});

provideAEditableRootContext({
  id,
  name,
  disabled,
  isEditing,
  maxLength,
  modelValue,
  placeholder,
  edit,
  cancel,
  submit,
  activationMode,
  submitMode,
  selectOnFocus,
  inputRef,
  startWithEditMode,
  isEmpty,
  readonly,
  autoResize,
});
</script>

<template>
  <APrimitive
    v-bind="$attrs"
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    :dir="dir"
    @focus.capture="focusOutside.onFocusCapture"
    @blur.capture="focusOutside.onBlurCapture"
    @pointerdown.capture="pointerDownOutside.onPointerDownCapture"
  >
    <slot
      :model-value="modelValue"
      :is-editing="isEditing"
      :is-empty="isEmpty"
      :submit="submit"
      :cancel="cancel"
      :edit="edit"
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
