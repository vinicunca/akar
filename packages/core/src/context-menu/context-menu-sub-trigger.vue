<script lang="ts">
import type { AMenuSubTriggerProps } from '../menu';

export interface AContextMenuSubTriggerProps extends AMenuSubTriggerProps {}
</script>

<script setup lang="ts">
import { AMenuSubTrigger } from '../menu';
import { useForwardExpose } from '../shared';

const props = defineProps<AContextMenuSubTriggerProps>();
useForwardExpose();
</script>

<template>
  <AMenuSubTrigger v-bind="props">
    <slot />
  </AMenuSubTrigger>
</template>
