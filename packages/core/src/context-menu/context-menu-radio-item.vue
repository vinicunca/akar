<script lang="ts">
import type {
  AMenuItemEmits,
  AMenuRadioItemProps,
} from '~~/menu';

export type AContextMenuRadioItemEmits = AMenuItemEmits;

export interface AContextMenuRadioItemProps extends AMenuRadioItemProps {}
</script>

<script setup lang="ts">
import { AMenuRadioItem } from '~~/menu';
import { useEmitAsProps, useForwardExpose } from '~~/shared';

const props = defineProps<AContextMenuRadioItemProps>();
const emits = defineEmits<AContextMenuRadioItemEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <AMenuRadioItem v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </AMenuRadioItem>
</template>
