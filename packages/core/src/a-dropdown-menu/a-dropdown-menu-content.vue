<script lang="ts">
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '~~/a-dismissable-layer';
import type {
  AMenuContentEmits,
  AMenuContentProps,
} from '~~/a-menu';

export type ADropdownMenuContentEmits = AMenuContentEmits;

export interface ADropdownMenuContentProps extends AMenuContentProps {}
</script>

<script setup lang="ts">
import { ref } from 'vue';

import { AMenuContent } from '~~/a-menu';
import { useForwardExpose, useForwardPropsEmits, useId } from '~~/shared';

import { injectADropdownMenuRootContext } from './a-dropdown-menu-root.vue';

const props = defineProps<ADropdownMenuContentProps>();
const emits = defineEmits<ADropdownMenuContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();

const rootContext = injectADropdownMenuRootContext();

const hasInteractedOutsideRef = ref(false);

function handleCloseAutoFocus(event: Event) {
  if (event.defaultPrevented) {
    return;
  }

  if (!hasInteractedOutsideRef.value) {
    setTimeout(() => {
      rootContext.triggerElement.value?.focus();
    }, 0);
  }

  hasInteractedOutsideRef.value = false;

  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault();
}

rootContext.contentId ||= useId(undefined, 'akar-dropdown-menu-content');

function handleInteractOutside(event: FocusOutsideEvent | PointerDownOutsideEvent) {
  if (event.defaultPrevented) {
    return;
  }

  const originalEvent = event.detail.originalEvent as PointerEvent;
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  if (!rootContext.modal.value || isRightClick) {
    hasInteractedOutsideRef.value = true;
  }

  if (rootContext.triggerElement.value?.contains(event.target as HTMLElement)) {
    event.preventDefault();
  }
}
</script>

<template>
  <AMenuContent
    v-bind="forwarded"
    :id="rootContext.contentId"
    :aria-labelledby="rootContext?.triggerId"
    :style="{
      '--akar-dropdown-menu-content-transform-origin':
        'var(--akar-popper-transform-origin)',
      '--akar-dropdown-menu-content-available-width':
        'var(--akar-popper-available-width)',
      '--akar-dropdown-menu-content-available-height':
        'var(--akar-popper-available-height)',
      '--akar-dropdown-menu-trigger-width': 'var(--akar-popper-anchor-width)',
      '--akar-dropdown-menu-trigger-height':
        'var(--akar-popper-anchor-height)',
    }"
    @close-auto-focus="handleCloseAutoFocus"
    @interact-outside="handleInteractOutside"
  >
    <slot />
  </AMenuContent>
</template>
