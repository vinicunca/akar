<script lang="ts">
import type { AMenuSeparatorProps } from '../menu';
import { useForwardExpose } from '../shared';

export interface ADropdownMenuSeparatorProps extends AMenuSeparatorProps {}
</script>

<script setup lang="ts">
import { AMenuSeparator } from '../menu';

defineOptions({ name: 'ADropdownMenuSeparator' });

const props = defineProps<ADropdownMenuSeparatorProps>();
useForwardExpose();
</script>

<template>
  <AMenuSeparator v-bind="props">
    <slot />
  </AMenuSeparator>
</template>
