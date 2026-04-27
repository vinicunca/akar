<script lang="ts">
import type { AListboxRootEmits, AListboxRootProps } from '../listbox';
import { useVModel } from '@vueuse/core';
import { useForwardPropsEmits } from '../shared';

export interface AColorSwatchPickerRootProps extends Omit<AListboxRootProps, 'by'> {
  defaultValue?: string | Array<string>;
  modelValue?: string | Array<string>;
}

export type AColorSwatchPickerRootEmits = AListboxRootEmits;
</script>

<script setup lang="ts">
import { AListboxContent, AListboxRoot } from '../listbox';

defineOptions({ name: 'AColorSwatchPickerRoot' });

const props = withDefaults(
  defineProps<AColorSwatchPickerRootProps>(),
  {
    as: 'div',
    defaultValue: undefined,
    dir: 'ltr',
    disabled: false,
    loop: false,
    orientation: 'horizontal',
  },
);

const emits = defineEmits<AColorSwatchPickerRootEmits>();

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue ?? (props.multiple ? [] : ''),
  // Cast required for VueUse's passive option type; enables passive sync when modelValue is undefined
  passive: (props.modelValue === undefined) as false,
});

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AListboxRoot
    v-bind="forwarded"
    v-model="modelValue"
    as-child
  >
    <AListboxContent
      :as-child="asChild"
      :as="as"
    >
      <slot :model-value="modelValue" />
    </AListboxContent>
  </AListboxRoot>
</template>
