<script lang="ts" setup>
import type { DateValue } from '@internationalized/date';
import type { ARangeCalendarRootProps } from '..';
import { ARangeCalendarCell, ARangeCalendarCellTrigger, ARangeCalendarGrid, ARangeCalendarGridBody, ARangeCalendarGridHead, ARangeCalendarGridRow, ARangeCalendarHeadCell, ARangeCalendarHeader, ARangeCalendarHeading, ARangeCalendarNext, ARangeCalendarPrev, ARangeCalendarRoot } from '..';

const props = defineProps<{
  calendarProps?: ARangeCalendarRootProps;
  emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void };
}>();

function pagingFunc(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 });
  }
  return date.add({ years: 1 });
}
</script>

<template>
  <ARangeCalendarRoot
    v-slot="{ weekDays, grid }"
    v-bind="props.calendarProps"
    data-testid="calendar"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ARangeCalendarHeader data-testid="header">
      <ARangeCalendarPrev
        data-testid="prev-year-button"
        :prev-page="(date: DateValue) => pagingFunc(date, -1)"
      />
      <ARangeCalendarPrev
        data-testid="prev-button"
      />
      <ARangeCalendarHeading data-testid="heading" />
      <ARangeCalendarNext
        data-testid="next-button"
      />
      <ARangeCalendarNext
        data-testid="next-year-button"
        :next-page="(date: DateValue) => pagingFunc(date, 1)"
      />
    </ARangeCalendarHeader>

    <ARangeCalendarGrid
      v-for="month in grid"
      :key="month.value.toString()"
      :data-testid="`grid-${month.value.month}`"
    >
      <ARangeCalendarGridHead :data-testid="`grid-head-${month.value.month}`">
        <ARangeCalendarGridRow>
          <ARangeCalendarHeadCell
            v-for="(day, i) in weekDays"
            :key="day"
            :data-testid="`weekday-${month.value.month}-${i}`"
          >
            {{ day }}
          </ARangeCalendarHeadCell>
        </ARangeCalendarGridRow>
      </ARangeCalendarGridHead>
      <ARangeCalendarGridBody :data-testid="`grid-body-${month.value.month}`">
        <ARangeCalendarGridRow
          v-for="(weekDates, index) in month.rows"
          :key="`weekDate-${index}`"
          data-week
          :data-testid="`grid-row-${month.value.month}-${index}`"
        >
          <ARangeCalendarCell
            v-for="(weekDate, d) in weekDates"
            :key="weekDate.toString()"
            :data-testid="`cell-${weekDate.month}-${d}`"
            :date="weekDate"
          >
            <ARangeCalendarCellTrigger
              :day="weekDate"
              :month="month.value"
              :data-testid="`date-${weekDate.month}-${weekDate.day}`"
            />
          </ARangeCalendarCell>
        </ARangeCalendarGridRow>
      </ARangeCalendarGridBody>
    </ARangeCalendarGrid>
  </ARangeCalendarRoot>
</template>
