<script lang="ts">
import type {
  DialogContentImplEmits,
  DialogContentImplProps,
} from './dialog-content-impl.vue';

export type ADialogContentEmits = DialogContentImplEmits;

export interface ADialogContentProps extends DialogContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/presence';
import { useEmitAsProps, useForwardExpose } from '~~/shared';
import DialogContentModal from './dialog-content-modal.vue';
import DialogContentNonModal from './dialog-content-non-modal.vue';
import { injectDialogRootContext } from './dialog-root.vue';

const props = defineProps<ADialogContentProps>();
const emits = defineEmits<ADialogContentEmits>();

const rootContext = injectDialogRootContext();

const emitsAsProps = useEmitAsProps(emits);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <DialogContentModal
      v-if="rootContext.modal.value"
      :ref="forwardRef"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </DialogContentModal>
    <DialogContentNonModal
      v-else
      :ref="forwardRef"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </DialogContentNonModal>
  </APresence>
</template>
