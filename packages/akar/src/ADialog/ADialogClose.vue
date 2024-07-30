<script lang="ts">
import type { PrimitiveProps } from '@/Primitive'

export interface ADialogCloseProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { injectADialogRootContext } from './ADialogRoot.vue'
import { useForwardExpose } from '@/shared'
import { Primitive } from '@/Primitive'

const props = withDefaults(defineProps<ADialogCloseProps>(), {
  as: 'button',
})

useForwardExpose()
const rootContext = injectADialogRootContext()
</script>

<template>
  <Primitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    @click="rootContext.onOpenChange(false)"
  >
    <slot />
  </Primitive>
</template>
