<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';

import ARangeCalendar from './_dummy-a-range-calendar.vue';

const defaultValue = { start: new CalendarDate(2024, 2, 20), end: new CalendarDate(2024, 2, 27) };
</script>

<template>
  <Story
    title="ARangeCalendar/Multiple"
    :layout="{ type: 'grid', width: '100%', iframe: false }"
  >
    <Variant title="2 months">
      <ARangeCalendar
        :default-value="defaultValue"
        :number-of-months="2"
      />
    </Variant>

    <Variant title="2 months (Paged navigation)">
      <ARangeCalendar
        :default-value="defaultValue"
        :number-of-months="2"
        paged-navigation
      />
    </Variant>

    <Variant title="3 months">
      <ARangeCalendar
        :default-value="defaultValue"
        :number-of-months="3"
      />
    </Variant>

    <Variant title="3 months (Paged navigation)">
      <ARangeCalendar
        :default-value="defaultValue"
        :number-of-months="3"
        paged-navigation
      />
    </Variant>

    <Variant title="3 months (Fixed week)">
      <ARangeCalendar
        :default-value="defaultValue"
        :number-of-months="3"
        fixed-weeks
      />
    </Variant>
  </Story>
</template>
