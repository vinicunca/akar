<script lang="ts">
import type { ACalendarGridProps } from '~~/a-calendar';

export interface ADatePickerGridProps extends ACalendarGridProps {}
</script>

<script setup lang="ts">
import { ACalendarGrid } from '~~/a-calendar';

const props = defineProps<ADatePickerGridProps>();
</script>

<template>
  <ACalendarGrid v-bind="props">
    <slot />
  </ACalendarGrid>
</template>
