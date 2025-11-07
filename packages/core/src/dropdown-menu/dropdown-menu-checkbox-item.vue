<script lang="ts">
import type {
  AMenuCheckboxItemEmits,
  AMenuCheckboxItemProps,
} from '../menu';

export type ADropdownMenuCheckboxItemEmits = AMenuCheckboxItemEmits;

export interface ADropdownMenuCheckboxItemProps extends AMenuCheckboxItemProps {}
</script>

<script setup lang="ts">
import { AMenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../shared';

const props = defineProps<ADropdownMenuCheckboxItemProps>();
const emits = defineEmits<ADropdownMenuCheckboxItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuCheckboxItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuCheckboxItem>
</template>
