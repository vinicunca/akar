<script setup lang="ts">
import { useEmitAsProps, useForwardExpose, useHideOthers } from '~~/shared';

import ADialogContentImpl, { type ADialogContentImplEmits, type ADialogContentImplProps } from './ADialogContentImpl.vue';
import { injectADialogRootContext } from './ADialogRoot.vue';

const props = defineProps<ADialogContentImplProps>();
const emits = defineEmits<ADialogContentImplEmits>();

const rootContext = injectADialogRootContext();

const emitsAsProps = useEmitAsProps(emits);

const { currentElement, forwardRef } = useForwardExpose();
useHideOthers(currentElement);
</script>

<template>
  <ADialogContentImpl
    v-bind="{ ...props, ...emitsAsProps }"
    :ref="forwardRef"
    :trap-focus="rootContext.open.value"
    :disable-outside-pointer-events="true"
    @close-auto-focus="
      (event) => {
        if (!event.defaultPrevented) {
          event.preventDefault();
          rootContext.triggerElement.value?.focus();
        }
      }
    "
    @pointer-down-outside="
      (event) => {
        const originalEvent = event.detail.originalEvent;
        const ctrlLeftClick
          = originalEvent.button === 0 && originalEvent.ctrlKey === true;
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

        // If the event is a right-click, we shouldn't close because
        // it is effectively as if we right-clicked the `Overlay`.
        if (isRightClick) event.preventDefault();
      }
    "
    @focus-outside="
      (event) => {
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
        event.preventDefault();
      }
    "
  >
    <slot />
  </ADialogContentImpl>
</template>
