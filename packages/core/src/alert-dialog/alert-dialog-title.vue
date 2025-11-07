<script lang="ts">
import type { ADialogTitleProps } from '../dialog';

export interface AAlertDialogTitleProps extends ADialogTitleProps {}
</script>

<script setup lang="ts">
import { ADialogTitle } from '../dialog';
import { useForwardExpose } from '../shared';

const props = withDefaults(
  defineProps<AAlertDialogTitleProps>(),
  { as: 'h2' },
);

useForwardExpose();
</script>

<template>
  <ADialogTitle v-bind="props">
    <slot />
  </ADialogTitle>
</template>
