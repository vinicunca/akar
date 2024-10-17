<script lang="ts">
import type { Ref } from 'vue';

import { createContext } from '~~/shared';

import type { AMenuGroupProps } from './a-menu-group.vue';

interface AMenuRadioGroupContext {
  modelValue: Ref<string>;
  onValueChange: (payload: string) => void;
}

export interface AMenuRadioGroupProps extends AMenuGroupProps {
  /** The value of the selected item in the group. */
  modelValue?: string;
}

export type AMenuRadioGroupEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: string];
};

export const [
  injectAMenuRadioGroupContext,
  provideAMenuRadioGroupContext,
] = createContext<AMenuRadioGroupContext>('MenuRadioGroup');
</script>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import AMenuGroup from './a-menu-group.vue';

const props = withDefaults(
  defineProps<AMenuRadioGroupProps>(),
  {
    modelValue: '',
  },
);

const emits = defineEmits<AMenuRadioGroupEmits>();

defineSlots<{
  default: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const modelValue = useVModel(
  props,
  'modelValue',
  emits,
);

provideAMenuRadioGroupContext({
  modelValue,
  onValueChange: (payload) => {
    modelValue.value = payload;
  },
});
</script>

<template>
  <AMenuGroup v-bind="props">
    <slot :model-value="modelValue" />
  </AMenuGroup>
</template>
