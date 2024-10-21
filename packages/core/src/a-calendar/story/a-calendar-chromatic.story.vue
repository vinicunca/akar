<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date';
import { type Ref, ref } from 'vue';

import ACalendar from './_dummy-calendar.vue';

const defaultValue = new CalendarDate(2024, 2, 20);
const modelValue = ref(defaultValue) as Ref<DateValue>;

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
    title="ACalendar/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Uncontrolled (modelValue)">
      <ACalendar :default-value="defaultValue" />
    </Variant>

    <Variant title="Controlled (modelValue)">
      <ACalendar v-model="modelValue" />
    </Variant>

    <Variant title="Uncontrolled (placeholder)">
      <ACalendar
        :default-value="defaultValue"
        :default-placeholder="placeholder"
      />
    </Variant>

    <Variant title="Controlled (placeholder)">
      <ACalendar
        v-model:placeholder="placeholder"
        :default-value="defaultValue"
      />
    </Variant>

    <Variant title="Empty default">
      <ACalendar />
    </Variant>

    <Variant title="Default value">
      <ACalendar :default-value="defaultValue" />
    </Variant>

    <Variant title="Disabled">
      <ACalendar :disabled="true" />
    </Variant>

    <Variant title="Fixed weeks">
      <ACalendar
        :default-value="defaultValue"
        fixed-weeks
      />
    </Variant>

    <Variant title="Localization">
      <ACalendar
        :default-value="defaultValue"
        locale="de"
      />
    </Variant>

    <Variant title="Prevent deselection">
      <ACalendar
        :default-value="defaultValue"
        prevent-deselect
      />
    </Variant>

    <Variant title="Multiple selection">
      <ACalendar
        :default-value="defaultValue"
        multiple
      />
    </Variant>

    <Variant title="Pagination functions">
      <ACalendar
        :default-value="defaultValue"
        :next-page="(date: DateValue) => paging(date, 1)"
        :prev-page="(date: DateValue) => paging(date, -1)"
      />
    </Variant>
  </Story>
</template>
