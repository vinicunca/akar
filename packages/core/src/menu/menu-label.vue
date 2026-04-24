<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMenuLabelProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAMenuGroupContext } from './menu-group.vue';

defineOptions({ name: 'AMenuLabel' });

const props = withDefaults(defineProps<AMenuLabelProps>(), {
  as: 'div',
});

const groupContext = injectAMenuGroupContext({ id: '' });
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="groupContext.id || undefined"
  >
    <slot />
  </APrimitive>
</template>
