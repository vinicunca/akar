<script lang="ts">
import type { AMenuSubTriggerProps } from '~~/menu';
import { useForwardExpose } from '~~/shared';

export interface ADropdownMenuSubTriggerProps extends AMenuSubTriggerProps {}
</script>

<script setup lang="ts">
import { AMenuSubTrigger } from '~~/menu';

const props = defineProps<ADropdownMenuSubTriggerProps>();
useForwardExpose();
</script>

<template>
  <AMenuSubTrigger v-bind="props">
    <slot />
  </AMenuSubTrigger>
</template>
