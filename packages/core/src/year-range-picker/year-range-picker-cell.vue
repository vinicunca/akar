<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerCellProps extends APrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAYearRangePickerRootContext } from './year-range-picker-root.vue';

withDefaults(
  defineProps<AYearRangePickerCellProps>(),
  { as: 'td' },
);
const rootContext = injectAYearRangePickerRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isYearDisabled(date) || rootContext.isYearUnavailable?.(date)"
    :data-disabled="rootContext.isYearDisabled(date) ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
