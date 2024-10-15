<script lang="ts">
import type { ComputedRef, Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';
import type { Direction, FormFieldProps } from '~~/shared/types';

import { createContext, useDirection, useForwardExpose } from '~~/shared';

export type APinInputRootEmits = {
  'complete': [value: Array<string>];
  'update:modelValue': [value: Array<string>];
};

export interface APinInputRootProps extends APrimitiveProps, FormFieldProps {
  /** The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked state. */
  defaultValue?: Array<string>;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with the pin input */
  disabled?: boolean;
  /** Id of the element */
  id?: string;
  /** When `true`, pin inputs will be treated as password. */
  mask?: boolean;
  /** The controlled checked state of the pin input. Can be binded as `v-model`. */
  modelValue?: Array<string>;
  /** When `true`, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field. */
  otp?: boolean;
  /** The placeholder character to use for empty pin-inputs. */
  placeholder?: string;
  /** Input type for the inputs. */
  type?: 'number' | 'text';
}

export interface APinInputRootContext {
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  inputElements?: Ref<Set<HTMLInputElement>>;
  isCompleted: ComputedRef<boolean>;
  mask: Ref<boolean>;
  modelValue: Ref<Array<string>>;
  onInputElementChange: (el: HTMLInputElement) => void;
  otp: Ref<boolean>;
  placeholder: Ref<string>;
  type: Ref<APinInputRootProps['type']>;
}

export const [
  injectAPinInputRootContext,
  provideAPinInputRootContext,
] = createContext<APinInputRootContext>('APinInputRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, ref, toRefs, watch } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<APinInputRootProps>(),
  {
    placeholder: '',
    type: 'text',
  },
);

const emits = defineEmits<APinInputRootEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const {
  mask,
  otp,
  placeholder,
  type,
  disabled,
  dir: propDir,
} = toRefs(props);
const { forwardRef } = useForwardExpose();
const dir = useDirection(propDir);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue ?? [],
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<Array<string>>;

const inputElements = ref<Set<HTMLInputElement>>(new Set());

function onInputElementChange(el: HTMLInputElement) {
  inputElements.value.add(el);
}

const isCompleted = computed(() => {
  const modelValues = modelValue.value.filter((item) => !!item);

  return modelValues.length === inputElements.value.size;
});

watch(
  modelValue,
  () => {
    if (isCompleted.value) {
      emits('complete', modelValue.value);
    }
  },
  { deep: true },
);

provideAPinInputRootContext({
  modelValue,
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
      :value="modelValue.join('')"
      :name="name ?? ''"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(inputElements)?.[0]?.focus()"
    />
  </APrimitive>
</template>
