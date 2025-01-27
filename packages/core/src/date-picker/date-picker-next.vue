<script lang="ts">
import type { ACalendarNextProps } from '..';
import { ACalendarNext } from '..';

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
