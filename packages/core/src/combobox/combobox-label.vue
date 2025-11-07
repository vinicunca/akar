<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AComboboxLabelProps extends APrimitiveProps {
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { useForwardExpose, useId } from '../shared';
import { injectAComboboxGroupContext } from './combobox-group.vue';

const props = withDefaults(defineProps<AComboboxLabelProps>(), {
  as: 'div',
});

useForwardExpose();
const groupContext = injectAComboboxGroupContext({ id: '', labelId: '' });

groupContext.labelId ||= useId(undefined, 'akar-combobox-group-label');
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="groupContext.labelId"
  >
    <slot />
  </APrimitive>
</template>
