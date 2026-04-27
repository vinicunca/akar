<script lang="ts" setup>
import type { DateValue } from '@internationalized/date';
import type { AYearPickerRootProps } from '..';
import {
  AYearPickerCell,
  AYearPickerCellTrigger,
  AYearPickerGrid,
  AYearPickerGridBody,
  AYearPickerGridRow,
  AYearPickerHeader,
  AYearPickerHeading,
  AYearPickerNext,
  AYearPickerPrev,
  AYearPickerRoot,
} from '..';

const props = defineProps<{
  pickerProps?: AYearPickerRootProps;
  emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void };
}>();
</script>

<template>
  <AYearPickerRoot
    v-slot="{ grid }"
    v-bind="props.pickerProps"
    data-testid="year-picker"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <AYearPickerHeader data-testid="header">
      <AYearPickerPrev data-testid="prev-button" />
      <AYearPickerHeading data-testid="heading" />
      <AYearPickerNext data-testid="next-button" />
    </AYearPickerHeader>

    <AYearPickerGrid data-testid="grid">
      <AYearPickerGridBody data-testid="grid-body">
        <AYearPickerGridRow
          v-for="(yearRow, rowIndex) in grid.rows"
          :key="`yearRow-${rowIndex}`"
          :data-testid="`grid-row-${rowIndex}`"
        >
          <AYearPickerCell
            v-for="(year, cellIndex) in yearRow"
            :key="year.toString()"
            :data-testid="`cell-${rowIndex}-${cellIndex}`"
            :date="year"
          >
            <AYearPickerCellTrigger
              :year="year"
              :data-testid="`year-${year.year}`"
            />
          </AYearPickerCell>
        </AYearPickerGridRow>
      </AYearPickerGridBody>
    </AYearPickerGrid>
  </AYearPickerRoot>
</template>
