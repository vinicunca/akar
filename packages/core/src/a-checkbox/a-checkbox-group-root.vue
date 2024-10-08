<script lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, type Ref, toRefs } from 'vue';

import type { ARovingFocusGroupProps } from '~~/a-roving-focus';
import type { AcceptableValue, FormFieldProps } from '~~/shared/types';

import { createContext } from '~~/shared';

export interface ACheckboxGroupRootProps<T = AcceptableValue> extends Pick<ARovingFocusGroupProps, 'as' | 'asChild' | 'dir' | 'loop' | 'orientation'>, FormFieldProps {
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: Array<T>;
  /** When `true`, prevents the user from interacting with the checkboxes */
  disabled?: boolean;
  /** The controlled value of the checkbox. Can be binded with v-model. */
  modelValue?: Array<T>;
  /** When `false`, navigating through the items using arrow keys will be disabled. */
  rovingFocus?: boolean;
}

export type ACheckboxGroupRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: Array<T>];
};

interface ACheckboxGroupRootContext {
  disabled: Ref<boolean>;
  modelValue: Ref<Array<AcceptableValue>>;
  rovingFocus: Ref<boolean>;
}

export const [
  injectACheckboxGroupRootContext,
  provideACheckboxGroupRootContext,
] = createContext<ACheckboxGroupRootContext>('ACheckboxGroupRoot');
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { APrimitive, usePrimitiveElement } from '~~/a-primitive';
import { ARovingFocusGroup } from '~~/a-roving-focus';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { useDirection, useFormControl } from '~~/shared';

const props = withDefaults(
  defineProps<ACheckboxGroupRootProps<T>>(),
  {
    rovingFocus: true,
  },
);

const emits = defineEmits<ACheckboxGroupRootEmits<T>>();

const { disabled, rovingFocus, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

const { primitiveElement, currentElement } = usePrimitiveElement();
const isFormControl = useFormControl(currentElement);

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue ?? [],
    passive: (props.modelValue === undefined) as false,
  },
) as Ref<Array<T>>;

const rovingFocusProps = computed(() => {
  return rovingFocus.value ? { loop: props.loop, dir: dir.value, orientation: props.orientation } : {};
});

provideACheckboxGroupRootContext({
  modelValue,
  rovingFocus,
  disabled,
});
</script>

<template>
  <component
    :is="rovingFocus ? ARovingFocusGroup : APrimitive"
    ref="primitiveElement"
    :as="as"
    :as-child="asChild"
    v-bind="rovingFocusProps"
  >
    <slot />

    <AVisuallyHiddenInput
      v-if="isFormControl && name"
      :name="name"
      :value="modelValue"
      :required="required"
    />
  </component>
</template>
