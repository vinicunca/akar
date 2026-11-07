<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '@/Menu';
import { useForwardExpose } from '@/shared';

export type DropdownMenuSubContentEmits = MenuSubContentEmits;

export interface DropdownMenuSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { MenuSubContent } from '@/Menu';
import { useForwardPropsEmits } from '..';

const props = defineProps<DropdownMenuSubContentProps>();
const emits = defineEmits<DropdownMenuSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
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
  >
    <slot />
  </MenuSubContent>
</template>
