<script lang="ts">
import type { APopoverCloseProps } from '..';
import { APopoverClose } from '..';

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
