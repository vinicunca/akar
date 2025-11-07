<script lang="ts">
import type {
  AMenuCheckboxItemEmits,
  AMenuCheckboxItemProps,
} from '../menu';

export type AContextMenuCheckboxItemEmits = AMenuCheckboxItemEmits;

export interface AContextMenuCheckboxItemProps extends AMenuCheckboxItemProps {}
</script>

<script setup lang="ts">
import { AMenuCheckboxItem } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../shared';

const props = defineProps<AContextMenuCheckboxItemProps>();
const emits = defineEmits<AContextMenuCheckboxItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuCheckboxItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuCheckboxItem>
</template>
