<script lang="ts">
import type {
  AMenuSubContentEmits,
  AMenuSubContentProps,
} from '~~/a-menu';

export type ADropdownMenuSubContentEmits = AMenuSubContentEmits;

export interface ADropdownMenuSubContentProps extends AMenuSubContentProps {}
</script>

<script setup lang="ts">
import { AMenuSubContent } from '~~/a-menu';
import { useForwardExpose, useForwardPropsEmits } from '~~/shared';

const props = defineProps<ADropdownMenuSubContentProps>();
const emits = defineEmits<ADropdownMenuSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);

useForwardExpose();
</script>

<template>
  <AMenuSubContent
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
  </AMenuSubContent>
</template>
