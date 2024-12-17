<script lang="ts">
import { ARangeCalendarCell, type ARangeCalendarCellProps } from '..';

export interface ADateRangePickerCellProps extends ARangeCalendarCellProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerCellProps>();
</script>

<template>
  <ARangeCalendarCell v-bind="props">
    <slot />
  </ARangeCalendarCell>
</template>
