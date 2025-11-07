<script lang="ts">
import type { AMenuGroupProps } from '../menu';
import { useForwardExpose } from '../shared';

export interface ADropdownMenuGroupProps extends AMenuGroupProps {}
</script>

<script setup lang="ts">
import { AMenuGroup } from '../menu';

const props = defineProps<ADropdownMenuGroupProps>();
useForwardExpose();
</script>

<template>
  <AMenuGroup v-bind="props">
    <slot />
  </AMenuGroup>
</template>
