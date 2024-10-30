<script setup lang="ts">
import { CalendarDate, type DateValue, isWeekend } from '@internationalized/date';

import ARangeCalendar from './_dummy-a-range-calendar.vue';

function isDateUnavailable(date: DateValue) {
  return isWeekend(date, 'en');
}
function isDateDisabled(date: DateValue) {
  return date.day > 20;
}

const defaultValue = { start: new CalendarDate(2024, 2, 20), end: new CalendarDate(2024, 2, 24) };
const minValue = new CalendarDate(2024, 2, 12);
const maxValue = new CalendarDate(2024, 2, 20);
</script>

<template>
  <Story
    title="ARangeCalendar/Validation"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Unavailable">
      <ARangeCalendar
        :default-value="defaultValue"
        :is-date-unavailable="isDateUnavailable"
      />
    </Variant>

    <Variant title="Disabled">
      <ARangeCalendar
        :default-value="defaultValue"
        :is-date-disabled="isDateDisabled"
      />
    </Variant>

    <Variant title="Min">
      <ARangeCalendar
        :default-value="defaultValue"
        :min-value="minValue"
      />
    </Variant>

    <Variant title="Max">
      <ARangeCalendar
        :default-value="defaultValue"
        :max-value="maxValue"
      />
    </Variant>

    <Variant title="Min Max">
      <ARangeCalendar
        :default-value="defaultValue"
        :min-value="minValue"
        :max-value="maxValue"
      />
    </Variant>
  </Story>
</template>
..
