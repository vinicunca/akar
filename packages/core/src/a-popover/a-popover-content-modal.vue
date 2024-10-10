<script setup lang="ts">
import { ref } from 'vue';

import type { PointerDownOutsideEvent } from '~~/a-dismissable-layer';

import { useBodyScrollLock, useForwardExpose, useForwardPropsEmits, useHideOthers } from '~~/shared';

import APopoverContentImpl, {
  type APopoverContentImplEmits,
  type APopoverContentImplProps,
} from './a-popover-content-impl.vue';
import { injectAPopoverRootContext } from './a-popover-root.vue';

const props = defineProps<APopoverContentImplProps>();
const emits = defineEmits<APopoverContentImplEmits>();
const rootContext = injectAPopoverRootContext();
const isRightClickOutsideRef = ref(false);

useBodyScrollLock(true);

const forwarded = useForwardPropsEmits(props, emits);

const { forwardRef, currentElement } = useForwardExpose();

useHideOthers(currentElement);

function handleCloseAutoFocus(event: Event) {
  emits('closeAutoFocus', event);

  if (!isRightClickOutsideRef.value) {
    rootContext.triggerElement.value?.focus();
  }
}

function handlePointerDownOutside(event: PointerDownOutsideEvent) {
  emits('pointerDownOutside', event);

  const originalEvent = event.detail.originalEvent;
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  isRightClickOutsideRef.value = isRightClick;
}
</script>

<template>
  <APopoverContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="rootContext.open.value"
    disable-outside-pointer-events
    @close-auto-focus.prevent="handleCloseAutoFocus"
    @pointer-down-outside="handlePointerDownOutside"
    @focus-outside.prevent
  >
    <slot />
  </APopoverContentImpl>
</template>
