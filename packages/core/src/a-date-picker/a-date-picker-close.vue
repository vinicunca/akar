<script lang="ts">
import type { APopoverCloseProps } from '~~/a-popover';

export interface ADatePickerCloseProps extends APopoverCloseProps {}
</script>

<script setup lang="ts">
import { APopoverClose } from '~~/a-popover';

const props = defineProps<ADatePickerCloseProps>();
</script>

<template>
  <APopoverClose v-bind="props">
    <slot />
  </APopoverClose>
</template>
