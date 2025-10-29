<script setup lang="ts">
import type { DateValue } from 'akar';
import { ARangeCalendarCell, ARangeCalendarCellTrigger, ARangeCalendarGrid, ARangeCalendarGridBody, ARangeCalendarGridHead, ARangeCalendarGridRow, ARangeCalendarHeadCell, ARangeCalendarHeader, ARangeCalendarHeading, ARangeCalendarNext, ARangeCalendarPrev, ARangeCalendarRoot } from 'akar';

function isDateUnavailable(date: DateValue) {
  return date.day === 17 || date.day === 18;
}
</script>

<template>
  <ARangeCalendarRoot
    v-slot="{ weekDays, grid }"
    :is-date-unavailable="isDateUnavailable"
    fixed-weeks
  >
    <ARangeCalendarHeader class="flex items-center justify-between">
      <ARangeCalendarPrev
        class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
      >
        <i
          class="i-lucide:chevron-left h-4 w-4"
        />
      </ARangeCalendarPrev>
      <ARangeCalendarHeading class="text-sm font-medium mx-auto text-center truncate" />

      <ARangeCalendarNext
        class="text-sm color-text font-medium p-1.5 rounded-md inline-flex gap-1.5 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
      >
        <i
          class="i-lucide:chevron-right h-4 w-4"
        />
      </ARangeCalendarNext>
    </ARangeCalendarHeader>
    <div
      class="pt-4 flex flex-col space-y-4 sm:(flex-row space-x-4 space-y-0)"
    >
      <ARangeCalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full select-none border-collapse space-y-1 focus:outline-none"
      >
        <ARangeCalendarGridHead>
          <ARangeCalendarGridRow class="mb-1 grid grid-cols-7 w-full">
            <ARangeCalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="text-xs color-primary rounded-md"
            >
              {{ day }}
            </ARangeCalendarHeadCell>
          </ARangeCalendarGridRow>
        </ARangeCalendarGridHead>
        <ARangeCalendarGridBody class="grid">
          <ARangeCalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="grid grid-cols-7 place-items-center"
          >
            <ARangeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="text-sm text-center relative"
            >
              <ARangeCalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="m-0.5 rounded-full flex size-8 whitespace-nowrap transition-colors-280 items-center justify-center relative data-[disabled]:(color-text-dimmed cursor-not-allowed) data-[outside-view]:color-text-muted data-[unavailable]:(color-text-muted line-through pointer-events-none) data-[today]:font-semibold focus:outline-none data-[highlighted]:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary data-[today]:not-[[data-selected]]:color-primary hover:not-[[data-selected]]:bg-primary/20 akar:data-[selected]:color-text-inverted akar:data-[selected]:bg-primary"
              />
            </ARangeCalendarCell>
          </ARangeCalendarGridRow>
        </ARangeCalendarGridBody>
      </ARangeCalendarGrid>
    </div>
  </ARangeCalendarRoot>
</template>
