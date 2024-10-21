<script setup lang="ts">
import { BuddhistCalendar, CalendarDate, HebrewCalendar, JapaneseCalendar, PersianCalendar, TaiwanCalendar } from '@internationalized/date';

import ACalendar from './_dummy-calendar.vue';

const gregorian = new CalendarDate(2024, 8, 31);

const persian = new CalendarDate(
  new PersianCalendar(),
  1404,
  5,
  31,
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
  10,
  31,
);
const taiwan = new CalendarDate(
  new TaiwanCalendar(),
  109,
  10,
  31,
);

const hebrew = new CalendarDate(
  new HebrewCalendar(),
  5781,
  6,
  29,
);
</script>

<template>
  <Story
    title="Calendar/Fixed Weeks For Locales"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Gregorian">
      <ACalendar
        :default-value="gregorian"
        fixed-weeks
        locale="en"
      />
    </Variant>

    <Variant title="Japanese">
      <ACalendar
        :default-value="japanese"
        fixed-weeks
        locale="ja"
      />
    </Variant>

    <Variant title="Persian">
      <ACalendar
        :default-value="persian"
        fixed-weeks
        locale="fa-IR"
      />
    </Variant>

    <Variant title="Taiwan">
      <ACalendar
        :default-value="taiwan"
        fixed-weeks
        locale="zh-TW"
      />
    </Variant>

    <Variant title="Buddhist">
      <ACalendar
        :default-value="buddhist"
        fixed-weeks
        locale="th"
      />
    </Variant>

    <Variant title="Hebrew">
      <ACalendar
        :default-value="hebrew"
        fixed-weeks
        locale="he"
      />
    </Variant>
  </Story>
</template>
