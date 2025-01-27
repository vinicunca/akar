<script lang="ts">
import type { ACalendarHeadCellProps } from '..';
import { ACalendarHeadCell } from '..';

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
