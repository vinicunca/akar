<script lang="ts">
import { ACalendarPrev, type ACalendarPrevProps } from '..';

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
