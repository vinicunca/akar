<script lang="ts">
import type { ACalendarGridHeadProps } from '..';
import { ACalendarGridHead } from '..';

export interface ADatePickerGridHeadProps extends ACalendarGridHeadProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerGridHeadProps>();
</script>

<template>
  <ACalendarGridHead v-bind="props">
    <slot />
  </ACalendarGridHead>
</template>
