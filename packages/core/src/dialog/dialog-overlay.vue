<script lang="ts">
import type { DialogOverlayImplProps } from './dialog-overlay-impl.vue';
import { useForwardExpose } from '~~/shared';
import DialogOverlayImpl from './dialog-overlay-impl.vue';

export interface ADialogOverlayProps extends DialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/presence';
import { injectDialogRootContext } from './dialog-root.vue';

defineProps<ADialogOverlayProps>();
const rootContext = injectDialogRootContext();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <APresence
    v-if="rootContext?.modal.value"
    :present="forceMount || rootContext.open.value"
  >
    <DialogOverlayImpl
      v-bind="$attrs"
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
    >
      <slot />
    </DialogOverlayImpl>
  </APresence>
</template>
