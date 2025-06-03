<script lang="ts">
import type { ComputedRef, Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { Direction, FormFieldProps } from '~~/shared/types';
import { computed, ref, toRefs, watch } from 'vue';
import { createContext, useDirection, useForwardExpose } from '~~/shared';
import AVisuallyHiddenInput from '~~/visually-hidden/visually-hidden-input.vue';

export type APinInputType = 'text' | 'number';

// Using this type to avoid mixed arrays (string | number)[].
export type APinInputValue<Type extends APinInputType = 'text'> = Type extends 'number' ? Array<number> : Array<string>;

export type APinInputRootEmits<Type extends APinInputType = 'text'> = {
  'update:modelValue': [value: APinInputValue<Type>];
  'complete': [value: APinInputValue<Type>];
};

export interface APinInputRootProps<Type extends APinInputType = 'text'> extends APrimitiveProps, FormFieldProps {
  /** The controlled checked state of the pin input. Can be binded as `v-model`. */
  modelValue?: APinInputValue<Type> | null;
  /** The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked state. */
  defaultValue?: APinInputValue<Type>;
  /** The placeholder character to use for empty pin-inputs. */
  placeholder?: string;
  /** When `true`, pin inputs will be treated as password. */
  mask?: boolean;
  /** When `true`, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field. */
  otp?: boolean;
  /** Input type for the inputs. */
  type?: Type;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with the pin input */
  disabled?: boolean;
  /** Id of the element */
  id?: string;
}

export interface PinInputRootContext<Type extends APinInputType = 'text'> {
  modelValue: Ref<APinInputValue<Type>>;
  currentModelValue: ComputedRef<APinInputValue<Type>>;
  mask: Ref<boolean>;
  otp: Ref<boolean>;
  placeholder: Ref<string>;
  type: Ref<APinInputType>;
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  isCompleted: ComputedRef<boolean>;
  inputElements?: Ref<Set<HTMLInputElement>>;
  onInputElementChange: (el: HTMLInputElement) => void;
}

export const [
  injectAPinInputRootContext,
  providePinInputRootContext,
] = createContext<PinInputRootContext<APinInputType>>('APinInputRoot');
</script>

<script setup lang="ts" generic="Type extends APinInputType = 'text'">
import { useVModel } from '@vueuse/core';
import { APrimitive } from '~~/primitive';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<APinInputRootProps<Type>>(),
  {
    placeholder: '',
    type: 'text' as any,
  },
);
const emits = defineEmits<APinInputRootEmits<Type>>();

defineSlots<{
  default?: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { mask, otp, placeholder, type, disabled, dir: propDir } = toRefs(props);
const { forwardRef } = useForwardExpose();
const dir = useDirection(propDir);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? [] as any,
  passive: (props.modelValue === undefined) as false,
}) as Ref<APinInputValue<Type>>;

const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);

const inputElements = ref<Set<HTMLInputElement>>(new Set());
function onInputElementChange(el: HTMLInputElement) {
  inputElements.value.add(el);
}

const isCompleted = computed(() => {
  const modelValues = currentModelValue.value.filter((i) => !!i);
  return modelValues.length === inputElements.value.size;
});

watch(modelValue, () => {
  if (isCompleted.value) {
    emits('complete', modelValue.value);
  }
}, { deep: true });

providePinInputRootContext({
  modelValue,
  currentModelValue: currentModelValue as ComputedRef<APinInputValue<Type>>,
  mask,
  otp,
  placeholder,
  type,
  dir,
  disabled,
  isCompleted,
  inputElements,
  onInputElementChange,
});
</script>

<template>
  <APrimitive
    v-bind="$attrs"
    :ref="forwardRef"
    :dir="dir"
    :data-complete="isCompleted ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot :model-value="modelValue" />

    <AVisuallyHiddenInput
      :id="id"
      as="input"
      feature="focusable"
      tabindex="-1"
      :value="currentModelValue.join('')"
      :name="name ?? ''"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(inputElements)?.[0]?.focus()"
    />
  </APrimitive>
</template>
