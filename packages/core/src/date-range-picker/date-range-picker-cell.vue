<script lang="ts">
import type { ARangeCalendarCellProps } from '..';
import { ARangeCalendarCell } from '..';

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
