<script lang="ts">
import type { APopoverAnchorProps } from '../popover';
import { APopoverAnchor } from '../popover';

export interface ADatePickerAnchorProps extends APopoverAnchorProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerAnchorProps>();
</script>

<template>
  <APopoverAnchor v-bind="props">
    <slot />
  </APopoverAnchor>
</template>
