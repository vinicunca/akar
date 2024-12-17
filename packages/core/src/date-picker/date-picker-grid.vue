<script lang="ts">
import { ACalendarGrid, type ACalendarGridProps } from '..';

export interface ADatePickerGridProps extends ACalendarGridProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerGridProps>();
</script>

<template>
  <ACalendarGrid v-bind="props">
    <slot />
  </ACalendarGrid>
</template>
