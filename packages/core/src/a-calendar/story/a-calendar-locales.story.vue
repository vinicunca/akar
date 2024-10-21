<script setup lang="ts">
import { BuddhistCalendar, CalendarDate, HebrewCalendar, JapaneseCalendar, PersianCalendar, TaiwanCalendar } from '@internationalized/date';

import ACalendar from './_dummy-calendar.vue';

const gregorian = new CalendarDate(2024, 2, 20);

const persian = new CalendarDate(
  new PersianCalendar(),
  1403,
  12,
  1,
);
const japanese = new CalendarDate(
  new JapaneseCalendar(),
  'heisei',
  31,
  4,
  30,

);
const buddhist = new CalendarDate(
  new BuddhistCalendar(),
  2563,
  4,
  30,
);
const taiwan = new CalendarDate(
  new TaiwanCalendar(),
  109,
  4,
  30,
);

const hebrew = new CalendarDate(
  new HebrewCalendar(),
  5781,
  5,
  1,
);
</script>

<template>
  <Story
    title="Calendar/Locales"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Gregorian">
      <ACalendar
        :default-value="gregorian"
        locale="en"
      />
    </Variant>

    <Variant title="Japanese">
      <ACalendar
        locale="ja"
        :default-value="japanese"
      />
    </Variant>

    <Variant title="Persian">
      <ACalendar
        locale="fa-IR"
        :default-value="persian"
      />
    </Variant>

    <Variant title="Taiwan">
      <ACalendar
        locale="zh-TW"
        :default-value="taiwan"
      />
    </Variant>

    <Variant title="Buddhist">
      <ACalendar
        locale="th"
        :default-value="buddhist"
      />
    </Variant>

    <Variant title="Hebrew">
      <ACalendar
        locale="he"
        :default-value="hebrew"
      />
    </Variant>
  </Story>
</template>
