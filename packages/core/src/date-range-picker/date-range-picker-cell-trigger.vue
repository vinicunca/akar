<script lang="ts">
import type { ARangeCalendarCellTriggerProps } from '..';
import { ARangeCalendarCellTrigger } from '..';

export interface ADateRangePickerCellTriggerProps extends ARangeCalendarCellTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerCellTriggerProps>();
</script>

<template>
  <ARangeCalendarCellTrigger v-bind="props">
    <slot />
  </ARangeCalendarCellTrigger>
</template>
