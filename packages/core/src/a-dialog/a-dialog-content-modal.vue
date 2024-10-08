<script setup lang="ts">
import type { PointerDownOutsideEvent } from '~~/a-dismissable-layer';

import { useEmitAsProps, useForwardExpose, useHideOthers } from '~~/shared';

import ADialogContentImpl, { type ADialogContentImplEmits, type ADialogContentImplProps } from './a-dialog-content-impl.vue';
import { injectADialogRootContext } from './a-dialog-root.vue';

const props = defineProps<ADialogContentImplProps>();
const emits = defineEmits<ADialogContentImplEmits>();

const rootContext = injectADialogRootContext();

const emitsAsProps = useEmitAsProps(emits);

const { forwardRef, currentElement } = useForwardExpose();

useHideOthers(currentElement);

function handleCloseAutoFocus(event: Event) {
  if (!event.defaultPrevented) {
    event.preventDefault();
    rootContext.triggerElement.value?.focus();
  }
}

function handlePointerDownOutside(event: PointerDownOutsideEvent) {
  const originalEvent = event.detail.originalEvent;
  const ctrlLeftClick = originalEvent.button === 0
    && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  /**
   * If the event is a right-click, we shouldn't close because
   * it is effectively as if we right-clicked the `Overlay`.
   */
  if (isRightClick) {
    event.preventDefault();
  }
}

function handleFocusOutside(event: Event) {
  /**
   * When focus is trapped, a `focusout` event may still happen.
   * We make sure we don't trigger our `onDismiss` in such case.
   */
  event.preventDefault();
}
</script>

<template>
  <ADialogContentImpl
    v-bind="{ ...props, ...emitsAsProps }"
    :ref="forwardRef"
    :trap-focus="rootContext.open.value"
    :disable-outside-pointer-events="true"
    @close-auto-focus="handleCloseAutoFocus"
    @pointer-down-outside="handlePointerDownOutside"
    @focus-outside="handleFocusOutside"
  >
    <slot />
  </ADialogContentImpl>
</template>
