<script lang="ts">
import { ARangeCalendarGridHead, type ARangeCalendarGridHeadProps } from '~~/a-range-calendar';

export interface ADateRangePickerGridHeadProps extends ARangeCalendarGridHeadProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerGridHeadProps>();
</script>

<template>
  <ARangeCalendarGridHead v-bind="props">
    <slot />
  </ARangeCalendarGridHead>
</template>
