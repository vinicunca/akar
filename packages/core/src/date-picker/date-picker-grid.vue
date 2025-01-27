<script lang="ts">
import type { ACalendarGridProps } from '..';
import { ACalendarGrid } from '..';

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
