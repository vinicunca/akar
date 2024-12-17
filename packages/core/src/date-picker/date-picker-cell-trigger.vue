<script lang="ts">
import { ACalendarCellTrigger, type ACalendarCellTriggerProps } from '~~/calendar';

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
