<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

const modelValue = shallowRef({
  start: new CalendarDate(2025, 10, 1),
  end: new CalendarDate(2025, 10, 9),
});

function isDateDisabled(date: DateValue) {
  return date.day >= 10 && date.day <= 16;
}
</script>

<template>
  <PCalendar
    v-model="modelValue"
    :is-date-disabled="isDateDisabled"
    range
  />
</template>
