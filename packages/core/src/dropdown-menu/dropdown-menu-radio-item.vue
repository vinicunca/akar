<script lang="ts">
import type {
  AMenuRadioItemEmits,
  AMenuRadioItemProps,
} from '~~/menu';
import { useForwardExpose, useForwardPropsEmits } from '~~/shared';

export type ADropdownMenuRadioItemEmits = AMenuRadioItemEmits;

export interface ADropdownMenuRadioItemProps extends AMenuRadioItemProps {}
</script>

<script setup lang="ts">
import { AMenuRadioItem } from '~~/menu';

const props = defineProps<ADropdownMenuRadioItemProps>();
const emits = defineEmits<ADropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();
</script>

<template>
  <AMenuRadioItem v-bind="forwarded">
    <slot />
  </AMenuRadioItem>
</template>
