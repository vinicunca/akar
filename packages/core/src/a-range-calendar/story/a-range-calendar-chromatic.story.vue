<script setup lang="ts">
import { CalendarDate, type DateValue, PersianCalendar, toCalendar } from '@internationalized/date';
import { type Ref, ref } from 'vue';

import ARangeCalendar from './_dummy-a-range-calendar.vue';

const defaultValue = { start: new CalendarDate(2024, 2, 20), end: new CalendarDate(2024, 2, 27) };
const persianCalendar = ref({ start: toCalendar(defaultValue.start, new PersianCalendar()), end: toCalendar(defaultValue.end, new PersianCalendar()) }) as Ref<{ end: DateValue; start: DateValue }>;
const modelValue = ref(defaultValue) as Ref<{ end: DateValue; start: DateValue }>;

const placeholder = ref(new CalendarDate(2024, 4, 1)) as Ref<CalendarDate>;

function paging(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 });
  }
  return date.add({ years: 1 });
}
</script>

<template>
  <Story
    title="ARangeCalendar/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Uncontrolled (modelValue)">
      <ARangeCalendar :default-value="defaultValue" />
    </Variant>

    <Variant title="Controlled (modelValue)">
      <ARangeCalendar v-model="modelValue" />
    </Variant>

    <Variant title="Uncontrolled (placeholder)">
      <ARangeCalendar
        :default-value="defaultValue"
        :default-placeholder="placeholder"
      />
    </Variant>

    <Variant title="Controlled (placeholder)">
      <ARangeCalendar v-model:placeholder="placeholder" />
    </Variant>

    <Variant title="Empty default">
      <ARangeCalendar />
    </Variant>

    <Variant title="Default value">
      <ARangeCalendar :default-value="defaultValue" />
    </Variant>

    <Variant title="Disabled">
      <ARangeCalendar :disabled="true" />
    </Variant>

    <Variant title="Fixed weeks">
      <ARangeCalendar
        :default-value="defaultValue"
        fixed-weeks
      />
    </Variant>

    <Variant title="Localization">
      <ARangeCalendar
        :default-value="defaultValue"
        locale="de"
      />
    </Variant>

    <Variant title="Prevent deselection">
      <ARangeCalendar
        :default-value="defaultValue"
        prevent-deselect
      />
    </Variant>

    <Variant title="Multiple selection">
      <ARangeCalendar
        :default-value="defaultValue"
        multiple
      />
    </Variant>

    <Variant title="Different calendar">
      <ARangeCalendar :default-value="persianCalendar" />
    </Variant>

    <Variant title="Pagination functions">
      <ARangeCalendar
        :default-value="defaultValue"
        :prev-page="(date: DateValue) => paging(date, -1)"
        :next-page="(date:DateValue) => paging(date, 1)"
      />
    </Variant>
  </Story>
</template>
