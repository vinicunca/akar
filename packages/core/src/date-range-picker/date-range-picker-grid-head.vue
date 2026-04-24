<script lang="ts">
import type { ARangeCalendarGridHeadProps } from '..';
import { ARangeCalendarGridHead } from '..';

export interface ADateRangePickerGridHeadProps extends ARangeCalendarGridHeadProps {}
</script>

<script setup lang="ts">
defineOptions({ name: 'ADateRangePickerGridHead' });

const props = defineProps<ADateRangePickerGridHeadProps>();
</script>

<template>
  <ARangeCalendarGridHead v-bind="props">
    <slot />
  </ARangeCalendarGridHead>
</template>
