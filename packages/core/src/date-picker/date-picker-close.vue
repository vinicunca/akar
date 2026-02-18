<script lang="ts">
import type { APopoverCloseProps } from '../popover';
import { APopoverClose } from '../popover';

export interface ADatePickerCloseProps extends APopoverCloseProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerCloseProps>();
</script>

<template>
  <APopoverClose v-bind="props">
    <slot />
  </APopoverClose>
</template>
