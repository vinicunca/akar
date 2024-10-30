<script setup lang="ts">
import { CalendarDateTime, type DateValue } from '@internationalized/date';
import { type Ref, ref } from 'vue';

import ADateRangePicker from './_dummy-a-date-range-picker.vue';

const defaultValue = { start: new CalendarDateTime(2024, 2, 20), end: new CalendarDateTime(2024, 2, 27) };
const modelValue = ref(defaultValue) as Ref<{ end: DateValue; start: DateValue }>;
</script>

<template>
  <Story
    title="ADateRangePicker/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Empty default">
      <ADateRangePicker />
    </Variant>

    <Variant title="With default">
      <ADateRangePicker :default-value="defaultValue" />
    </Variant>

    <Variant title="Uncontrolled">
      <ADateRangePicker :default-value="defaultValue" />
    </Variant>

    <Variant title="Controlled">
      <ADateRangePicker v-model="modelValue" />
    </Variant>

    <Variant title="Disabled">
      <ADateRangePicker
        :default-value="defaultValue"
        disabled
      />
    </Variant>

    <Variant title="Prevent deselect">
      <ADateRangePicker
        :default-value="defaultValue"
        prevent-deselect
      />
    </Variant>

    <Variant title="Locale awareness">
      <ADateRangePicker
        :default-value="defaultValue"
        locale="de"
      />
    </Variant>

    <Variant title="Fixed weeks">
      <ADateRangePicker
        :default-value="defaultValue"
        fixed-weeks
      />
    </Variant>

    <Variant title="Multiple months">
      <ADateRangePicker
        :default-value="defaultValue"
        :number-of-months="2"
      />
    </Variant>

    <Variant title="Multiple months (Paged navigation)">
      <ADateRangePicker
        :default-value="defaultValue"
        :number-of-months="2"
        paged-navigation
      />
    </Variant>
  </Story>
</template>
