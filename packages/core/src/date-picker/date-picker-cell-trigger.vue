<script lang="ts">
import type { ACalendarCellTriggerProps } from '../calendar';
import type { CalendarCellTriggerSlot } from '../calendar/calendar-cell-trigger.vue';
import { ACalendarCellTrigger } from '../calendar';

export interface ADatePickerCellTriggerProps extends ACalendarCellTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerCellTriggerProps>();

defineSlots<CalendarCellTriggerSlot>();
</script>

<template>
  <ACalendarCellTrigger
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </ACalendarCellTrigger>
</template>
