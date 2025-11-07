<script lang="ts">
import type { ADialogCloseProps } from '../dialog';

export interface AAlertDialogActionProps extends ADialogCloseProps {}
</script>

<script setup lang="ts">
import { ADialogClose } from '../dialog';
import { useForwardExpose } from '../shared';

const props = withDefaults(
  defineProps<AAlertDialogActionProps>(),
  { as: 'button' },
);

useForwardExpose();
</script>

<template>
  <ADialogClose v-bind="props">
    <slot />
  </ADialogClose>
</template>
