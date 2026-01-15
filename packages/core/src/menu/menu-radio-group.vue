<script lang="ts">
import type { Ref } from 'vue';
import type { AcceptableValue } from '../shared/types';
import type { AMenuGroupProps } from './menu-group.vue';
import { createContext } from '../shared';

interface MenuRadioGroupContext {
  modelValue: Ref<AcceptableValue>;
  onValueChange: (payload: AcceptableValue) => void;
}

export interface AMenuRadioGroupProps extends AMenuGroupProps {
  /** The value of the selected item in the group. */
  modelValue?: AcceptableValue;
}

export type AMenuRadioGroupEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: AcceptableValue];
};

export const [injectMenuRadioGroupContext, provideMenuRadioGroupContext]
  = createContext<MenuRadioGroupContext>('AMenuRadioGroup');
</script>

<script setup lang="ts">
import { reactiveOmit, useVModel } from '@vueuse/core';
import { useForwardProps } from '../shared';
import AMenuGroup from './menu-group.vue';

const props = withDefaults(defineProps<AMenuRadioGroupProps>(), {
  modelValue: '',
});
const emits = defineEmits<AMenuRadioGroupEmits>();

defineSlots<{
  default?: (props: {
    /** Current input values */
    modelValue: typeof modelValue.value;
  }) => any;
}>();

const delegatedProps = reactiveOmit(props, ['modelValue']);
const forwarded = useForwardProps(delegatedProps);

const modelValue = useVModel(props, 'modelValue', emits);

provideMenuRadioGroupContext({
  modelValue,
  onValueChange: (payload) => {
    modelValue.value = payload;
  },
});
</script>

<template>
  <AMenuGroup v-bind="forwarded">
    <slot :model-value="modelValue" />
  </AMenuGroup>
</template>
