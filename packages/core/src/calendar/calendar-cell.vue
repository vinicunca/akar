<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '~~/primitive';

export interface ACalendarCellProps extends APrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectACalendarRootContext } from './calendar-root.vue';

withDefaults(defineProps<ACalendarCellProps>(), { as: 'td' });
const rootContext = injectACalendarRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isDateSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)"
    :data-disabled="rootContext.isDateDisabled(date) || rootContext.disableDaysOutsideCurrentView.value ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
