<script setup lang="ts">
import type { ARangeCalendarRootEmits, ARangeCalendarRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
import { ARangeCalendarCell, ARangeCalendarCellTrigger, ARangeCalendarGrid, ARangeCalendarGridBody, ARangeCalendarGridHead, ARangeCalendarGridRow, ARangeCalendarHeadCell, ARangeCalendarHeader, ARangeCalendarHeading, ARangeCalendarNext, ARangeCalendarPrev, ARangeCalendarRoot } from '..';

const props = defineProps<ARangeCalendarRootProps>();
const emits = defineEmits<ARangeCalendarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ARangeCalendarRoot
    v-slot="{ weekDays, grid }"
    v-bind="forwarded"
    class="mt-6 border border-black rounded-xl bg-white p-4 shadow-md"
  >
    <ARangeCalendarHeader class="flex items-center justify-between">
      <ARangeCalendarPrev
        class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-lg bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
      >
        <Icon
          icon="radix-icons:chevron-left"
          class="h-6 w-6"
        />
      </ARangeCalendarPrev>
      <ARangeCalendarHeading class="text-[15px] text-black font-medium" />
      <ARangeCalendarNext
        class="h-10 w-10 inline-flex cursor-pointer items-center justify-center rounded-lg bg-transparent text-black active:scale-98 hover:bg-black hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-black active:transition-all"
      >
        <Icon
          icon="radix-icons:chevron-right"
          class="h-6 w-6"
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
          <ARangeCalendarGridRow class="grid grid-cols-7">
            <ARangeCalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="h-8 w-8 rounded-md text-xs text-black font-normal"
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
              class="relative p-0 text-center text-sm"
            >
              <ARangeCalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="data-[highlighted]:bg-grass9/30 data-[today]:before:bg-grass9 relative h-8 w-8 flex items-center justify-center whitespace-nowrap border border-transparent rounded-lg bg-transparent text-sm text-black font-normal outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 hover:border-black before:rounded-full data-[highlighted]:rounded-none data-[selection-end]:rounded-none data-[selection-start]:rounded-none data-[selection-end]:rounded-r-[9px] data-[selection-start]:rounded-l-[9px] before:bg-white data-[selected]:bg-black data-[selection-end]:bg-black data-[selection-start]:bg-black data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:text-black/30 data-[selected]:font-medium data-[unavailable]:line-through focus:shadow-[0_0_0_2px] focus:shadow-black data-[today]:before:block data-[selected]:before:bg-white data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none"
              />
            </ARangeCalendarCell>
          </ARangeCalendarGridRow>
        </ARangeCalendarGridBody>
      </ARangeCalendarGrid>
    </div>
  </ARangeCalendarRoot>
</template>
