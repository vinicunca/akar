<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';
import type { AcceptableValue, FormFieldProps } from '~~/shared/types';

import type { SelectEvent } from './utils';

export type ARadioEmits = {
  'select': [SelectEvent];
  'update:checked': [value: boolean];
};

export interface ARadioProps extends APrimitiveProps, FormFieldProps {
  checked?: boolean;
  /** When `true`, prevents the user from interacting with the radio item. */
  disabled?: boolean;
  id?: string;
  /** The value given as data when submitted with a `name`. */
  value?: AcceptableValue;
}
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { computed, toRefs } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { AVisuallyHiddenInput } from '~~/a-visually-hidden';
import { useFormControl, useForwardExpose } from '~~/shared';

import { handleSelect } from './utils';

const props = withDefaults(
  defineProps<ARadioProps>(),
  {
    disabled: false,
    checked: undefined,
    as: 'button',
  },
);

const emits = defineEmits<ARadioEmits>();

defineSlots<{
  default: (props: {
    /** Current checked state */
    checked: typeof checked.value;
  }) => any;
}>();

const checked = useVModel(
  props,
  'checked',
  emits,
  {
    passive: (props.checked === undefined) as false,
  },
);

const { value } = toRefs(props);
const { forwardRef, currentElement: triggerElement } = useForwardExpose();
const isFormControl = useFormControl(triggerElement);

const ariaLabel = computed(() =>
  props.id && triggerElement.value
    ? (document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent ?? props.value
    : undefined,
);

function handleClick(event: MouseEvent) {
  handleSelect({
    event,
    value: props.value,
    callback: (ev) => {
      emits('select', ev);
      if (ev?.defaultPrevented) {
        return;
      }

      checked.value = true;

      if (isFormControl.value) {
        /**
         * If radio is in a form, stop propagation from the button so that we only propagate
         * one click event (from the input). We propagate changes from an input so that native
         * form validation works and form events reflect radio updates.
         */
        ev.stopPropagation();
      }
    },
  });
}
</script>

<template>
  <APrimitive
    v-bind="$attrs"
    :id="id"
    :ref="forwardRef"
    role="radio"
    :type="as === 'button' ? 'button' : undefined"
    :as="as"
    :aria-checked="checked"
    :aria-label="ariaLabel"
    :as-child="asChild"
    :disabled="disabled ? '' : undefined"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :value="value"
    :required="required"
    :name="name"
    @click.stop="handleClick"
  >
    <slot :checked="checked" />

    <AVisuallyHiddenInput
      v-if="isFormControl && name"
      type="radio"
      tabindex="-1"
      :value="value"
      :checked="!!checked"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </APrimitive>
</template>
