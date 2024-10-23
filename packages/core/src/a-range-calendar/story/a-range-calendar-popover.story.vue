<script setup lang="ts">
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { type Ref, ref } from 'vue';

import ACalendarPopoverStory from '~~/a-calendar/story/_a-calendar-popover.vue';
import { createDecade, createYear, toDate, useDateFormatter } from '~~/date';

import {
  ARangeCalendarCell,
  ARangeCalendarCellTrigger,
  ARangeCalendarGrid,
  ARangeCalendarGridBody,
  ARangeCalendarGridHead,
  ARangeCalendarGridRow,
  ARangeCalendarHeadCell,
  ARangeCalendarHeader,
  ARangeCalendarHeading,
  ARangeCalendarNext,
  ARangeCalendarPrev,
  ARangeCalendarRoot,
} from '..';

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
        class="mt-6 border border-black rounded-[15px] bg-white p-[22px] shadow-md"
        fixed-weeks
      >
        <ARangeCalendarHeader class="flex items-center justify-between">
          <ARangeCalendarPrev
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <i
              class="i-radix-icons:chevron-left h-6 w-6"
            />
          </ARangeCalendarPrev>
          <ARangeCalendarHeading class="flex justify-center gap-2 text-[15px] text-black font-medium">
            <ACalendarPopoverStory>
              <template #trigger>
                <span class="cursor-pointer">{{ formatter.fullMonth({ date: toDate(date) }) }}</span>
              </template>
              <div class="grid grid-cols-4 rounded-[9px] bg-white">
                <div
                  v-for="month in createYear({ dateObj: date })"
                  :key="month.toString()"
                  class="relative flex cursor-pointer items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none hover:border-black focus:shadow-[0_0_0_2px] focus:shadow-black"
                  :class="{ 'before:absolute before:top-[5px] before:rounded-full before:w-1 before:h-1 before:block before:bg-grass9': date.month === month.month }"
                  @click="placeholder = month.copy()"
                >
                  <span class="cursor-pointer">{{ formatter.custom({
                    date: toDate(month), options: { month: 'short' },
                  }) }}</span>
                </div>
              </div>
            </ACalendarPopoverStory>
            <ACalendarPopoverStory>
              <template #trigger>
                <span class="cursor-pointer">{{ formatter.fullYear({ date: toDate(date) }) }}</span>
              </template>
              <div class="grid grid-cols-4 gap-4 rounded-[9px] bg-white">
                <div
                  v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
                  :key="yearValue.toString()"
                  class="relative flex cursor-pointer items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none hover:border-black focus:shadow-[0_0_0_2px] focus:shadow-black"
                  :class="{ 'before:absolute before:top-[5px] before:rounded-full before:w-1 before:h-1 before:block before:bg-grass9': date.year === yearValue.year }"
                  @click="placeholder = yearValue.copy()"
                >
                  {{ yearValue.year }}
                </div>
              </div>
            </ACalendarPopoverStory>
          </ARangeCalendarHeading>

          <ARangeCalendarNext
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <i
              class="i-radix-icons:chevron-right h-6 w-6"
            />
          </ARangeCalendarNext>
        </ARangeCalendarHeader>
        <div
          class="flex flex-col pt-4 sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0"
        >
          <ARangeCalendarGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <ARangeCalendarGridHead>
              <ARangeCalendarGridRow class="grid grid-cols-7 mb-1 w-full">
                <ARangeCalendarHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="rounded-md text-xs text-black !font-normal"
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
                  class="relative text-center text-sm !p-0"
                >
                  <ARangeCalendarCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full data-[highlighted]:rounded-none data-[selection-end]:rounded-none data-[selection-start]:rounded-none data-[selection-end]:rounded-r-[9px] data-[selection-start]:rounded-l-[9px] before:bg-white data-[highlighted]:bg-grass9/30 data-[selected]:bg-black data-[selection-end]:bg-black data-[selection-start]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[today]:before:bg-grass9 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none"
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
