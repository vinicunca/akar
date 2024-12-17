<script lang="ts">
import { ACalendarNext, type ACalendarNextProps } from '..';

export interface ADatePickerNextProps extends ACalendarNextProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerNextProps>();
</script>

<template>
  <ACalendarNext v-bind="props">
    <slot />
  </ACalendarNext>
</template>
