<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerGridRowProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = withDefaults(
  defineProps<AYearRangePickerGridRowProps>(),
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
