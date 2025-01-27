<script lang="ts">
import type { APopoverAnchorProps } from '~~/popover';
import { APopoverAnchor } from '~~/popover';

export interface DatePickerAnchorProps extends APopoverAnchorProps {}
</script>

<script setup lang="ts">
const props = defineProps<DatePickerAnchorProps>();
</script>

<template>
  <APopoverAnchor v-bind="props">
    <slot />
  </APopoverAnchor>
</template>
