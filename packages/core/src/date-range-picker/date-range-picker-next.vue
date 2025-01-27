<script lang="ts">
import type { ARangeCalendarNextProps } from '..';
import { ARangeCalendarNext } from '..';

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
