<script lang="ts">
import type { ACalendarGridHeadProps } from '~~/a-calendar';

export interface ADatePickerGridHeadProps extends ACalendarGridHeadProps {}
</script>

<script setup lang="ts">
import { ACalendarGridHead } from '~~/a-calendar';

const props = defineProps<ADatePickerGridHeadProps>();
</script>

<template>
  <ACalendarGridHead v-bind="props">
    <slot />
  </ACalendarGridHead>
</template>
