<script setup lang="ts">
import { CalendarDate, isWeekend } from '@internationalized/date';

import type { ACalendarRootProps } from '..';

import ACalendar from './_dummy-calendar.vue';

const isDateUnavailable: ACalendarRootProps['isDateUnavailable'] = (date) => {
  return isWeekend(date, 'en');
};
const isDateDisabled: ACalendarRootProps['isDateUnavailable'] = (date) => {
  return date.day > 20;
};

const defaultValue = new CalendarDate(2024, 2, 14);
const minValue = new CalendarDate(2024, 2, 12);
const maxValue = new CalendarDate(2024, 2, 20);
</script>

<template>
  <Story
    title="ACalendar/Validation"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Unavailable">
      <ACalendar
        :default-value="defaultValue"
        :is-date-unavailable="isDateUnavailable"
      />
    </Variant>

    <Variant title="Disabled">
      <ACalendar
        :default-value="defaultValue"
        :is-date-disabled="isDateDisabled"
      />
    </Variant>

    <Variant title="Min">
      <ACalendar
        :default-value="defaultValue"
        :min-value="minValue"
      />
    </Variant>

    <Variant title="Max">
      <ACalendar
        :default-value="defaultValue"
        :max-value="maxValue"
      />
    </Variant>

    <Variant title="Min Max">
      <ACalendar
        :default-value="defaultValue"
        :min-value="minValue"
        :max-value="maxValue"
      />
    </Variant>
  </Story>
</template>
