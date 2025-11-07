<script lang="ts">
import type { CalendarPrevSlot } from '../calendar/calendar-prev.vue';
import type { ACalendarPrevProps } from '..';
import { ACalendarPrev } from '..';

export interface ADatePickerPrevProps extends ACalendarPrevProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerPrevProps>();

defineSlots<CalendarPrevSlot>();
</script>

<template>
  <ACalendarPrev
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </ACalendarPrev>
</template>
