<script lang="ts">
import type { AListboxItemIndicatorProps } from '../listbox';

export interface AColorSwatchPickerItemIndicatorProps extends AListboxItemIndicatorProps { }
</script>

<script setup lang="ts">
import { AListboxItemIndicator } from '../listbox';

const props = defineProps<AColorSwatchPickerItemIndicatorProps>();
</script>

<template>
  <AListboxItemIndicator v-bind="props">
    <slot />
  </AListboxItemIndicator>
</template>
