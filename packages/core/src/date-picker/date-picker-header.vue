<script lang="ts">
import { ACalendarHeader, type ACalendarHeaderProps } from '..';

export interface ADatePickerHeaderProps extends ACalendarHeaderProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerHeaderProps>();
</script>

<template>
  <ACalendarHeader v-bind="props">
    <slot />
  </ACalendarHeader>
</template>
