<script lang="ts">
import type { ACalendarHeaderProps } from '~~/a-calendar';

export interface ADatePickerHeaderProps extends ACalendarHeaderProps {}
</script>

<script setup lang="ts">
import { ACalendarHeader } from '~~/a-calendar';

const props = defineProps<ADatePickerHeaderProps>();
</script>

<template>
  <ACalendarHeader v-bind="props">
    <slot />
  </ACalendarHeader>
</template>
