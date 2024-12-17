<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { FormFieldProps } from '~~/shared/types';
import { createContext, useFormControl, useForwardExpose } from '~~/shared';

export interface ASwitchRootProps extends APrimitiveProps, FormFieldProps {
  /** The state of the switch when it is initially rendered. Use when you do not need to control its state. */
  defaultValue?: boolean;
  /** The controlled state of the switch. Can be bind as `v-model`. */
  modelValue?: boolean;
  /** When `true`, prevents the user from interacting with the switch. */
  disabled?: boolean;
  id?: string;
  /** The value given as data when submitted with a `name`. */
  value?: string;
}

export type ASwitchRootEmits = {
  /** Event handler called when the value of the switch changes. */
  'update:modelValue': [payload: boolean];
};

export interface SwitchRootContext {
  modelValue?: Ref<boolean>;
  toggleCheck: () => void;
  disabled: Ref<boolean>;
}

export const [injectASwitchRootContext, provideSwitchRootContext]
  = createContext<SwitchRootContext>('ASwitchRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, toRefs } from 'vue';
import { APrimitive } from '~~/primitive';
import { AVisuallyHiddenInput } from '~~/visually-hidden';

const props = withDefaults(defineProps<ASwitchRootProps>(), {
  as: 'button',
  modelValue: undefined,
  value: 'on',
});
const emit = defineEmits<ASwitchRootEmits>();

defineSlots<{
  default: (props: {
    /** Current value */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { disabled } = toRefs(props);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
}) as Ref<boolean>;

function toggleCheck() {
  if (disabled.value) {
    return;
  }

  modelValue.value = !modelValue.value;
}

const { forwardRef, currentElement } = useForwardExpose();
const isFormControl = useFormControl(currentElement);
const ariaLabel = computed(() => props.id && currentElement.value ? (document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent : undefined);

provideSwitchRootContext({
  modelValue,
  toggleCheck,
  disabled,
});
</script>

<template>
  <APrimitive
    v-bind="$attrs"
    :id="id"
    :ref="forwardRef"
    role="switch"
    :type="as === 'button' ? 'button' : undefined"
    :value="value"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :aria-checked="modelValue"
    :aria-required="required"
    :data-state="modelValue ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :as-child="asChild"
    :as="as"
    :disabled="disabled"
    @click="toggleCheck"
    @keydown.enter.prevent="toggleCheck"
  >
    <slot :model-value="modelValue" />

    <AVisuallyHiddenInput
      v-if="isFormControl && name"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :required="required"
      :value="value"
      :checked="!!modelValue"
    />
  </APrimitive>
</template>
