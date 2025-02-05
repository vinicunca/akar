<script lang="ts">
import type { CalendarNextSlot } from '~~/calendar/calendar-next.vue';
import type { ACalendarNextProps } from '..';
import { ACalendarNext } from '..';

export interface ADatePickerNextProps extends ACalendarNextProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerNextProps>();

defineSlots<CalendarNextSlot>();
</script>

<template>
  <ACalendarNext
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </ACalendarNext>
</template>
