<script lang="ts">
import type { ARangeCalendarGridBodyProps } from '..';
import { ARangeCalendarGridBody } from '..';

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
