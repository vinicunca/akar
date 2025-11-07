<script lang="ts">
import type { ADialogTriggerProps } from '../dialog';
import { useForwardExpose } from '../shared';

export interface AAlertDialogTriggerProps extends ADialogTriggerProps {}
</script>

<script setup lang="ts">
import { ADialogTrigger } from '../dialog';

const props = withDefaults(
  defineProps<AAlertDialogTriggerProps>(),
  { as: 'button' },
);

useForwardExpose();
</script>

<template>
  <ADialogTrigger v-bind="props">
    <slot />
  </ADialogTrigger>
</template>
