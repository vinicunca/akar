<script lang="ts">
import type { ACalendarCellProps } from '~~/a-calendar';

export interface ADatePickerCellProps extends ACalendarCellProps {}
</script>

<script setup lang="ts">
import { ACalendarCell } from '~~/a-calendar';

const props = defineProps<ADatePickerCellProps>();
</script>

<template>
  <ACalendarCell v-bind="props">
    <slot />
  </ACalendarCell>
</template>
