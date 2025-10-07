<script lang="ts">
import type {
  ADialogRootEmits,
  ADialogRootProps,
} from '~~/dialog';

export type AAlertDialogEmits = ADialogRootEmits;
export interface AAlertDialogProps extends Omit<ADialogRootProps, 'modal'> {}
</script>

<script setup lang="ts">
import { ADialogRoot } from '~~/dialog';
import { useForwardExpose, useForwardPropsEmits } from '~~/shared';

const props = defineProps<AAlertDialogProps>();
const emits = defineEmits<AAlertDialogEmits>();

const forwarded = useForwardPropsEmits(props, emits);

useForwardExpose();
</script>

<template>
  <ADialogRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :modal="true"
  >
    <slot v-bind="slotProps" />
  </ADialogRoot>
</template>
