<script lang="ts">
import type {
  MenuContentEmits,
  MenuContentProps,
} from '@/Menu';
import { useForwardElement, useForwardPropsEmits } from '@/shared';

export type ContextMenuContentEmits = Omit<MenuContentEmits, 'entryFocus'>;

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
import { MenuContent } from '@/Menu';
import { provideMenuBackdropCutoutContext } from '@/Menu/MenuContentImpl.vue';
import { omitEntryFocusListener } from '@/Menu/utils';
import { injectContextMenuRootContext } from './ContextMenuRoot.vue';
import { createContextMenuContentHandlers } from './useContextMenu';

defineOptions({
  inheritAttrs: false,
});

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

const { forwardRef, expose } = useForwardElement();
defineExpose(expose);
const rootContext = injectContextMenuRootContext();
// A right-click inside the trigger area re-opens a modal menu at the new point,
// so the area stays interactive through the menu's backdrop.
provideMenuBackdropCutoutContext(rootContext.triggerElement);
// Bound after the forwarded emits, so they still see a consumer's `preventDefault()`.
const { onCloseAutoFocus, onInteractOutside } = createContextMenuContentHandlers(rootContext);
</script>

<template>
  <MenuContent
    :ref="forwardRef"
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
    v-bind="{ ...forwarded, ...omitEntryFocusListener($attrs) }"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
