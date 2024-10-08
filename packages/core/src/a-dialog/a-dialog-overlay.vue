<script lang="ts">
import { useForwardExpose } from '~~/shared';

import ADialogOverlayImpl, { type ADialogOverlayImplProps } from './a-dialog-overlay-impl.vue';

export interface ADialogOverlayProps extends ADialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';

import { injectADialogRootContext } from './a-dialog-root.vue';

defineProps<ADialogOverlayProps>();
const rootContext = injectADialogRootContext();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <APresence
    v-if="rootContext?.modal.value"
    :present="forceMount || rootContext.open.value"
  >
    <ADialogOverlayImpl
      v-bind="$attrs"
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
    >
      <slot />
    </ADialogOverlayImpl>
  </APresence>
</template>
