<script lang="ts">
import type { AMenuLabelProps } from '~~/menu';
import { useForwardExpose } from '~~/shared';

export interface ADropdownMenuLabelProps extends AMenuLabelProps {}
</script>

<script setup lang="ts">
import { AMenuLabel } from '~~/menu';

const props = defineProps<ADropdownMenuLabelProps>();
useForwardExpose();
</script>

<template>
  <AMenuLabel v-bind="props">
    <slot />
  </AMenuLabel>
</template>
