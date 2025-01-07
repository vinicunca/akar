<script lang="ts">
import type { AMenuItemIndicatorProps } from '~~/menu';

export interface AContextMenuItemIndicatorProps extends AMenuItemIndicatorProps {}
</script>

<script setup lang="ts">
import { AMenuItemIndicator } from '~~/menu';
import { useForwardExpose } from '~~/shared';

const props = defineProps<AContextMenuItemIndicatorProps>();

useForwardExpose();
</script>

<template>
  <AMenuItemIndicator v-bind="props">
    <slot />
  </AMenuItemIndicator>
</template>
