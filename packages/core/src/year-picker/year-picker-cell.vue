<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AYearPickerCellProps extends APrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAYearPickerRootContext } from './year-picker-root.vue';

withDefaults(
  defineProps<AYearPickerCellProps>(),
  { as: 'td' },
);
const rootContext = injectAYearPickerRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isYearSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isYearDisabled(date) || rootContext.isYearUnavailable?.(date)"
    :data-disabled="rootContext.isYearDisabled(date) ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
