<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import type { FormFieldProps } from '~~/shared/types';
import { useFormControl, useForwardExpose } from '~~/shared';
import { injectAToggleGroupRootContext } from '~~/toggle-group/toggle-group-root.vue';
import AVisuallyHiddenInput from '~~/visually-hidden/visually-hidden-input.vue';

export type AToggleEmits = {
  /** Event handler called when the value of the toggle changes. */
  'update:modelValue': [value: boolean];
};

export type DataState = 'off' | 'on';

export interface AToggleProps extends APrimitiveProps, FormFieldProps {
  /**
   * The pressed state of the toggle when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultValue?: boolean;
  /**
   * The controlled pressed state of the toggle. Can be bind as `v-model`.
   */
  modelValue?: boolean | null;
  /**
   * When `true`, prevents the user from interacting with the toggle.
   */
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, type Ref } from 'vue';
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<AToggleProps>(), {
  modelValue: undefined,
  disabled: false,
  as: 'button',
});

const emits = defineEmits<AToggleEmits>();

defineSlots<{
  default: (props: {
    /** Current pressed state */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { forwardRef, currentElement } = useForwardExpose();
const toggleGroupContext = injectAToggleGroupRootContext(null);

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false,
}) as Ref<boolean>;

function togglePressed() {
  modelValue.value = !modelValue.value;
}

const dataState = computed<DataState>(() => {
  return modelValue.value ? 'on' : 'off';
});

const isFormControl = useFormControl(currentElement);
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :type="as === 'button' ? 'button' : undefined"
    :as-child="props.asChild"
    :as="as"
    :aria-pressed="modelValue"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="togglePressed"
  >
    <slot :model-value="modelValue" />

    <AVisuallyHiddenInput
      v-if="isFormControl && name && !toggleGroupContext"
      type="checkbox"
      :name="name"
      :value="modelValue"
      :required="required"
    />
  </APrimitive>
</template>
