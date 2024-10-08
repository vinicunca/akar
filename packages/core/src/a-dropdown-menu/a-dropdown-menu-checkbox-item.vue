<script lang="ts">
import type {
  AMenuACheckboxItemEmits,
  AMenuACheckboxItemProps,
} from '~~/a-menu';

export type ADropdownMenuACheckboxItemEmits = AMenuACheckboxItemEmits;

export interface ADropdownMenuACheckboxItemProps extends AMenuACheckboxItemProps {}
</script>

<script setup lang="ts">
import { AMenuACheckboxItem } from '~~/a-menu';
import { useEmitAsProps, useForwardExpose } from '~~/shared';

const props = defineProps<ADropdownMenuACheckboxItemProps>();
const emits = defineEmits<ADropdownMenuACheckboxItemEmits>();

const emitsAsProps = useEmitAsProps(emits);

useForwardExpose();
</script>

<template>
  <AMenuACheckboxItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuACheckboxItem>
</template>
