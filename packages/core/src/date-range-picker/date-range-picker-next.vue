<script lang="ts">
import { ARangeCalendarNext, type ARangeCalendarNextProps } from '..';

export interface ADateRangePickerNextProps extends ARangeCalendarNextProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerNextProps>();
</script>

<template>
  <ARangeCalendarNext v-bind="props">
    <slot />
  </ARangeCalendarNext>
</template>
