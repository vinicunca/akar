<script lang="ts">
import type {
  APopoverContentImplEmits,
  APopoverContentImplProps,
} from './a-popover-content-impl.vue';

export type APopoverContentEmits = APopoverContentImplEmits;

export interface APopoverContentProps extends APopoverContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '~~/shared';

import APopoverContentModal from './a-popover-content-modal.vue';
import APopoverContentNonModal from './a-popover-content-non-modal.vue';
import { injectAPopoverRootContext } from './a-popover-root.vue';

const props = defineProps<APopoverContentProps>();
const emits = defineEmits<APopoverContentEmits>();

const rootContext = injectAPopoverRootContext();

const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

rootContext.contentId ||= useId(undefined, 'akar-popover-content');
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <APopoverContentModal
      v-if="rootContext.modal.value"
      v-bind="forwarded"
      :ref="forwardRef"
    >
      <slot />
    </APopoverContentModal>
    <APopoverContentNonModal
      v-else
      v-bind="forwarded"
      :ref="forwardRef"
    >
      <slot />
    </APopoverContentNonModal>
  </APresence>
</template>
