<script lang="ts">
import type { PrimitiveProps } from '@/Primitive';
import type { Direction, FormFieldProps } from '@/shared/types';
import { useFocusOutside, usePointerDownOutside } from '@/DismissableLayer';
import { createAkarContext, useDirection, useFormControl } from '@/shared';

type ActivationMode = 'focus' | 'dblclick' | 'none';
type SubmitMode = 'blur' | 'enter' | 'none' | 'both';

type EditableRootContext = {
  id: Ref<string | undefined>;
  name: Ref<string | undefined>;
  maxLength: Ref<number | undefined>;
  disabled: Ref<boolean>;
  modelValue: Ref<string | null | undefined>;
  inputValue: Ref<string | null | undefined>;
  placeholder: Ref<{ edit: string; preview: string }>;
  isEditing: Ref<boolean>;
  submitMode: Ref<SubmitMode>;
  activationMode: Ref<ActivationMode>;
  selectOnFocus: Ref<boolean>;
  edit: () => void;
  cancel: () => void;
  submit: () => Promise<void>;
  isSubmitting: Ref<boolean>;
  multiline: Ref<boolean>;
  inputRef: Ref<HTMLInputElement | undefined>;
  startWithEditMode: Ref<boolean>;
  isEmpty: Ref<boolean>;
  readonly: Ref<boolean>;
  autoResize: Ref<boolean>;
};

export interface EditableRootProps extends PrimitiveProps, FormFieldProps {
  /** The default value of the editable field */
  defaultValue?: string;
  /** The value of the editable field */
  modelValue?: string | null;
  /** The placeholder for the editable field */
  placeholder?: string | { edit: string; preview: string };
  /** The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** Whether the editable field is disabled */
  disabled?: boolean;
  /** Whether the editable field is read-only */
  readonly?: boolean;
  /** The activation event of the editable field */
  activationMode?: ActivationMode;
  /** Whether to select the text in the input when it is focused. */
  selectOnFocus?: boolean;
  /** The submit event of the editable field */
  submitMode?: SubmitMode;
  /** Whether to start with the edit mode active */
  startWithEditMode?: boolean;
  /** The maximum number of characters allowed */
  maxLength?: number;
  /** Whether the editable field should auto resize */
  autoResize?: boolean;
  /** The id of the field */
  id?: string;
  /**
   * Runs before a submit is accepted. It may return a promise. While it is pending the editor
   * stays open and is busy. If it resolves `false` or rejects, the editor stays open and the typed
   * value is kept. Rejections are caught: report your own errors from inside this function.
   */
  beforeSubmit?: (value: string | null | undefined) => boolean | void | Promise<boolean | void>;
  /** Whether the field is multi-line. Enter adds a line break. Ctrl+Enter or Cmd+Enter submits. */
  multiline?: boolean;
}

export type EditableRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [value: string];
  /** Event handler called when a value is submitted */
  'submit': [value: string | null | undefined];
  /** Event handler called when the editable field changes state */
  'update:state': [state: 'edit' | 'submit' | 'cancel'];
};

export const [injectEditableRootContext, provideEditableRootContext]
  = createAkarContext<EditableRootContext>('EditableRoot');
</script>

<script setup lang="ts">
import type { Ref } from 'vue';
import { isString } from '@vinicunca/perkakas';
import { useVModel } from '@vueuse/core';
import { computed, nextTick, ref, toRefs, watch } from 'vue';
import { Primitive, usePrimitiveElement } from '@/Primitive';
import { VisuallyHiddenInput } from '@/VisuallyHidden';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<EditableRootProps>(), {
  as: 'div',
  disabled: false,
  submitMode: 'blur',
  activationMode: 'focus',
  selectOnFocus: false,
  placeholder: 'Enter text...',
  autoResize: false,
  required: false,
  multiline: false,
  beforeSubmit: undefined,
});

const emits = defineEmits<EditableRootEmits>();
defineSlots<{
  default?: (props: {
    /** Whether the editable field is in edit mode */
    isEditing: boolean;
    /** The value of the editable field */
    modelValue: typeof modelValue.value;
    /** Whether the editable field is empty */
    isEmpty: boolean;
    /** Function to submit the value of the editable */
    submit: () => Promise<void>;
    /** Whether a submit is pending (`beforeSubmit` has not settled yet) */
    isSubmitting: boolean;
    /** The current value of the input, before it is submitted */
    inputValue: typeof inputValue.value;
    /** Function to cancel the value of the editable */
    cancel: () => void;
    /** Function to set the editable in edit mode */
    edit: () => void;
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
  multiline,
} = toRefs(props);

const inputRef = ref<HTMLInputElement | undefined>();
const dir = useDirection(propDir);
const isEditing = ref(startWithEditMode.value ?? false);
const isSubmitting = ref(false);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: defaultValue.value ?? '',
  passive: (props.modelValue === undefined) as false,
});

const { primitiveElement, currentElement } = usePrimitiveElement();

const isFormControl = useFormControl(currentElement);

const placeholder = computed(() => {
  return isString(propPlaceholder.value)
    ? { edit: propPlaceholder.value, preview: propPlaceholder.value }
    : propPlaceholder.value;
});

const inputValue = ref(modelValue.value);

watch(() => modelValue.value, () => {
  inputValue.value = modelValue.value;
}, { immediate: true, deep: true });

function cancel() {
  if (isSubmitting.value) {
    return;
  }
  isEditing.value = false;
  emits('update:state', 'cancel');
}

function edit() {
  isEditing.value = true;
  inputValue.value = modelValue.value;

  emits('update:state', 'edit');
}

function commit(value: string | null | undefined) {
  modelValue.value = value;
  isEditing.value = false;

  emits('update:state', 'submit');
  emits('submit', value);
}

async function submit(): Promise<void> {
  if (isSubmitting.value) {
    return;
  }

  const guard = props.beforeSubmit;
  if (!guard) {
    commit(inputValue.value);
    return;
  }

  // Commit the value the guard saw, even if modelValue changes while it is pending.
  const value = inputValue.value;
  isSubmitting.value = true;
  let accepted = false;
  try {
    accepted = (await guard(value)) !== false;
  } catch {
    accepted = false;
  } finally {
    isSubmitting.value = false;
  }

  if (accepted) {
    commit(value);
  } else {
    // The input was disabled while saving, which drops focus. Give it back.
    await nextTick();
    inputRef.value?.focus({ preventScroll: true });
  }
}

function handleDismiss() {
  if (isEditing.value && !isSubmitting.value) {
    if (submitMode.value === 'blur' || submitMode.value === 'both') {
      submit();
    } else {
      cancel();
    }
  }
}

const pointerDownOutside = usePointerDownOutside(() => handleDismiss(), currentElement, isEditing);
const focusOutside = useFocusOutside(() => handleDismiss(), currentElement, isEditing);

const isEmpty = computed(() => modelValue.value === '');

defineExpose({
  /** Function to submit the value of the editable */
  submit,
  /** Function to cancel the value of the editable */
  cancel,
  /** Function to set the editable in edit mode */
  edit,
});

provideEditableRootContext({
  id,
  name,
  disabled,
  isEditing,
  maxLength,
  modelValue,
  inputValue,
  placeholder,
  edit,
  cancel,
  submit,
  isSubmitting,
  multiline,
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
  <Primitive
    v-bind="$attrs"
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    :dir="dir"
    data-dismissable-layer
    data-editable-root
    :data-submitting="isSubmitting ? '' : undefined"
    @focus.capture="focusOutside.onFocusCapture"
    @blur.capture="focusOutside.onBlurCapture"
    @pointerdown.capture="pointerDownOutside.onPointerDownCapture"
  >
    <slot
      :model-value="modelValue"
      :is-editing="isEditing"
      :is-empty="isEmpty"
      :submit="submit"
      :is-submitting="isSubmitting"
      :input-value="inputValue"
      :cancel="cancel"
      :edit="edit"
    />

    <VisuallyHiddenInput
      v-if="isFormControl && name"
      type="text"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
