<script lang="ts">
import type {
  ADialogContentImplEmits,
  ADialogContentImplProps,
} from './a-dialog-content-impl.vue';

export type ADialogContentEmits = ADialogContentImplEmits;

export interface ADialogContentProps extends ADialogContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';
import { useEmitAsProps, useForwardExpose } from '~~/shared';

import ADialogContentModal from './a-dialog-content-modal.vue';
import ADialogContentNonModal from './a-dialog-content-non-modal.vue';
import { injectADialogRootContext } from './a-dialog-root.vue';

const props = defineProps<ADialogContentProps>();
const emits = defineEmits<ADialogContentEmits>();

const rootContext = injectADialogRootContext();

const emitsAsProps = useEmitAsProps(emits);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
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
  </APresence>
</template>
