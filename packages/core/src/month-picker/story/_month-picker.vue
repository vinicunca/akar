<script lang="ts" setup>
import type { DateValue } from '@internationalized/date';
import type { AMonthPickerRootProps } from '..';
import {
  AMonthPickerCell,
  AMonthPickerCellTrigger,
  AMonthPickerGrid,
  AMonthPickerGridBody,
  AMonthPickerGridRow,
  AMonthPickerHeader,
  AMonthPickerHeading,
  AMonthPickerNext,
  AMonthPickerPrev,
  AMonthPickerRoot,
} from '..';

const props = defineProps<{ pickerProps?: AMonthPickerRootProps; emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void } }>();
</script>

<template>
  <AMonthPickerRoot
    v-slot="{ grid }"
    v-bind="props.pickerProps"
    data-testid="month-picker"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <AMonthPickerHeader data-testid="header">
      <AMonthPickerPrev data-testid="prev-button" />
      <AMonthPickerHeading data-testid="heading" />
      <AMonthPickerNext data-testid="next-button" />
    </AMonthPickerHeader>

    <AMonthPickerGrid data-testid="grid">
      <AMonthPickerGridBody data-testid="grid-body">
        <AMonthPickerGridRow
          v-for="(monthRow, rowIndex) in grid.rows"
          :key="`monthRow-${rowIndex}`"
          :data-testid="`grid-row-${rowIndex}`"
        >
          <AMonthPickerCell
            v-for="(month, cellIndex) in monthRow"
            :key="month.toString()"
            :data-testid="`cell-${rowIndex}-${cellIndex}`"
            :date="month"
          >
            <AMonthPickerCellTrigger
              :month="month"
              :data-testid="`month-${month.month}`"
            />
          </AMonthPickerCell>
        </AMonthPickerGridRow>
      </AMonthPickerGridBody>
    </AMonthPickerGrid>
  </AMonthPickerRoot>
</template>
