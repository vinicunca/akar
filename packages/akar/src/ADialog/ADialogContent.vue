<script lang="ts">
import type {
  ADialogContentImplEmits,
  ADialogContentImplProps,
} from './ADialogContentImpl.vue'

export type ADialogContentEmits = ADialogContentImplEmits

export interface ADialogContentProps extends ADialogContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
</script>

<script setup lang="ts">
import ADialogContentModal from './ADialogContentModal.vue'
import ADialogContentNonModal from './ADialogContentNonModal.vue'
import { injectADialogRootContext } from './ADialogRoot.vue'
import { Presence } from '@/Presence'
import { useEmitAsProps, useForwardExpose } from '@/shared'

const props = defineProps<ADialogContentProps>()
const emits = defineEmits<ADialogContentEmits>()

const rootContext = injectADialogRootContext()

const emitsAsProps = useEmitAsProps(emits)
const { forwardRef } = useForwardExpose()
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <ADialogContentModal
      v-if="rootContext.modal.value"
      :ref="forwardRef"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </ADialogContentModal>
    <ADialogContentNonModal
      v-else
      :ref="forwardRef"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </ADialogContentNonModal>
  </Presence>
</template>
