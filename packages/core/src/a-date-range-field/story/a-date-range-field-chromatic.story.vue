<script setup lang="ts">
import { CalendarDateTime, type DateValue, getLocalTimeZone, now } from '@internationalized/date';
import { type Ref, ref } from 'vue';

import AADateRangeField from './_dummy-a-date-range-field.vue.vue';

const defaultValue = { start: new CalendarDateTime(2024, 2, 20), end: new CalendarDateTime(2024, 2, 27) };
const modelValue = ref(defaultValue) as Ref<{ end: DateValue; start: DateValue }>;

const defaultPlaceholder = new CalendarDateTime(2023, 10, 11, 12, 30);
const localTimezonePlaceholder = now(getLocalTimeZone());
</script>

<template>
  <Story
    title="ADateRangeField/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Empty default">
      <AADateRangeField />
    </Variant>

    <Variant title="With default">
      <AADateRangeField :default-value="defaultValue" />
    </Variant>

    <Variant title="Uncontrolled">
      <AADateRangeField :default-value="defaultValue" />
    </Variant>

    <Variant title="Controlled">
      <AADateRangeField v-model="modelValue" />
    </Variant>

    <Variant title="Disabled">
      <AADateRangeField
        :default-value="defaultValue"
        disabled
      />
    </Variant>

    <Variant title="Locale awareness">
      <AADateRangeField
        :default-value="defaultValue"
        locale="de"
      />
    </Variant>

    <Variant title="Placeholder">
      <AADateRangeField :default-placeholder="defaultPlaceholder" />
    </Variant>

    <Variant title="Locale timezone">
      <AADateRangeField :default-placeholder="localTimezonePlaceholder" />
    </Variant>
  </Story>
</template>
