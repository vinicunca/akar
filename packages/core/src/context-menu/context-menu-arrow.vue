<script lang="ts">
import type { AMenuArrowProps } from '../menu';

export interface AContextMenuArrowProps extends AMenuArrowProps {}
</script>

<script setup lang="ts">
import { AMenuArrow } from '../menu';
import { useForwardExpose } from '../shared';

const props = withDefaults(
  defineProps<AContextMenuArrowProps>(),
  {
    width: 10,
    height: 5,
    as: 'svg',
  },
);

useForwardExpose();
</script>

<template>
  <AMenuArrow v-bind="props">
    <slot />
  </AMenuArrow>
</template>
