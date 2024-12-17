<script lang="ts">
import { ACalendarGridBody, type ACalendarGridBodyProps } from '..';

export interface ADatePickerGridBodyProps extends ACalendarGridBodyProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerGridBodyProps>();
</script>

<template>
  <ACalendarGridBody v-bind="props">
    <slot />
  </ACalendarGridBody>
</template>
