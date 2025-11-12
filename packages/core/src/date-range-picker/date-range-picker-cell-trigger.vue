<script lang="ts">
import type { ARangeCalendarCellTriggerProps } from '..';
import type { RangeCalendarCellTriggerSlot } from '../range-calendar/range-calendar-cell-trigger.vue';

export interface ADateRangePickerCellTriggerProps extends ARangeCalendarCellTriggerProps {}
</script>

<script setup lang="ts">
import { ARangeCalendarCellTrigger } from '..';

const props = defineProps<ADateRangePickerCellTriggerProps>();

defineSlots<RangeCalendarCellTriggerSlot>();
</script>

<template>
  <ARangeCalendarCellTrigger
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </ARangeCalendarCellTrigger>
</template>
