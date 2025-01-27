<script lang="ts">
import type { ARangeCalendarHeadCellProps } from '..';
import { ARangeCalendarHeadCell } from '..';

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
