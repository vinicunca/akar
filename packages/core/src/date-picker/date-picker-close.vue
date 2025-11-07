<script lang="ts">
import type { APopoverCloseProps } from '../popover';
import { APopoverClose } from '../popover';

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
