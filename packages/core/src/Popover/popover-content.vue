<script lang="ts">
import type {
  PopoverContentImplEmits,
  PopoverContentImplProps,
} from './popover-content-impl.vue';

export type APopoverContentEmits = PopoverContentImplEmits;

export interface APopoverContentProps extends PopoverContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '~~/shared';
import PopoverContentModal from './popover-content-modal.vue';
import PopoverContentNonModal from './popover-content-non-modal.vue';
import { injectAPopoverRootContext } from './popover-root.vue';

const props = defineProps<APopoverContentProps>();
const emits = defineEmits<APopoverContentEmits>();

const rootContext = injectAPopoverRootContext();

const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

rootContext.contentId ||= useId(undefined, 'akar-popover-content');
</script>

<template>
  <APresence :present="forceMount || rootContext.open.value">
    <PopoverContentModal
      v-if="rootContext.modal.value"
      v-bind="forwarded"
      :ref="forwardRef"
    >
      <slot />
    </PopoverContentModal>
    <PopoverContentNonModal
      v-else
      v-bind="forwarded"
      :ref="forwardRef"
    >
      <slot />
    </PopoverContentNonModal>
  </APresence>
</template>
