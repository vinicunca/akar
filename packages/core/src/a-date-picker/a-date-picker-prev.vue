<script lang="ts">
import type { ACalendarPrevProps } from '~~/a-calendar';

export interface ADatePickerPrevProps extends ACalendarPrevProps {}
</script>

<script setup lang="ts">
import { ACalendarPrev } from '~~/a-calendar';

const props = defineProps<ADatePickerPrevProps>();
</script>

<template>
  <ACalendarPrev v-bind="props">
    <slot />
  </ACalendarPrev>
</template>
