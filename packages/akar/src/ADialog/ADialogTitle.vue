<script lang="ts">
import type { PrimitiveProps } from '@/Primitive'
import { useForwardExpose } from '@/shared'

export interface ADialogTitleProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { injectADialogRootContext } from './ADialogRoot.vue'
import { Primitive } from '@/Primitive'

const props = withDefaults(defineProps<ADialogTitleProps>(), { as: 'h2' })
const rootContext = injectADialogRootContext()
useForwardExpose()
</script>

<template>
  <Primitive
    v-bind="props"
    :id="rootContext.titleId"
  >
    <slot />
  </Primitive>
</template>
