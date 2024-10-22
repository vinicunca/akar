<script setup lang="ts">
import { CalendarDateTime } from '@internationalized/date';

import AADateRangeField from './_dummy-a-date-range-field.vue.vue';

const defaultValue = { start: new CalendarDateTime(2024, 2, 20), end: new CalendarDateTime(2024, 2, 27) };
</script>

<template>
  <Story
    title="Date Range Field/Granular"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Granular (second)">
      <AADateRangeField
        :default-value="defaultValue"
        granularity="second"
      />
    </Variant>

    <Variant title="Granular (minute)">
      <AADateRangeField
        :default-value="defaultValue"
        granularity="minute"
      />
    </Variant>

    <Variant title="Granular (hour)">
      <AADateRangeField
        :default-value="defaultValue"
        granularity="hour"
      />
    </Variant>

    <Variant title="Granular (day)">
      <AADateRangeField
        :default-value="defaultValue"
        granularity="day"
      />
    </Variant>
  </Story>
</template>
