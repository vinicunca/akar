<script lang="ts" setup>
import type { DateValue } from '@internationalized/date';
import type { ADatePickerRootProps } from '..';
import { ALabel } from '~~/label';
import {
  ADatePickerCalendar,
  ADatePickerCell,
  ADatePickerCellTrigger,
  ADatePickerContent,
  ADatePickerField,
  ADatePickerGrid,
  ADatePickerGridBody,
  ADatePickerGridHead,
  ADatePickerGridRow,
  ADatePickerHeadCell,
  ADatePickerHeader,
  ADatePickerHeading,
  ADatePickerInput,
  ADatePickerNext,
  ADatePickerPrev,
  ADatePickerRoot,
  ADatePickerTrigger,
} from '..';

const props = defineProps<{ datePickerProps?: ADatePickerRootProps; emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void } }>();
</script>

<template>
  <ALabel
    data-testid="label"
    for="date-picker-field"
  >
    Input label
  </ALabel>
  <ADatePickerRoot
    id="date-picker-field"
    :is-date-unavailable="(date:DateValue) => date.day === 19"
    granularity="second"
    v-bind="props.datePickerProps"
    data-testid="picker"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ADatePickerField
      v-slot="{ segments }"
      data-testid="input"
    >
      <ADatePickerInput
        v-for="item in segments"
        :key="item.part"
        :part="item.part"
        :data-testid="item.part === 'literal' ? undefined : item.part"
      >
        {{ item.value }}
      </ADatePickerInput>
      <ADatePickerTrigger data-testid="trigger">
        Open
      </ADatePickerTrigger>
    </ADatePickerField>

    <ADatePickerContent data-testid="popover-content">
      <ADatePickerCalendar
        v-slot="{ weekDays, grid }"
        data-testid="calendar"
      >
        <ADatePickerHeader data-testid="header">
          <ADatePickerPrev data-testid="prev-button" />
          <ADatePickerHeading data-testid="heading" />
          <ADatePickerNext data-testid="next-button" />
        </ADatePickerHeader>

        <ADatePickerGrid
          v-for="month in grid"
          :key="month.value.toString()"
          :data-testid="`grid-${month.value.month}`"
        >
          <ADatePickerGridHead :data-testid="`grid-head-${month.value.month}`">
            <ADatePickerGridRow>
              <ADatePickerHeadCell
                v-for="(day, i) in weekDays"
                :key="day"
                :data-testid="`weekday-${month.value.month}-${i}`"
              >
                {{ day }}
              </ADatePickerHeadCell>
            </ADatePickerGridRow>
          </ADatePickerGridHead>
          <ADatePickerGridBody>
            <ADatePickerGridRow
              v-for="(weekDates, index) in month.rows"
              :key="`weekDate-${index}`"
              :data-testid="`grid-body-${month.value.month}`"
            >
              <ADatePickerCell
                v-for="(weekDate, d) in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                :data-testid="`cell-${weekDate.month}-${d}`"
              >
                <ADatePickerCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  :data-testid="`date-${weekDate.month}-${weekDate.day}`"
                />
              </ADatePickerCell>
            </ADatePickerGridRow>
          </ADatePickerGridBody>
        </ADatePickerGrid>
      </ADatePickerCalendar>
    </ADatePickerContent>
  </ADatePickerRoot>
</template>
