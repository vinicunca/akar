<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '@/Menu';
import { useCollection } from '@/Collection';

export type MenubarSubContentEmits = MenuSubContentEmits;

export interface MenubarSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { MenuSubContent } from '@/Menu';
import { useForwardElement, useForwardPropsEmits } from '@/shared';
import { injectMenubarMenuContext } from './MenubarMenu.vue';
import { injectMenubarRootContext } from './MenubarRoot.vue';
import { createMenubarSubContentKeydown } from './useMenubar';

const props = defineProps<MenubarSubContentProps>();
const emits = defineEmits<MenubarSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef, expose } = useForwardElement();
defineExpose(expose);

const { getItems } = useCollection({ key: 'Menubar' });

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

// ArrowRight from a plain item switches to the next menu of the bar.
const handleArrowNavigation = createMenubarSubContentKeydown(rootContext, menuContext, { getItems });
</script>

<template>
  <MenuSubContent
    :ref="forwardRef"
    v-bind="forwarded"
    data-akar-menubar-content=""
    :style="{
      '--akar-menubar-content-transform-origin':
        'var(--akar-popper-transform-origin)',
      '--akar-menubar-content-available-width':
        'var(--akar-popper-available-width)',
      '--akar-menubar-content-available-height':
        'var(--akar-popper-available-height)',
      '--akar-menubar-trigger-width': 'var(--akar-popper-anchor-width)',
      '--akar-menubar-trigger-height': 'var(--akar-popper-anchor-height)',
    }"
    @keydown="handleArrowNavigation"
  >
    <slot />
  </MenuSubContent>
</template>
