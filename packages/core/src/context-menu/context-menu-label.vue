<script lang="ts">
import type { AMenuLabelProps } from '../menu';

export interface AContextMenuLabelProps extends AMenuLabelProps {}
</script>

<script setup lang="ts">
import { AMenuLabel } from '../menu';
import { useForwardExpose } from '../shared';

defineOptions({ name: 'AContextMenuLabel' });

const props = defineProps<AContextMenuLabelProps>();
useForwardExpose();
</script>

<template>
  <AMenuLabel v-bind="props">
    <slot />
  </AMenuLabel>
</template>
