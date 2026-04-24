<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AMonthPickerCellProps extends APrimitiveProps {
  /** The date value for the cell */
  date: DateValue;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAMonthPickerRootContext } from './month-picker-root.vue';

defineOptions({ name: 'AMonthPickerCell' });

withDefaults(defineProps<AMonthPickerCellProps>(), { as: 'td' });
const rootContext = injectAMonthPickerRootContext();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isMonthSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isMonthDisabled(date) || rootContext.isMonthUnavailable?.(date)"
    :data-disabled="rootContext.isMonthDisabled(date) ? '' : undefined"
  >
    <slot />
  </APrimitive>
</template>
