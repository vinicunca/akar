<script lang="ts">
import type { ARangeCalendarHeaderProps } from '..';
import { ARangeCalendarHeader } from '..';

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
