<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

export interface ADialogCloseProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/APrimitive';
import { useForwardExpose } from '~~/shared';

import { injectADialogRootContext } from './ADialogRoot.vue';

const props = withDefaults(defineProps<ADialogCloseProps>(), {
  as: 'button',
});

useForwardExpose();
const rootContext = injectADialogRootContext();
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
