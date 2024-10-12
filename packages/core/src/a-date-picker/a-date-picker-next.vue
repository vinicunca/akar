<script lang="ts">
import type { ACalendarNextProps } from '~~/a-calendar';

export interface ADatePickerNextProps extends ACalendarNextProps {}
</script>

<script setup lang="ts">
import { ACalendarNext } from '~~/a-calendar';

const props = defineProps<ADatePickerNextProps>();
</script>

<template>
  <ACalendarNext v-bind="props">
    <slot />
  </ACalendarNext>
</template>
