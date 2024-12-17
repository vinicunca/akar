<script lang="ts">
import { ARangeCalendarHeadCell, type ARangeCalendarHeadCellProps } from '..';

export interface ADateRangePickerHeadCellProps extends ARangeCalendarHeadCellProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerHeadCellProps>();
</script>

<template>
  <ARangeCalendarHeadCell v-bind="props">
    <slot />
  </ARangeCalendarHeadCell>
</template>
