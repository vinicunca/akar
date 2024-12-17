<script lang="ts">
import { ACalendarGridHead, type ACalendarGridHeadProps } from '..';

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
