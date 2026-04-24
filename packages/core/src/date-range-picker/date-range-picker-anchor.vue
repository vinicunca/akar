<script lang="ts">
import type { APopoverAnchorProps } from '..';
import { APopoverAnchor } from '..';

export interface ADateRangePickerAnchorProps extends APopoverAnchorProps {}
</script>

<script setup lang="ts">
defineOptions({ name: 'ADateRangePickerAnchor' });

const props = defineProps<ADateRangePickerAnchorProps>();
</script>

<template>
  <APopoverAnchor v-bind="props">
    <slot />
  </APopoverAnchor>
</template>
