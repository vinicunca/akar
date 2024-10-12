<script lang="ts">
import type { ACalendarGridRowProps } from '~~/a-calendar';

export interface ADatePickerGridRowProps extends ACalendarGridRowProps {}
</script>

<script setup lang="ts">
import { ACalendarGridRow } from '~~/a-calendar';

const props = defineProps<ADatePickerGridRowProps>();
</script>

<template>
  <ACalendarGridRow v-bind="props">
    <slot />
  </ACalendarGridRow>
</template>
