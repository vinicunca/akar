<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACalendarHeadCellProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

const props = withDefaults(
  defineProps<ACalendarHeadCellProps>(),
  { as: 'th' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
