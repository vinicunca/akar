<script lang="ts">
import type {
  MenuContentEmits,
  MenuContentProps,
} from '@/Menu';

export type DropdownMenuContentEmits = Omit<MenuContentEmits, 'entryFocus'>;

export interface DropdownMenuContentProps extends MenuContentProps {}
</script>

<script setup lang="ts">
import { MenuContent } from '@/Menu';
import { provideMenuBackdropCutoutContext } from '@/Menu/MenuContentImpl.vue';
import { omitEntryFocusListener } from '@/Menu/utils';
import { useForwardElement, useForwardPropsEmits } from '@/shared';
import { injectDropdownMenuRootContext } from './DropdownMenuRoot.vue';
import { createDropdownMenuContentSurface } from './useDropdownMenu';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<DropdownMenuContentProps>();
const emits = defineEmits<DropdownMenuContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef, expose } = useForwardElement();
defineExpose(expose);

const rootContext = injectDropdownMenuRootContext();
// The trigger stays interactive through a modal menu's backdrop (Base UI).
provideMenuBackdropCutoutContext(rootContext.triggerElement);

// `id`/`aria-labelledby` and the focus-restore / outside-interaction handlers
// come from the composable. The surface's attrs (ids only, no handlers) spread
// BEFORE the forwarded props and `$attrs`, so a consumer `id` still wins; its
// handlers bind AFTER the forwarded emits, so they still see a consumer's
// `preventDefault()`.
const content = createDropdownMenuContentSurface(rootContext);
</script>

<template>
  <MenuContent
    :ref="forwardRef"
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
    v-bind="{ ...content.attrs.value, ...forwarded, ...omitEntryFocusListener($attrs) }"
    @close-auto-focus="content.onCloseAutoFocus"
    @interact-outside="content.onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
