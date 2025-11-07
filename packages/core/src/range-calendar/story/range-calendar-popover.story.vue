<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import type { Ref } from 'vue';
import { Icon } from '@iconify/vue';
import { getLocalTimeZone, today } from '@internationalized/date';
import { ref } from 'vue';
import CalendarPopover from '../calendar/story/_calendar-popover.vue';

import { createDecade, createYear, toDate } from '../date';
import { useDateFormatter } from '../../shared';
import { ARangeCalendarCell, ARangeCalendarCellTrigger, ARangeCalendarGrid, ARangeCalendarGridBody, ARangeCalendarGridHead, ARangeCalendarGridRow, ARangeCalendarHeadCell, ARangeCalendarHeader, ARangeCalendarHeading, ARangeCalendarNext, ARangeCalendarPrev, ARangeCalendarRoot } from '..';

const placeholder = ref(today(getLocalTimeZone())) as Ref<DateValue>;
const formatter = useDateFormatter('en');
</script>

<template>
  <Story
    title="Range Calendar/Popover"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <ARangeCalendarRoot
        v-slot="{ weekDays, grid, date }"
        v-model:placeholder="placeholder"
        class="mt-6 p-[22px] border border-black rounded-[15px] bg-white shadow-md"
        fixed-weeks
      >
        <ARangeCalendarHeader class="flex items-center justify-between">
          <ARangeCalendarPrev
            class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-6 w-6"
            />
          </ARangeCalendarPrev>
          <ARangeCalendarHeading class="text-[15px] text-black font-medium flex gap-2 justify-center">
            <CalendarPopover>
              <template #trigger>
                <span class="cursor-pointer">{{ formatter.fullMonth(toDate(date)) }}</span>
              </template>
              <div class="rounded-[9px] bg-white grid grid-cols-4">
                <div
                  v-for="month in createYear({ dateObj: date })"
                  :key="month.toString()"
                  class="text-sm text-black font-normal p-2 outline-none border border-transparent rounded-[9px] bg-transparent flex cursor-pointer whitespace-nowrap items-center justify-center relative hover:border-black focus:shadow-[0_0_0_2px] focus:shadow-black"
                  :class="{ 'before:absolute before:top-[5px] before:rounded-full before:w-1 before:h-1 before:block before:bg-grass9': date.month === month.month }"
                  @click="placeholder = month.copy()"
                >
                  <span class="cursor-pointer">{{ formatter.custom(toDate(month), { month: 'short' }) }}</span>
                </div>
              </div>
            </CalendarPopover>
            <CalendarPopover>
              <template #trigger>
                <span class="cursor-pointer">{{ formatter.fullYear(toDate(date)) }}</span>
              </template>
              <div class="rounded-[9px] bg-white gap-4 grid grid-cols-4">
                <div
                  v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
                  :key="yearValue.toString()"
                  class="text-sm text-black font-normal p-2 outline-none border border-transparent rounded-[9px] bg-transparent flex cursor-pointer whitespace-nowrap items-center justify-center relative hover:border-black focus:shadow-[0_0_0_2px] focus:shadow-black"
                  :class="{ 'before:absolute before:top-[5px] before:rounded-full before:w-1 before:h-1 before:block before:bg-grass9': date.year === yearValue.year }"
                  @click="placeholder = yearValue.copy()"
                >
                  {{ yearValue.year }}
                </div>
              </div>
            </CalendarPopover>
          </ARangeCalendarHeading>

          <ARangeCalendarNext
            class="text-black rounded-[9px] bg-transparent inline-flex h-10 w-10 cursor-pointer items-center justify-center hover:text-white hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black active:scale-98 active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-6 w-6"
            />
          </ARangeCalendarNext>
        </ARangeCalendarHeader>
        <div
          class="pt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <ARangeCalendarGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full select-none border-collapse space-y-1"
          >
            <ARangeCalendarGridHead>
              <ARangeCalendarGridRow class="mb-1 grid grid-cols-7 w-full">
                <ARangeCalendarHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="text-xs text-black rounded-md !font-normal"
                >
                  {{ day }}
                </ARangeCalendarHeadCell>
              </ARangeCalendarGridRow>
            </ARangeCalendarGridHead>
            <ARangeCalendarGridBody class="grid">
              <ARangeCalendarGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="grid grid-cols-7"
              >
                <ARangeCalendarCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="text-sm text-center relative !p-0"
                >
                  <ARangeCalendarCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="data-[highlighted]:bg-grass9/30 data-[today]:before:bg-grass9 text-sm text-black font-normal p-2 outline-none border border-transparent rounded-[9px] bg-transparent flex whitespace-nowrap items-center justify-center relative data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium hover:border-black before:rounded-full data-[highlighted]:rounded-none data-[selection-end]:rounded-none data-[selection-start]:rounded-none data-[selection-end]:rounded-r-[9px] data-[selection-start]:rounded-l-[9px] before:bg-white data-[selected]:bg-black data-[selection-end]:bg-black data-[selection-start]:bg-black data-[unavailable]:line-through before:h-1 before:w-1 before:hidden focus:shadow-[0_0_0_2px] focus:shadow-black before:top-[5px] before:absolute data-[selected]:before:bg-white data-[today]:before:block data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none"
                  />
                </ARangeCalendarCell>
              </ARangeCalendarGridRow>
            </ARangeCalendarGridBody>
          </ARangeCalendarGrid>
        </div>
      </ARangeCalendarRoot>
    </Variant>
  </Story>
</template>
