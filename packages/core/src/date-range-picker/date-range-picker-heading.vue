<script lang="ts">
import type { ARangeCalendarHeadingProps } from '..';
import { ARangeCalendarHeading } from '..';

export interface ADateRangePickerHeadingProps extends ARangeCalendarHeadingProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerHeadingProps>();
defineSlots<{
  default?: (props: {
    /** Current month and year */
    headingValue: string;
  }) => any;
}>();
</script>

<template>
  <ARangeCalendarHeading
    v-slot="{ headingValue }"
    v-bind="props"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </ARangeCalendarHeading>
</template>
