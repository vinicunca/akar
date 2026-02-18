<script lang="ts">
import type { APopoverArrowProps } from '../popover';
import { APopoverArrow } from '../popover';

export interface ADatePickerArrowProps extends APopoverArrowProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerArrowProps>();
</script>

<template>
  <APopoverArrow v-bind="props">
    <slot />
  </APopoverArrow>
</template>
