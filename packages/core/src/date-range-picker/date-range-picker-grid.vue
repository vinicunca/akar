<script lang="ts">
import type { ARangeCalendarGridProps } from '..';
import { ARangeCalendarGrid } from '..';

export interface ADateRangePickerGridProps extends ARangeCalendarGridProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerGridProps>();
</script>

<template>
  <ARangeCalendarGrid v-bind="props">
    <slot />
  </ARangeCalendarGrid>
</template>
