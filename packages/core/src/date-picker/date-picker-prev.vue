<script lang="ts">
import type { ACalendarPrevProps } from '..';
import { ACalendarPrev } from '..';

export interface ADatePickerPrevProps extends ACalendarPrevProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerPrevProps>();
</script>

<template>
  <ACalendarPrev v-bind="props">
    <slot />
  </ACalendarPrev>
</template>
