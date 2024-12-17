<script lang="ts">
import { APopoverArrow, type APopoverArrowProps } from '~~/popover';

export interface DatePickerArrowProps extends APopoverArrowProps {}
</script>

<script setup lang="ts">
const props = defineProps<DatePickerArrowProps>();
</script>

<template>
  <APopoverArrow v-bind="props">
    <slot />
  </APopoverArrow>
</template>
