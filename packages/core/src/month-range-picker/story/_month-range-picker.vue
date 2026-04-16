<script lang="ts" setup>
import type { AMonthRangePickerRootProps } from '..';
import type { DateRange } from '../../shared/date';
import {
  AMonthRangePickerCell,
  AMonthRangePickerCellTrigger,
  AMonthRangePickerGrid,
  AMonthRangePickerGridBody,
  AMonthRangePickerGridRow,
  AMonthRangePickerHeader,
  AMonthRangePickerHeading,
  AMonthRangePickerNext,
  AMonthRangePickerPrev,
  AMonthRangePickerRoot,
} from '..';

const props = defineProps<{ pickerProps?: AMonthRangePickerRootProps; emits?: { 'onUpdate:modelValue'?: (data: DateRange) => void } }>();
</script>

<template>
  <AMonthRangePickerRoot
    v-slot="{ grid }"
    v-bind="props.pickerProps"
    data-testid="month-range-picker"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <AMonthRangePickerHeader data-testid="header">
      <AMonthRangePickerPrev data-testid="prev-button" />
      <AMonthRangePickerHeading data-testid="heading" />
      <AMonthRangePickerNext data-testid="next-button" />
    </AMonthRangePickerHeader>

    <AMonthRangePickerGrid data-testid="grid">
      <AMonthRangePickerGridBody data-testid="grid-body">
        <AMonthRangePickerGridRow
          v-for="(monthRow, rowIndex) in grid.rows"
          :key="`monthRow-${rowIndex}`"
          :data-testid="`grid-row-${rowIndex}`"
        >
          <AMonthRangePickerCell
            v-for="(month, cellIndex) in monthRow"
            :key="month.toString()"
            :data-testid="`cell-${rowIndex}-${cellIndex}`"
            :date="month"
          >
            <AMonthRangePickerCellTrigger
              :month="month"
              :data-testid="`month-${month.month}`"
            />
          </AMonthRangePickerCell>
        </AMonthRangePickerGridRow>
      </AMonthRangePickerGridBody>
    </AMonthRangePickerGrid>
  </AMonthRangePickerRoot>
</template>
