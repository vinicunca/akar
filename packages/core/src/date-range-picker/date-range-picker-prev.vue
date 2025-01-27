<script lang="ts">
import type { ARangeCalendarPrevProps } from '..';
import { ARangeCalendarPrev } from '..';

export interface ADateRangePickerPrevProps extends ARangeCalendarPrevProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerPrevProps>();
</script>

<template>
  <ARangeCalendarPrev v-bind="props">
    <slot />
  </ARangeCalendarPrev>
</template>
