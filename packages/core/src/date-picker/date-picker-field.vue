<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { ADateFieldRoot } from '..';
import { injectADatePickerRootContext } from './date-picker-root.vue';

const rootContext = injectADatePickerRootContext();

function handleUpdateModelValue(date: DateValue | undefined) {
  if (
    date
    && rootContext.modelValue.value
    && date.compare(rootContext.modelValue.value) === 0
  ) {
    return;
  }

  rootContext.onDateChange(date);
}

function handleUpdatePlaceholder(date: DateValue) {
  if (date.compare(rootContext.placeholder.value) === 0) {
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
      step: rootContext.step.value,
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
