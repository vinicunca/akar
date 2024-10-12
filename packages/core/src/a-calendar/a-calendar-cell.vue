<script lang="ts">
import type { DateValue } from '@internationalized/date';

import type { APrimitiveProps } from '~~/a-primitive';

export interface ACalendarCellProps extends APrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectACalendarRootContext } from './a-calendar-root.vue';

withDefaults(
  defineProps<ACalendarCellProps>(),
  { as: 'td' },
);

const rootContext = injectACalendarRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isDateSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)"
    :data-disabled="rootContext.isDateDisabled(date) ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
