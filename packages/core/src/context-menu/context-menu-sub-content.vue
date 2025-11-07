<script lang="ts">
import type {
  AMenuSubContentEmits,
  AMenuSubContentProps,
} from '../menu';

export type AContextMenuSubContentEmits = AMenuSubContentEmits;
export interface AContextMenuSubContentProps extends AMenuSubContentProps {}
</script>

<script setup lang="ts">
import { AMenuSubContent } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../shared';

const props = defineProps<AContextMenuSubContentProps>();

const emits = defineEmits<AContextMenuSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();
</script>

<template>
  <AMenuSubContent
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
  </AMenuSubContent>
</template>
