<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '@/Menu';

export type ContextMenuSubContentEmits = MenuSubContentEmits;
export interface ContextMenuSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { MenuSubContent } from '@/Menu';
import { useForwardElement, useForwardPropsEmits } from '@/shared';

const props = defineProps<ContextMenuSubContentProps>();

const emits = defineEmits<ContextMenuSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef, expose } = useForwardElement();
defineExpose(expose);
</script>

<template>
  <MenuSubContent
    :ref="forwardRef"
    v-bind="forwarded"
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
  >
    <slot />
  </MenuSubContent>
</template>
