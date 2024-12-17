<script lang="ts">
import { ACalendarGridRow, type ACalendarGridRowProps } from '..';

export interface ADatePickerGridRowProps extends ACalendarGridRowProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerGridRowProps>();
</script>

<template>
  <ACalendarGridRow v-bind="props">
    <slot />
  </ACalendarGridRow>
</template>
