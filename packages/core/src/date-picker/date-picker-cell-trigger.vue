<script lang="ts">
import type { ACalendarCellTriggerProps } from '~~/calendar';
import { ACalendarCellTrigger } from '~~/calendar';

export interface ADatePickerCellTriggerProps extends ACalendarCellTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerCellTriggerProps>();
</script>

<template>
  <ACalendarCellTrigger v-bind="props">
    <slot />
  </ACalendarCellTrigger>
</template>
