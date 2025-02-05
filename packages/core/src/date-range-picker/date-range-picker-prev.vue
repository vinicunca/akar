<script lang="ts">
import type { RangeCalendarPrevSlot } from '~~/range-calendar/range-calendar-prev.vue';
import type { ARangeCalendarPrevProps } from '..';
import { ARangeCalendarPrev } from '..';

export interface ADateRangePickerPrevProps extends ARangeCalendarPrevProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerPrevProps>();

defineSlots<RangeCalendarPrevSlot>();
</script>

<template>
  <ARangeCalendarPrev
    v-slot="slotProps"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </ARangeCalendarPrev>
</template>
