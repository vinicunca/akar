<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

export interface ADialogOverlayImplProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/APrimitive';
import { useBodyScrollLock, useForwardExpose } from '~~/shared';

import { injectADialogRootContext } from './ADialogRoot.vue';

defineProps<ADialogOverlayImplProps>();
const rootContext = injectADialogRootContext();

useBodyScrollLock(true);
useForwardExpose();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    style="pointer-events: auto"
  >
    <slot />
  </APrimitive>
</template>
