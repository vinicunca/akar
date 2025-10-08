<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ARangeCalendarCell, ARangeCalendarCellTrigger, ARangeCalendarGrid, ARangeCalendarGridBody, ARangeCalendarGridHead, ARangeCalendarGridRow, ARangeCalendarHeadCell, ARangeCalendarHeader, ARangeCalendarHeading, ARangeCalendarNext, ARangeCalendarPrev, ARangeCalendarRoot } from '..';
</script>

<template>
  <Story
    title="Range Calendar/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ARangeCalendarRoot
        v-slot="{ weekDays, grid }"
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
          <ARangeCalendarHeading class="text-[15px] text-black font-medium" />
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
              <ARangeCalendarGridRow class="grid grid-cols-7">
                <ARangeCalendarHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="text-xs text-black rounded-md w-10 !font-normal"
                >
                  <div>{{ day.slice(0, 2) }}</div>
                </ARangeCalendarHeadCell>
              </ARangeCalendarGridRow>
            </ARangeCalendarGridHead>
            <ARangeCalendarGridBody>
              <ARangeCalendarGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="grid grid-cols-7"
              >
                <ARangeCalendarCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                  class="text-sm text-center h-10 w-10 relative !p-0"
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
..
