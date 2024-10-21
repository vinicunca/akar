<script setup lang="ts">
import { CalendarDate, type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { type Ref, ref } from 'vue';

import { createDecade, createYear, toDate, useDateFormatter } from '~~/date';

import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..';
import ACalendarPopover from './_a-calendar-popover.vue';

const value = ref(new CalendarDate(2024, 3, 20)) as Ref<DateValue>;

const placeholder = ref(today(getLocalTimeZone())) as Ref<DateValue>;
const formatter = useDateFormatter('en');
</script>

<template>
  <Story
    title="ACalendar/Popover"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <ACalendarRoot
        v-slot="{ weekDays, grid, date }"
        v-model="value"
        v-model:placeholder="placeholder"
        class="mt-6 border border-black rounded-[15px] bg-white p-[22px] shadow-md"
        fixed-weeks
      >
        <ACalendarHeader class="flex items-center justify-between">
          <ACalendarPrev
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <i
              class="i-radix-icons:chevron-left h-6 w-6"
            />
          </ACalendarPrev>
          <ACalendarHeading class="flex justify-center gap-2 text-[15px] text-black font-medium">
            <ACalendarPopover>
              <template #trigger>
                <span class="cursor-pointer">{{ formatter.fullMonth({ date: toDate(date) }) }}</span>
              </template>
              <div class="grid grid-cols-4 rounded-[9px] bg-white">
                <div
                  v-for="month in createYear({ dateObj: date })"
                  :key="month.toString()"
                  class="relative flex cursor-pointer items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none hover:border-black focus:shadow-[0_0_0_2px] focus:shadow-black"
                  :class="{ 'before:absolute before:top-[5px] before:rounded-full before:w-1 before:h-1 before:block before:bg-grass9': placeholder.month === month.month }"
                  @click="placeholder = month.copy()"
                >
                  <span class="cursor-pointer">{{
                    formatter.custom({
                      date: toDate(month),
                      options: { month: 'short' },
                    })
                  }}
                  </span>
                </div>
              </div>
            </ACalendarPopover>
            <ACalendarPopover>
              <template #trigger>
                <span class="cursor-pointer">{{ formatter.fullYear({ date: toDate(date) }) }}</span>
              </template>
              <div class="grid grid-cols-4 gap-4 rounded-[9px] bg-white">
                <div
                  v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
                  :key="yearValue.toString()"
                  class="relative flex cursor-pointer items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none hover:border-black focus:shadow-[0_0_0_2px] focus:shadow-black"
                  :class="{ 'before:absolute before:top-[5px] before:rounded-full before:w-1 before:h-1 before:block before:bg-grass9': placeholder.year === yearValue.year }"
                  @click="placeholder = yearValue.copy()"
                >
                  {{ formatter.fullYear({ date: toDate(yearValue) }) }}
                </div>
              </div>
            </ACalendarPopover>
          </ACalendarHeading>

          <ACalendarNext
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <i
              class="i-radix-icons:chevron-right h-6 w-6"
            />
          </ACalendarNext>
        </ACalendarHeader>
        <div
          class="flex flex-col pt-4 sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0"
        >
          <ACalendarGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <ACalendarGridHead>
              <ACalendarGridRow class="grid grid-cols-7 mb-1 w-full">
                <ACalendarHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="rounded-md text-xs text-black !font-normal"
                >
                  {{ day }}
                </ACalendarHeadCell>
              </ACalendarGridRow>
            </ACalendarGridHead>
            <ACalendarGridBody class="grid">
              <ACalendarGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="grid grid-cols-7"
              >
                <ACalendarCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="relative text-center text-sm"
                >
                  <ACalendarCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center whitespace-nowrap border border-transparent rounded-[9px] bg-transparent p-2 text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[today]:before:bg-grass9"
                  />
                </ACalendarCell>
              </ACalendarGridRow>
            </ACalendarGridBody>
          </ACalendarGrid>
        </div>
      </ACalendarRoot>
    </Variant>
  </Story>
</template>
