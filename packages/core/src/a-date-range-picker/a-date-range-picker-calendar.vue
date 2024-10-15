<script setup lang="ts">
import { type DateValue, isEqualDay } from '@internationalized/date';

import type { DateRange } from '~~/date';

import { ARangeCalendarRoot } from '~~/a-range-calendar';

import { injectADateRangePickerRootContext } from './a-date-range-picker-root.vue';

const rootContext = injectADateRangePickerRootContext();

function handleUpdateStartValue(date?: DateValue) {
  rootContext.onStartValueChange(date);
}

function handleUpdateModelValue(date: DateRange) {
  if (
    date.start
    && rootContext.modelValue.value.start
    && date.end
    && rootContext.modelValue.value.end
    && isEqualDay(date.start, rootContext.modelValue.value.start)
    && isEqualDay(date.end, rootContext.modelValue.value.end)
  ) {
    return;
  }

  rootContext.onDateChange(date);
}

function handleUpdatePlaceholder(date: DateValue) {
  if (isEqualDay(date, rootContext.placeholder.value)) {
    return;
  }

  rootContext.onPlaceholderChange(date);
}
</script>

<template>
  <ARangeCalendarRoot
    v-slot="{ weekDays, grid, date, weekStartsOn, locale, fixedWeeks }"
    v-bind="{
      isDateDisabled: rootContext.isDateDisabled,
      isDateUnavailable: rootContext.isDateUnavailable,
      locale: rootContext.locale.value,
      disabled: rootContext.disabled.value,
      pagedNavigation: rootContext.pagedNavigation.value,
      weekStartsOn: rootContext.weekStartsOn.value,
      weekdayFormat: rootContext.weekdayFormat.value,
      fixedWeeks: rootContext.fixedWeeks.value,
      numberOfMonths: rootContext.numberOfMonths.value,
      readonly: rootContext.readonly.value,
      preventDeselect: rootContext.preventDeselect.value,
      minValue: rootContext.minValue.value,
      maxValue: rootContext.maxValue.value,
      dir: rootContext.dir.value,
    }"
    initial-focus
    :model-value="rootContext.modelValue.value"
    :placeholder="rootContext.placeholder.value"
    @update:start-value="handleUpdateStartValue"
    @update:model-value="handleUpdateModelValue"
    @update:placeholder="handleUpdatePlaceholder"
  >
    <slot
      :date="date"
      :grid="grid"
      :week-days="weekDays"
      :week-starts-on="weekStartsOn"
      :locale="locale"
      :fixed-weeks="fixedWeeks"
    />
  </ARangeCalendarRoot>
</template>
