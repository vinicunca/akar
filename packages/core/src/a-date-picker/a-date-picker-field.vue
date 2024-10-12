<script setup lang="ts">
import { type DateValue, isEqualDay } from '@internationalized/date';

import { ADateFieldRoot } from '~~/a-date-field';

import { injectADatePickerRootContext } from './a-date-picker-root.vue';

const rootContext = injectADatePickerRootContext();

function handleUpdateModelValue(date?: DateValue) {
  if (
    date && rootContext.modelValue.value
    && isEqualDay(rootContext.modelValue.value, date)
    && date.compare(rootContext.modelValue.value) === 0
  ) {
    return;
  }

  rootContext.onDateChange(date);
}

function handleUpdatePlaceholder(date: DateValue) {
  if (
    isEqualDay(rootContext.placeholder.value, date)
    && date.compare(rootContext.placeholder.value) === 0
  ) {
    return;
  }

  rootContext.onPlaceholderChange(date);
}
</script>

<template>
  <ADateFieldRoot
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
  </ADateFieldRoot>
</template>
