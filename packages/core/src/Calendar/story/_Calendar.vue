<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import type { ACalendarRootProps } from '..'
import { ACalendarCell, ACalendarCellTrigger, ACalendarGrid, ACalendarGridBody, ACalendarGridHead, ACalendarGridRow, ACalendarHeadCell, ACalendarHeader, ACalendarHeading, ACalendarNext, ACalendarPrev, ACalendarRoot } from '..'

const props = defineProps<{ calendarProps?: ACalendarRootProps, emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void } }>()

function pagingFunc(date: DateValue, sign: -1 | 1) {
  if (sign === -1)
    return date.subtract({ years: 1 })
  return date.add({ years: 1 })
}
</script>

<template>
  <ACalendarRoot
    v-slot="{ weekDays, grid }"
    v-bind="props.calendarProps"
    data-testid="calendar"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ACalendarHeader data-testid="header">
      <ACalendarPrev
        :prev-page="(date: DateValue) => pagingFunc(date, -1)"
        data-testid="prev-year-button"
      />
      <ACalendarPrev
        data-testid="prev-button"
      />
      <ACalendarHeading data-testid="heading" />
      <ACalendarNext
        data-testid="next-button"
      />
      <ACalendarNext
        :next-page="(date: DateValue) => pagingFunc(date, 1)"
        data-testid="next-year-button"
      />
    </ACalendarHeader>

    <ACalendarGrid
      v-for="month in grid"
      :key="month.value.toString()"
      :data-testid="`grid-${month.value.month}`"
    >
      <ACalendarGridHead :data-testid="`grid-head-${month.value.month}`">
        <ACalendarGridRow>
          <ACalendarHeadCell
            v-for="(day, i) in weekDays"
            :key="day"
            :data-testid="`weekday-${month.value.month}-${i}`"
          >
            {{ day }}
          </ACalendarHeadCell>
        </ACalendarGridRow>
      </ACalendarGridHead>
      <ACalendarGridBody :data-testid="`grid-body-${month.value.month}`">
        <ACalendarGridRow
          v-for="(weekDates, index) in month.rows"
          :key="`weekDate-${index}`"
          data-week
          :data-testid="`grid-row-${month.value.month}-${index}`"
        >
          <ACalendarCell
            v-for="(weekDate, d) in weekDates"
            :key="weekDate.toString()"
            :data-testid="`cell-${weekDate.month}-${d}`"
            :date="weekDate"
          >
            <ACalendarCellTrigger
              :day="weekDate"
              :month="month.value"
              :data-testid="`date-${weekDate.month}-${weekDate.day}`"
            />
          </ACalendarCell>
        </ACalendarGridRow>
      </ACalendarGridBody>
    </ACalendarGrid>
  </ACalendarRoot>
</template>
