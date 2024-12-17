<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface DialogOverlayImplProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { useBodyScrollLock } from '~~/shared/use-body-scroll-lock';
import { injectDialogRootContext } from './dialog-root.vue';

defineProps<DialogOverlayImplProps>();
const rootContext = injectDialogRootContext();

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
