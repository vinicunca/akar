<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerCellProps extends APrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAMonthRangePickerRootContext } from './month-range-picker-root.vue';

withDefaults(
  defineProps<AMonthRangePickerCellProps>(),
  { as: 'td' },
);
const rootContext = injectAMonthRangePickerRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isMonthDisabled(date) || rootContext.isMonthUnavailable?.(date)"
    :data-disabled="rootContext.isMonthDisabled(date) ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
