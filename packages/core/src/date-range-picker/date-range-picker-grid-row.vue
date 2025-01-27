<script lang="ts">
import type { ARangeCalendarGridRowProps } from '..';
import { ARangeCalendarGridRow } from '..';

export interface ADateRangePickerGridRowProps extends ARangeCalendarGridRowProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerGridRowProps>();
</script>

<template>
  <ARangeCalendarGridRow v-bind="props">
    <slot />
  </ARangeCalendarGridRow>
</template>
