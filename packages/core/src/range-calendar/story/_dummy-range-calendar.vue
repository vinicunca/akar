<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ARangeCalendarCell, ARangeCalendarCellTrigger, ARangeCalendarGrid, ARangeCalendarGridBody, ARangeCalendarGridHead, ARangeCalendarGridRow, ARangeCalendarHeadCell, ARangeCalendarHeader, ARangeCalendarHeading, ARangeCalendarNext, ARangeCalendarPrev, range-calendar-root, type ARangeCalendarRootEmits, type ARangeCalendarRootProps } from '..'
import { useForwardPropsEmits } from '~~/shared'

const props = defineProps<ARangeCalendarRootProps>()
const emits = defineEmits<ARangeCalendarRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <range-calendar-root
    v-slot="{ weekDays, grid }"
    v-bind="forwarded"
    class="mt-6 rounded-xl border border-black bg-white p-4 shadow-md"
  >
    <ARangeCalendarHeader class="flex items-center justify-between">
      <ARangeCalendarPrev
        class="inline-flex items-center cursor-pointer text-black justify-center rounded-lg bg-transparent w-10 h-10 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          icon="radix-icons:chevron-left"
          class="w-6 h-6"
        />
      </ARangeCalendarPrev>
      <ARangeCalendarHeading class="text-[15px] text-black font-medium" />
      <ARangeCalendarNext
        class="inline-flex items-center cursor-pointer text-black justify-center rounded-lg bg-transparent w-10 h-10 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          icon="radix-icons:chevron-right"
          class="w-6 h-6"
        />
      </ARangeCalendarNext>
    </ARangeCalendarHeader>
    <div
      class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
    >
      <ARangeCalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none space-y-1"
      >
        <ARangeCalendarGridHead>
          <ARangeCalendarGridRow class="grid grid-cols-7">
            <ARangeCalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="w-8 h-8 rounded-md text-xs font-normal text-black"
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
              class="relative p-0 text-center text-sm  "
            >
              <ARangeCalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="relative flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-transparent text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black hover:border-black data-[selected]:bg-black data-[selected]:font-medium data-[disabled]:text-black/30 data-[selected]:text-white data-[highlighted]:bg-grass9/30 data-[highlighted]:rounded-none data-[selection-start]:bg-black data-[selection-start]:rounded-none data-[selection-start]:rounded-l-[9px] data-[selection-end]:rounded-none data-[selection-end]:bg-black data-[selection-end]:rounded-r-[9px] data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-grass9 data-[selected]:before:bg-white"
              />
            </ARangeCalendarCell>
          </ARangeCalendarGridRow>
        </ARangeCalendarGridBody>
      </ARangeCalendarGrid>
    </div>
  </range-calendar-root>
</template>
