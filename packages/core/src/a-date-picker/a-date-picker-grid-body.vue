<script lang="ts">
import type { ACalendarGridBodyProps } from '~~/a-calendar';

export interface ADatePickerGridBodyProps extends ACalendarGridBodyProps {}
</script>

<script setup lang="ts">
import { ACalendarGridBody } from '~~/a-calendar';

const props = defineProps<ADatePickerGridBodyProps>();
</script>

<template>
  <ACalendarGridBody v-bind="props">
    <slot />
  </ACalendarGridBody>
</template>
