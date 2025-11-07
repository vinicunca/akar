<script lang="ts">
import type {
  AMenuItemEmits,
  AMenuItemProps,
} from '../menu';

export type AContextMenuItemEmits = AMenuItemEmits;

export interface AContextMenuItemProps extends AMenuItemProps {}
</script>

<script setup lang="ts">
import { AMenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../shared';

const props = defineProps<AMenuItemProps>();
const emits = defineEmits<AMenuItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuItem>
</template>
