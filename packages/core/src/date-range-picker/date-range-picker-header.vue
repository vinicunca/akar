<script lang="ts">
import { ARangeCalendarHeader, type ARangeCalendarHeaderProps } from '..';

export interface ADateRangePickerHeaderProps extends ARangeCalendarHeaderProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerHeaderProps>();
</script>

<template>
  <ARangeCalendarHeader v-bind="props">
    <slot />
  </ARangeCalendarHeader>
</template>
