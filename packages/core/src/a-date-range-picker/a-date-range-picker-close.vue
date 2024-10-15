<script lang="ts">
import { APopoverClose, type APopoverCloseProps } from '~~/a-popover';

export interface ADateRangePickerCloseProps extends APopoverCloseProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerCloseProps>();
</script>

<template>
  <APopoverClose v-bind="props">
    <slot />
  </APopoverClose>
</template>
