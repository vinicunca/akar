<script setup lang="ts">
import { ref } from 'vue';

import type { FocusOutsideEvent, PointerDownOutsideEvent } from '~~/a-dismissable-layer';

import { useEmitAsProps, useForwardExpose } from '~~/shared';

import ADialogContentImpl, { type ADialogContentImplEmits, type ADialogContentImplProps } from './a-dialog-content-impl.vue';
import { injectADialogRootContext } from './a-dialog-root.vue';

const props = defineProps<ADialogContentImplProps>();
const emits = defineEmits<ADialogContentImplEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();

const rootContext = injectADialogRootContext();
const hasInteractedOutsideRef = ref(false);
const hasPointerDownOutsideRef = ref(false);

function handleCloseAutoFocus(event: Event) {
  if (!event.defaultPrevented) {
    if (!hasInteractedOutsideRef.value) {
      rootContext.triggerElement.value?.focus();
    }

    // Always prevent auto focus because we either focus manually or want user agent focus
    event.preventDefault();
  }

  hasInteractedOutsideRef.value = false;
  hasPointerDownOutsideRef.value = false;
}

function handleInteractOutside(event: FocusOutsideEvent | PointerDownOutsideEvent) {
  if (!event.defaultPrevented) {
    hasInteractedOutsideRef.value = true;
    if (event.detail.originalEvent.type === 'pointerdown') {
      hasPointerDownOutsideRef.value = true;
    }
  }

  /**
   * Prevent dismissing when clicking the trigger.
   * As the trigger is already setup to close, without doing so would
   * cause it to close and immediately open.
   */
  const target = event.target as HTMLElement;
  const targetIsTrigger = rootContext.triggerElement.value?.contains(target);
  if (targetIsTrigger) {
    event.preventDefault();
  }

  /**
   * On Safari if the trigger is inside a container with tabIndex={0}, when clicked
   * we will get the pointer down outside event on the trigger, but then a subsequent
   * focus outside event on the container, we ignore any focus outside event when we've
   * already had a pointer down outside event.
   */
  if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef) {
    event.preventDefault();
  }
}
</script>

<template>
  <ADialogContentImpl
    v-bind="{ ...props, ...emitsAsProps }"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    @close-auto-focus="handleCloseAutoFocus"
    @interact-outside="handleInteractOutside"
  >
    <slot />
  </ADialogContentImpl>
</template>
