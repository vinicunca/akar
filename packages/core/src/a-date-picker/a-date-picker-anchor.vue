<script lang="ts">
import type { APopoverAnchorProps } from '~~/a-popover';

export interface ADatePickerAnchorProps extends APopoverAnchorProps {}
</script>

<script setup lang="ts">
import { APopoverAnchor } from '~~/a-popover';

const props = defineProps<ADatePickerAnchorProps>();
</script>

<template>
  <APopoverAnchor v-bind="props">
    <slot />
  </APopoverAnchor>
</template>
