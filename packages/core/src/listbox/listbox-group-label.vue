<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AListboxGroupLabelProps extends APrimitiveProps {
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectAListboxGroupContext } from './listbox-group.vue';

const props = withDefaults(defineProps<AListboxGroupLabelProps>(), {
  as: 'div',
});

const groupContext = injectAListboxGroupContext({ id: '' });
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="groupContext.id"
  >
    <slot />
  </APrimitive>
</template>
