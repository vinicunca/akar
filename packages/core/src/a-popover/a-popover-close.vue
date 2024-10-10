<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface APopoverCloseProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import {
  injectAPopoverRootContext,
} from './a-popover-root.vue';

const props = withDefaults(
  defineProps<APopoverCloseProps>(),
  {
    as: 'button',
  },
);

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
