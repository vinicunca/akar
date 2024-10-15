<script lang="ts">
import { APopoverArrow, type APopoverArrowProps } from '~~/a-popover';

export interface ADateRangePickerArrowProps extends APopoverArrowProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerArrowProps>();
</script>

<template>
  <APopoverArrow v-bind="props">
    <slot />
  </APopoverArrow>
</template>
