<script lang="ts">
import type { AMenuSeparatorProps } from '../menu';

export interface AContextMenuSeparatorProps extends AMenuSeparatorProps {}
</script>

<script setup lang="ts">
import { AMenuSeparator } from '../menu';
import { useForwardExpose } from '../shared';

const props = defineProps<AContextMenuSeparatorProps>();
useForwardExpose();
</script>

<template>
  <AMenuSeparator v-bind="props">
    <slot />
  </AMenuSeparator>
</template>
