<script lang="ts">
import { ARangeCalendarGrid, type ARangeCalendarGridProps } from '~~/a-range-calendar';

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
