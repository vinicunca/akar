<script lang="ts">
import type { AMenuSubTriggerProps } from '~~/a-menu';

export interface ADropdownMenuSubTriggerProps extends AMenuSubTriggerProps {}
</script>

<script setup lang="ts">
import { AMenuSubTrigger } from '~~/a-menu';
import { useForwardExpose } from '~~/shared';

const props = defineProps<ADropdownMenuSubTriggerProps>();

useForwardExpose();
</script>

<template>
  <AMenuSubTrigger v-bind="props">
    <slot />
  </AMenuSubTrigger>
</template>
