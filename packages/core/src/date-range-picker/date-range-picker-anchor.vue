<script lang="ts">
import { APopoverAnchor, type APopoverAnchorProps } from '..';

export interface DateRangePickerAnchorProps extends APopoverAnchorProps {}
</script>

<script setup lang="ts">
const props = defineProps<DateRangePickerAnchorProps>();
</script>

<template>
  <APopoverAnchor v-bind="props">
    <slot />
  </APopoverAnchor>
</template>
