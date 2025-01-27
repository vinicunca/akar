<script lang="ts">
import type { ACalendarGridBodyProps } from '..';
import { ACalendarGridBody } from '..';

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
