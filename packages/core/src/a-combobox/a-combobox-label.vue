<script lang="ts">
import { useId } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

export interface AComboboxLabelProps extends APrimitiveProps {
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectAComboboxGroupContext } from './a-combobox-group.vue';

const props = withDefaults(
  defineProps<AComboboxLabelProps>(),
  {
    as: 'div',
  },
);

useForwardExpose();
const groupContext = injectAComboboxGroupContext({ id: '', labelId: '' });

groupContext.labelId ||= useId();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="groupContext.labelId"
  >
    <slot />
  </APrimitive>
</template>
