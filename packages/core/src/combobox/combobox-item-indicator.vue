<script lang="ts">
import type { AListboxItemIndicatorProps } from '../listbox';

export interface AComboboxItemIndicatorProps extends AListboxItemIndicatorProps {}
</script>

<script setup lang="ts">
import { AListboxItemIndicator } from '../listbox';

const props = withDefaults(defineProps<AComboboxItemIndicatorProps>(), {
  as: 'span',
});
</script>

<template>
  <AListboxItemIndicator
    v-bind="props"
  >
    <slot />
  </AListboxItemIndicator>
</template>
