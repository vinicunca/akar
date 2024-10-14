<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ARangeCalendarHeadCellProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

const props = withDefaults(
  defineProps<ARangeCalendarHeadCellProps>(),
  { as: 'th' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
