<script lang="ts">
import type { RangeCalendarCellTriggerSlot } from '~~/range-calendar/range-calendar-cell-trigger.vue';
import type { ARangeCalendarCellTriggerProps } from '..';
import { ARangeCalendarCellTrigger } from '..';

export interface ADateRangePickerCellTriggerProps extends ARangeCalendarCellTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerCellTriggerProps>();

defineSlots<RangeCalendarCellTriggerSlot>();
</script>

<template>
  <ARangeCalendarCellTrigger
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />>
  </ARangeCalendarCellTrigger>
</template>
