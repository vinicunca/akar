<script lang="ts">
import { APopoverClose, type APopoverCloseProps } from '~~/popover';

export interface DatePickerCloseProps extends APopoverCloseProps {}
</script>

<script setup lang="ts">
const props = defineProps<DatePickerCloseProps>();
</script>

<template>
  <APopoverClose v-bind="props">
    <slot />
  </APopoverClose>
</template>
