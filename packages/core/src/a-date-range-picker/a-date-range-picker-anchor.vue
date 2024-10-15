<script lang="ts">
import { APopoverAnchor, type APopoverAnchorProps } from '~~/a-popover';

export interface ADateRangePickerAnchorProps extends APopoverAnchorProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerAnchorProps>();
</script>

<template>
  <APopoverAnchor v-bind="props">
    <slot />
  </APopoverAnchor>
</template>
