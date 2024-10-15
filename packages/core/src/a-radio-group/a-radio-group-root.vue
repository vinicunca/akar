<script lang="ts">
import type { Ref } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

import {
  type AcceptableValue,
  createContext,
  type DataOrientation,
  type Direction,
  type FormFieldProps,
} from '~~/shared';

export interface ARadioGroupRootProps extends APrimitiveProps, FormFieldProps {
  /**
   * The value of the radio item that should be checked when initially rendered.
   *
   * Use when you do not need to control the state of the radio items.
   */
  defaultValue?: AcceptableValue;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with radio items. */
  disabled?: boolean;
  /** When `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
  /** The controlled value of the radio item to check. Can be binded as `v-model`. */
  modelValue?: AcceptableValue;
  /** The orientation of the component. */
  orientation?: DataOrientation;
}
export type ARadioGroupRootEmits = {
  /** Event handler called when the radio group value changes */
  'update:modelValue': [payload: string];
};

interface ARadioGroupRootContext {
  changeModelValue: (value?: AcceptableValue) => void;
  disabled: Ref<boolean>;
  loop: Ref<boolean>;
  modelValue?: Readonly<Ref<AcceptableValue | undefined>>;
  name?: string;
  orientation: Ref<DataOrientation | undefined>;
  required: Ref<boolean>;
}

export const [
  injectARadioGroupRootContext,
  provideARadioGroupRootContext,
]
  = createContext<ARadioGroupRootContext>('ARadioGroupRoot');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { ARovingFocusGroup } from '~~/a-roving-focus';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { useDirection, useFormControl, useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<ARadioGroupRootProps>(),
  {
    disabled: false,
    required: false,
    orientation: undefined,
    loop: true,
  },
);

const emits = defineEmits<ARadioGroupRootEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const { forwardRef, currentElement } = useForwardExpose();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
  {
    defaultValue: props.defaultValue,
    passive: (props.modelValue === undefined) as false,
  },
);

const { disabled, loop, orientation, name, required, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const isFormControl = useFormControl(currentElement);

provideARadioGroupRootContext({
  modelValue,
  changeModelValue: (value) => {
    modelValue.value = value;
  },
  disabled,
  loop,
  orientation,
  name: name?.value,
  required,
});
</script>

<template>
  <ARovingFocusGroup
    as-child
    :orientation="orientation"
    :dir="dir"
    :loop="loop"
  >
    <APrimitive
      :ref="forwardRef"
      role="radiogroup"
      :data-disabled="disabled ? '' : undefined"
      :as-child="asChild"
      :as="as"
      :aria-orientation="orientation"
      :aria-required="required"
      :dir="dir"
    >
      <slot :model-value="modelValue" />

      <AVisuallyHiddenInput
        v-if="isFormControl && name"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        :name="name"
      />
    </APrimitive>
  </ARovingFocusGroup>
</template>
