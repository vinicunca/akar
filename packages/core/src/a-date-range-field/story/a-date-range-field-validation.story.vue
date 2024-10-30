<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import type { DateMatcher } from '~~/date';

import AADateRangeField from './_dummy-a-date-range-field.vue.vue';

const defaultValue = { start: new CalendarDate(2024, 2, 20), end: new CalendarDate(2024, 2, 27) };
const minValue = new CalendarDate(2024, 2, 15);
const maxValue = new CalendarDate(2024, 2, 28);

const isFirstOrFifteenth: DateMatcher = (date) => {
  return date.day === 1 || date.day === 15;
};
</script>

<template>
  <Story
    title="ADateRangeField/Validation"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Unavailable">
      <AADateRangeField
        :default-value="defaultValue"
        :is-date-unavailable="isFirstOrFifteenth"
      />
    </Variant>

    <Variant title="Disabled">
      <AADateRangeField
        :default-value="defaultValue"
        :is-date-disabled="isFirstOrFifteenth"
      />
    </Variant>

    <Variant title="Min">
      <AADateRangeField
        :default-value="defaultValue"
        :min-value="minValue"
      />
    </Variant>

    <Variant title="Max">
      <AADateRangeField
        :default-value="defaultValue"
        :max-value="maxValue"
      />
    </Variant>
  </Story>
</template>
