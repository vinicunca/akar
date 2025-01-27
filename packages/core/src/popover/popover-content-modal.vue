<script setup lang="ts">
import type { PopoverContentImplEmits, PopoverContentImplProps } from './popover-content-impl.vue';
import { ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits, useHideOthers } from '~~/shared';
import { useBodyScrollLock } from '~~/shared/use-body-scroll-lock';
import PopoverContentImpl from './popover-content-impl.vue';
import { injectAPopoverRootContext } from './popover-root.vue';

const props = defineProps<PopoverContentImplProps>();
const emits = defineEmits<PopoverContentImplEmits>();
const rootContext = injectAPopoverRootContext();
const isRightClickOutsideRef = ref(false);

useBodyScrollLock(true);

const forwarded = useForwardPropsEmits(props, emits);

const { forwardRef, currentElement } = useForwardExpose();
useHideOthers(currentElement);
</script>

<template>
  <PopoverContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="rootContext.open.value"
    disable-outside-pointer-events
    @close-auto-focus.prevent="
      (event) => {
        emits('closeAutoFocus', event);

        if (!isRightClickOutsideRef) rootContext.triggerElement.value?.focus();
      }
    "
    @pointer-down-outside="
      (event) => {
        emits('pointerDownOutside', event);

        const originalEvent = event.detail.originalEvent;
        const ctrlLeftClick
          = originalEvent.button === 0 && originalEvent.ctrlKey === true;
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

        isRightClickOutsideRef = isRightClick;
      }
    "
    @focus-outside.prevent
  >
    <slot />
  </PopoverContentImpl>
</template>
