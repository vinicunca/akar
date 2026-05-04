<script lang="ts">
import type {
  MenuContentEmits,
  MenuContentProps,
} from '@/Menu';
import { useForwardExpose, useForwardPropsEmits } from '@/shared';

export type ContextMenuContentEmits = MenuContentEmits;

export interface ContextMenuContentProps
  extends Omit<
    MenuContentProps,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'arrowPadding'
    | 'updatePositionStrategy'
  > {}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { MenuContent } from '@/Menu';
import { injectContextMenuRootContext } from './ContextMenuRoot.vue';

const props = withDefaults(defineProps<ContextMenuContentProps>(), {
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false,
});
const emits = defineEmits<ContextMenuContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);

useForwardExpose();
const rootContext = injectContextMenuRootContext();
const hasInteractedOutside = ref(false);
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    side="right"
    :side-offset="2"
    align="start"
    update-position-strategy="always"
    :style="{
      '--akar-context-menu-content-transform-origin':
        'var(--akar-popper-transform-origin)',
      '--akar-context-menu-content-available-width':
        'var(--akar-popper-available-width)',
      '--akar-context-menu-content-available-height':
        'var(--akar-popper-available-height)',
      '--akar-context-menu-trigger-width': 'var(--akar-popper-anchor-width)',
      '--akar-context-menu-trigger-height':
        'var(--akar-popper-anchor-height)',
    }"
    @close-auto-focus="
      (event) => {
        if (!event.defaultPrevented && hasInteractedOutside) {
          event.preventDefault();
        }
        hasInteractedOutside = false;
      }
    "
    @interact-outside="
      (event) => {
        const originalEvent = event.detail.originalEvent as PointerEvent
        // Prevent closing when right click (button=2) with the trigger element
        if (originalEvent.button === 2 && event.target === rootContext.triggerElement.value) {
          event.preventDefault()
        }
        if (!event.defaultPrevented && !rootContext.modal.value)
          hasInteractedOutside = true;
      }
    "
  >
    <slot />
  </MenuContent>
</template>
