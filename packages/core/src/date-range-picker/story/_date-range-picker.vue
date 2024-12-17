<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import type { ADateRangePickerRootProps } from '..'
import {
  ADateRangePickerCalendar,
  ADateRangePickerCell,
  ADateRangePickerCellTrigger,
  ADateRangePickerContent,
  ADateRangePickerField,
  ADateRangePickerGrid,
  ADateRangePickerGridBody,
  ADateRangePickerGridHead,
  ADateRangePickerGridRow,
  ADateRangePickerHeadCell,
  ADateRangePickerHeader,
  ADateRangePickerHeading,
  ADateRangePickerInput,
  ADateRangePickerNext,
  ADateRangePickerPrev,
  ADateRangePickerRoot,
  ADateRangePickerTrigger,
} from '..'
import { ALabel } from '~~/label'

const props = defineProps<{ dateFieldProps?: ADateRangePickerRootProps, emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void } }>()
</script>

<template>
  <ALabel
    data-testid="label"
    for="date-picker-field"
  >Input label</ALabel>
  <ADateRangePickerRoot
    id="date-picker-field"
    :is-date-unavailable="(date:DateValue) => date.day === 19"
    v-bind="props.dateFieldProps"
    data-testid="picker"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ADateRangePickerField
      v-slot="{ segments }"
      data-testid="input"
    >
      <ADateRangePickerInput
        v-for="item in segments.start"
        :key="item.part"
        type="start"
        :part="item.part"
        :data-testid="item.part === 'literal' ? undefined : `start-${item.part}`"
      >
        {{ item.value }}
      </ADateRangePickerInput>
      -
      <ADateRangePickerInput
        v-for="item in segments.end"
        :key="item.part"
        type="end"
        :part="item.part"
        :data-testid="item.part === 'literal' ? undefined : `end-${item.part}`"
      >
        {{ item.value }}
      </ADateRangePickerInput>
      <ADateRangePickerTrigger data-testid="trigger">
        Open
      </ADateRangePickerTrigger>
    </ADateRangePickerField>

    <ADateRangePickerContent data-testid="popover-content">
      <ADateRangePickerCalendar
        v-slot="{ weekDays, grid }"
        data-testid="calendar"
      >
        <ADateRangePickerHeader data-testid="header">
          <ADateRangePickerPrev data-testid="prev-button" />
          <ADateRangePickerHeading data-testid="heading" />
          <ADateRangePickerNext data-testid="next-button" />
        </ADateRangePickerHeader>

        <ADateRangePickerGrid
          v-for="month in grid"
          :key="month.value.toString()"
          :data-testid="`grid-${month.value.month}`"
        >
          <ADateRangePickerGridHead :data-testid="`grid-head-${month.value.month}`">
            <ADateRangePickerGridRow>
              <ADateRangePickerHeadCell
                v-for="(day, i) in weekDays"
                :key="day"
                :data-testid="`weekday-${month.value.month}-${i}`"
              >
                {{ day }}
              </ADateRangePickerHeadCell>
            </ADateRangePickerGridRow>
          </ADateRangePickerGridHead>
          <ADateRangePickerGridBody>
            <ADateRangePickerGridRow
              v-for="(weekDates, index) in month.rows"
              :key="`weekDate-${index}`"
              :data-testid="`grid-body-${month.value.month}`"
            >
              <ADateRangePickerCell
                v-for="(weekDate, d) in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                :data-testid="`cell-${weekDate.month}-${d}`"
              >
                <ADateRangePickerCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  :data-testid="`date-${weekDate.month}-${weekDate.day}`"
                />
              </ADateRangePickerCell>
            </ADateRangePickerGridRow>
          </ADateRangePickerGridBody>
        </ADateRangePickerGrid>
      </ADateRangePickerCalendar>
    </ADateRangePickerContent>
  </ADateRangePickerRoot>
</template>
