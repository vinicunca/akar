<script lang="ts">
import { APopoverArrow, type APopoverArrowProps } from '..';

export interface DateRangePickerArrowProps extends APopoverArrowProps {}
</script>

<script setup lang="ts">
const props = defineProps<DateRangePickerArrowProps>();
</script>

<template>
  <APopoverArrow v-bind="props">
    <slot />
  </APopoverArrow>
</template>
