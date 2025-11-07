<script lang="ts">
import type { AMenuItemEmits, AMenuItemProps } from '../menu';

export type ADropdownMenuItemEmits = AMenuItemEmits;

export interface ADropdownMenuItemProps extends AMenuItemProps {}
</script>

<script setup lang="ts">
import { AMenuItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../shared';

const props = defineProps<ADropdownMenuItemProps>();
const emits = defineEmits<ADropdownMenuItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuItem>
</template>
