<script setup lang="ts">
import { CalendarDateTime, type DateValue, isWeekend } from '@internationalized/date';

import ADateRangePicker from './_dummy-a-date-range-picker.vue';

const defaultValue = { start: new CalendarDateTime(2024, 2, 20), end: new CalendarDateTime(2024, 2, 27) };

const minValue = new CalendarDateTime(2024, 2, 14);
const maxValue = new CalendarDateTime(2024, 2, 28);

function isDateUnavailable(date: DateValue) {
  return isWeekend(date, 'en');
}

function isDateDisabled(date: DateValue) {
  return date.day <= 12;
}
</script>

<template>
  <Story
    title="ADateRangePicker/Validation"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Min date">
      <ADateRangePicker
        :default-value="defaultValue"
        :min-value="minValue"
      />
    </Variant>

    <Variant title="Max date">
      <ADateRangePicker
        :default-value="defaultValue"
        :max-value="maxValue"
      />
    </Variant>

    <Variant title="Unavailable">
      <ADateRangePicker
        :default-value="defaultValue"
        :is-date-unavailable="isDateUnavailable"
      />
    </Variant>

    <Variant title="Disabled">
      <ADateRangePicker
        :default-value="defaultValue"
        :is-date-disabled="isDateDisabled"
      />
    </Variant>
  </Story>
</template>
