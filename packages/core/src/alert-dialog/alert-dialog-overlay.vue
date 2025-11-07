<script lang="ts">
import type { ADialogOverlayProps } from '../dialog';

export interface AAlertDialogOverlayProps extends ADialogOverlayProps {}
</script>

<script setup lang="ts">
import { ADialogOverlay } from '../dialog';
import { useForwardExpose } from '../shared';

const props = defineProps<AAlertDialogOverlayProps>();

useForwardExpose();
</script>

<template>
  <ADialogOverlay v-bind="props">
    <slot />
  </ADialogOverlay>
</template>
