<script lang="ts">
import { ACalendarHeadCell, type ACalendarHeadCellProps } from '..';

export interface ADatePickerHeadCellProps extends ACalendarHeadCellProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerHeadCellProps>();
</script>

<template>
  <ACalendarHeadCell v-bind="props">
    <slot />
  </ACalendarHeadCell>
</template>
