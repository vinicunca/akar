<script setup lang="ts">
import { type DateValue, isEqualDay } from '@internationalized/date';

import type { DateRange } from '~~/date';

import { ADateRangeFieldRoot } from '~~/a-date-range-field';

import { injectADateRangePickerRootContext } from './a-date-range-picker-root.vue';

const rootContext = injectADateRangePickerRootContext();

function handleUpdateModelValue(date: DateRange) {
  if (
    date.start
    && rootContext.modelValue.value.start
    && date.end
    && rootContext.modelValue.value.end
    && date.start.compare(rootContext.modelValue.value.start) === 0
    && date.end.compare(rootContext.modelValue.value.end) === 0
  ) {
    return;
  }

  rootContext.onDateChange(date);
}

function handleUpdatePlaceholder(date: DateValue) {
  if (
    isEqualDay(date, rootContext.placeholder.value)
    && date.compare(rootContext.placeholder.value) === 0
  ) {
    return;
  }

  rootContext.onPlaceholderChange(date);
}
</script>

<template>
  <ADateRangeFieldRoot
    v-slot="{ segments, modelValue }"
    :ref="rootContext.dateFieldRef"
    :model-value="rootContext.modelValue.value"
    :placeholder="rootContext.placeholder.value"
    v-bind="{
      id: rootContext.id.value,
      name: rootContext.name.value,
      disabled: rootContext.disabled.value,
      minValue: rootContext.minValue.value,
      maxValue: rootContext.maxValue.value,
      readonly: rootContext.readonly.value,
      hourCycle: rootContext.hourCycle.value,
      granularity: rootContext.granularity.value,
      hideTimeZone: rootContext.hideTimeZone.value,
      locale: rootContext.locale.value,
      isDateUnavailable: rootContext.isDateUnavailable,
      required: rootContext.required.value,
      dir: rootContext.dir.value,
    }"
    @update:model-value="handleUpdateModelValue"
    @update:placeholder="handleUpdatePlaceholder"
  >
    <slot
      :segments="segments"
      :model-value="modelValue"
    />
  </ADateRangeFieldRoot>
</template>
