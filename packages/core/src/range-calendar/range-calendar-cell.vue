<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface ARangeCalendarCellProps extends APrimitiveProps {
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

withDefaults(defineProps<ARangeCalendarCellProps>(), { as: 'td' });
const rootContext = injectARangeCalendarRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date) || rootContext.disableDaysOutsideCurrentView.value"
    :data-disabled="rootContext.isDateDisabled(date) || rootContext.disableDaysOutsideCurrentView.value ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
