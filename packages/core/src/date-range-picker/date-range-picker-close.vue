<script lang="ts">
import { APopoverClose, type APopoverCloseProps } from '..';

export interface DateRangePickerCloseProps extends APopoverCloseProps {}
</script>

<script setup lang="ts">
const props = defineProps<DateRangePickerCloseProps>();
</script>

<template>
  <APopoverClose v-bind="props">
    <slot />
  </APopoverClose>
</template>
