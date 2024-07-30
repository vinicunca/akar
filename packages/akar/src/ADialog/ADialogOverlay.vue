<script lang="ts">
import ADialogOverlayImpl, { type ADialogOverlayImplProps } from './ADialogOverlayImpl.vue'
import { useForwardExpose } from '@/shared'

export interface ADialogOverlayProps extends ADialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
</script>

<script setup lang="ts">
import { injectADialogRootContext } from './ADialogRoot.vue'
import { Presence } from '@/Presence'

defineProps<ADialogOverlayProps>()
const rootContext = injectADialogRootContext()

const { forwardRef } = useForwardExpose()
</script>

<template>
  <Presence
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
  </Presence>
</template>
