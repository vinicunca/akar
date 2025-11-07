<script lang="ts">
import type { AMenuArrowProps } from '../menu';
import { useForwardExpose } from '../shared';

export interface ADropdownMenuArrowProps extends AMenuArrowProps {}
</script>

<script setup lang="ts">
import { AMenuArrow } from '../menu';

const props = withDefaults(defineProps<ADropdownMenuArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg',
});
useForwardExpose();
</script>

<template>
  <AMenuArrow v-bind="props">
    <slot />
  </AMenuArrow>
</template>
