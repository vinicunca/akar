<script lang="ts">
import type { APopoverArrowProps } from '..';
import { APopoverArrow } from '..';

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
