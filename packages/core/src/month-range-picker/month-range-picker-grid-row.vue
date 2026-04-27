<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerGridRowProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AMonthRangePickerGridRow' });

const props = withDefaults(
  defineProps<AMonthRangePickerGridRowProps>(),
  { as: 'tr' },
);
</script>

<template>
  <APrimitive
    v-bind="props"
    role="row"
  >
    <slot />
  </APrimitive>
</template>
