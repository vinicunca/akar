<script lang="ts">
import type { APopoverArrowProps } from '~~/a-popover';

export interface ADatePickerArrowProps extends APopoverArrowProps {}
</script>

<script setup lang="ts">
import { APopoverArrow } from '~~/a-popover';

const props = defineProps<ADatePickerArrowProps>();
</script>

<template>
  <APopoverArrow v-bind="props">
    <slot />
  </APopoverArrow>
</template>
