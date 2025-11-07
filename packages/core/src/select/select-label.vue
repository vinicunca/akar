<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ASelectLabelProps extends APrimitiveProps {
  for?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectASelectGroupContext } from './select-group.vue';

const props = withDefaults(defineProps<ASelectLabelProps>(), {
  as: 'div',
});

const groupContext = injectASelectGroupContext({ id: '' });
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="groupContext.id"
  >
    <slot />
  </APrimitive>
</template>
