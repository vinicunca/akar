<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface APopoverCloseProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import {
  injectAPopoverRootContext,
} from './popover-root.vue';

const props = withDefaults(defineProps<APopoverCloseProps>(), {
  as: 'button',
});

useForwardExpose();
const rootContext = injectAPopoverRootContext();
</script>

<template>
  <APrimitive
    :type="as === 'button' ? 'button' : undefined"
    :as="as"
    :as-child="props.asChild"
    @click="rootContext.onOpenChange(false)"
  >
    <slot />
  </APrimitive>
</template>
