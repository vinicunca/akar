<script lang="ts" setup>
import type { AYearRangePickerRootProps } from '..';
import type { DateRange } from '../../shared/date';
import {
  AYearRangePickerCell,
  AYearRangePickerCellTrigger,
  AYearRangePickerGrid,
  AYearRangePickerGridBody,
  AYearRangePickerGridRow,
  AYearRangePickerHeader,
  AYearRangePickerHeading,
  AYearRangePickerNext,
  AYearRangePickerPrev,
  AYearRangePickerRoot,
} from '..';

const props = defineProps<{ pickerProps?: AYearRangePickerRootProps; emits?: { 'onUpdate:modelValue'?: (data: DateRange) => void } }>();
</script>

<template>
  <AYearRangePickerRoot
    v-slot="{ grid }"
    v-bind="props.pickerProps"
    data-testid="year-range-picker"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <AYearRangePickerHeader data-testid="header">
      <AYearRangePickerPrev data-testid="prev-button" />
      <AYearRangePickerHeading data-testid="heading" />
      <AYearRangePickerNext data-testid="next-button" />
    </AYearRangePickerHeader>

    <AYearRangePickerGrid data-testid="grid">
      <AYearRangePickerGridBody data-testid="grid-body">
        <AYearRangePickerGridRow
          v-for="(yearRow, rowIndex) in grid.rows"
          :key="`yearRow-${rowIndex}`"
          :data-testid="`grid-row-${rowIndex}`"
        >
          <AYearRangePickerCell
            v-for="(year, cellIndex) in yearRow"
            :key="year.toString()"
            :data-testid="`cell-${rowIndex}-${cellIndex}`"
            :date="year"
          >
            <AYearRangePickerCellTrigger
              :year="year"
              :data-testid="`year-${year.year}`"
            />
          </AYearRangePickerCell>
        </AYearRangePickerGridRow>
      </AYearRangePickerGridBody>
    </AYearRangePickerGrid>
  </AYearRangePickerRoot>
</template>
