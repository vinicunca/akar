<script lang="ts">
import type { ACalendarCellProps } from '~~/calendar';
import { ACalendarCell } from '~~/calendar';

export interface ADatePickerCellProps extends ACalendarCellProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerCellProps>();
</script>

<template>
  <ACalendarCell v-bind="props">
    <slot />
  </ACalendarCell>
</template>
