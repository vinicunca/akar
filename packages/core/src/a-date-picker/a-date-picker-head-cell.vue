<script lang="ts">
import type { ACalendarHeadCellProps } from '~~/a-calendar';

export interface ADatePickerHeadCellProps extends ACalendarHeadCellProps {}
</script>

<script setup lang="ts">
import { ACalendarHeadCell } from '~~/a-calendar';

const props = defineProps<ADatePickerHeadCellProps>();
</script>

<template>
  <ACalendarHeadCell v-bind="props">
    <slot />
  </ACalendarHeadCell>
</template>
