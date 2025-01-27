<script lang="ts">
import type { APopoverCloseProps } from '..';
import { APopoverClose } from '..';

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
