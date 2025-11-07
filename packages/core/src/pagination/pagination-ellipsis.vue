<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface APaginationEllipsisProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<APaginationEllipsisProps>();
useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    data-type="ellipsis"
  >
    <slot>&#8230;</slot>
  </APrimitive>
</template>
