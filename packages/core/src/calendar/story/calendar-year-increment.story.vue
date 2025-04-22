<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { Icon } from '@iconify/vue';
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..';

function paging(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 });
  }
  return date.add({ years: 1 });
}
</script>

<template>
  <Story
    title="Calendar/With Year Increments"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <ACalendarRoot
        v-slot="{ weekDays, grid }"
        class="mt-6 border border-black rounded-xl bg-white p-4 shadow-md"
      >
        <ACalendarHeader class="flex items-center justify-between">
          <ACalendarPrev
            :prev-page="(date: DateValue) => paging(date, -1)"
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:double-arrow-left"
              class="h-6 w-6"
            />
          </ACalendarPrev>
          <ACalendarPrev
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-left"
              class="h-6 w-6"
            />
          </ACalendarPrev>

          <ACalendarHeading class="text-[15px] text-black font-medium" />

          <ACalendarNext
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:chevron-right"
              class="h-6 w-6"
            />
          </ACalendarNext>
          <ACalendarNext
            :next-page="(date: DateValue) => paging(date, 1)"
            class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-[9px] bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
          >
            <Icon
              icon="radix-icons:double-arrow-right"
              class="h-6 w-6"
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
                    class="relative h-8 w-8 flex items-center justify-center whitespace-nowrap border border-transparent rounded-lg bg-transparent text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full before:bg-white data-[selected]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[today]:before:bg-grass9"
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
