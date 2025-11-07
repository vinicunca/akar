<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ADialogCloseProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { useForwardExpose } from '../shared';
import { injectDialogRootContext } from './dialog-root.vue';

const props = withDefaults(defineProps<ADialogCloseProps>(), {
  as: 'button',
});

useForwardExpose();
const rootContext = injectDialogRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    @click="rootContext.onOpenChange(false)"
  >
    <slot />
  </APrimitive>
</template>
