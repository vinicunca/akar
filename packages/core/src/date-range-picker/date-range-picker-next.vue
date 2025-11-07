<script lang="ts">
import type { RangeCalendarNextSlot } from '../range-calendar/range-calendar-next.vue';
import type { ARangeCalendarNextProps } from '..';
import { ARangeCalendarNext } from '..';

export interface ADateRangePickerNextProps extends ARangeCalendarNextProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerNextProps>();

defineSlots<RangeCalendarNextSlot>();
</script>

<template>
  <ARangeCalendarNext
    v-slot="slotProps "
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </ARangeCalendarNext>
</template>
