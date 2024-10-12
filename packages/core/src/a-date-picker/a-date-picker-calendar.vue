<script setup lang="ts">
import { type DateValue, isEqualDay } from '@internationalized/date';

import { ACalendarRoot } from '~~/a-calendar';

import { injectADatePickerRootContext } from './a-date-picker-root.vue';

const rootContext = injectADatePickerRootContext();

function handleUpdateModelValue(date: DateValue | undefined) {
  if (date && rootContext.modelValue.value && isEqualDay(date, rootContext.modelValue.value)) {
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
  <ACalendarRoot
    v-slot="{ weekDays, grid, date, weekStartsOn, locale, fixedWeeks }"
    v-bind="{
      isDateDisabled: rootContext.isDateDisabled,
      isDateUnavailable: rootContext.isDateUnavailable,
      minValue: rootContext.minValue.value,
      maxValue: rootContext.maxValue.value,
      locale: rootContext.locale.value,
      disabled: rootContext.disabled.value,
      pagedNavigation: rootContext.pagedNavigation.value,
      weekStartsOn: rootContext.weekStartsOn.value,
      weekdayFormat: rootContext.weekdayFormat.value,
      fixedWeeks: rootContext.fixedWeeks.value,
      numberOfMonths: rootContext.numberOfMonths.value,
      readonly: rootContext.readonly.value,
      preventDeselect: rootContext.preventDeselect.value,
      dir: rootContext.dir.value,
    }"
    :model-value="rootContext.modelValue.value"
    :placeholder="rootContext.placeholder.value"
    initial-focus
    :multiple="false"
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
  </ACalendarRoot>
</template>
