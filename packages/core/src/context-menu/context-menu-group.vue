<script lang="ts">
import type { AMenuGroupProps } from '../menu';

export interface AContextMenuGroupProps extends AMenuGroupProps {}
</script>

<script setup lang="ts">
import { AMenuGroup } from '../menu';
import { useForwardExpose } from '../shared';

const props = defineProps<AContextMenuGroupProps>();
useForwardExpose();
</script>

<template>
  <AMenuGroup v-bind="props">
    <slot />
  </AMenuGroup>
</template>
