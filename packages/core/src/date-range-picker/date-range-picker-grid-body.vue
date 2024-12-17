<script lang="ts">
import { ARangeCalendarGridBody, type ARangeCalendarGridBodyProps } from '..';

export interface ADateRangePickerGridBodyProps extends ARangeCalendarGridBodyProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerGridBodyProps>();
</script>

<template>
  <ARangeCalendarGridBody v-bind="props">
    <slot />
  </ARangeCalendarGridBody>
</template>
