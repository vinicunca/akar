<script lang="ts">
import type { ACalendarCellTriggerProps } from '~~/a-calendar';

export interface ADatePickerCellTriggerProps extends ACalendarCellTriggerProps {}
</script>

<script setup lang="ts">
import { ACalendarCellTrigger } from '~~/a-calendar';

const props = defineProps<ADatePickerCellTriggerProps>();
</script>

<template>
  <ACalendarCellTrigger v-bind="props">
    <slot />
  </ACalendarCellTrigger>
</template>
