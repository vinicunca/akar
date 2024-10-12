<script lang="ts">
import type { ACalendarHeadingProps } from '~~/a-calendar';

export interface ADatePickerHeadingProps extends ACalendarHeadingProps {}
</script>

<script setup lang="ts">
import { ACalendarHeading } from '~~/a-calendar';

const props = defineProps<ADatePickerHeadingProps>();

defineSlots<{
  default: (props: {
    /** Current month and year */
    headingValue: string;
  }) => any;
}>();
</script>

<template>
  <ACalendarHeading
    v-slot="{ headingValue }"
    v-bind="props"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </ACalendarHeading>
</template>
