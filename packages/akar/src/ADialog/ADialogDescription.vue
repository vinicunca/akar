<script lang="ts">
import type { PrimitiveProps } from '@/Primitive'
import { useForwardExpose } from '@/shared'

export interface ADialogDescriptionProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { injectADialogRootContext } from './ADialogRoot.vue'
import { Primitive } from '@/Primitive'

const props = withDefaults(defineProps<ADialogDescriptionProps>(), { as: 'p' })

useForwardExpose()
const rootContext = injectADialogRootContext()
</script>

<template>
  <Primitive
    v-bind="props"
    :id="rootContext.descriptionId"
  >
    <slot />
  </Primitive>
</template>
