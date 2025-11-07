<script lang="ts">
import type { ADialogDescriptionProps } from '../dialog';

export interface AAlertDialogDescriptionProps extends ADialogDescriptionProps {}
</script>

<script setup lang="ts">
import { ADialogDescription } from '../dialog';
import { useForwardExpose } from '../shared';

const props = withDefaults(
  defineProps<AAlertDialogDescriptionProps>(),
  { as: 'p' },
);

useForwardExpose();
</script>

<template>
  <ADialogDescription v-bind="props">
    <slot />
  </ADialogDescription>
</template>
