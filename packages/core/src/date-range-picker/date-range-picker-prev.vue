<script lang="ts">
import { ARangeCalendarPrev, type ARangeCalendarPrevProps } from '..';

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
