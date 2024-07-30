<script lang="ts">
import type { PrimitiveProps } from '@/Primitive'

export interface ADialogOverlayImplProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { injectADialogRootContext } from './ADialogRoot.vue'
import { Primitive } from '@/Primitive'
import { useBodyScrollLock, useForwardExpose } from '@/shared'

defineProps<ADialogOverlayImplProps>()
const rootContext = injectADialogRootContext()

useBodyScrollLock(true)
useForwardExpose()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    style="pointer-events: auto"
  >
    <slot />
  </Primitive>
</template>
