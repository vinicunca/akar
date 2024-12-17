<script lang="ts">
import { APopoverTrigger, type APopoverTriggerProps } from '..';
import { injectADateRangePickerRootContext } from './date-range-picker-root.vue';

export interface ADateRangePickerTriggerProps extends APopoverTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerTriggerProps>();
const rootContext = injectADateRangePickerRootContext();
</script>

<template>
  <APopoverTrigger
    data-akar-date-field-segment="trigger"
    v-bind="props"
    :disabled="rootContext.disabled.value"
    @focusin="(event: FocusEvent) => {
      rootContext.dateFieldRef.value?.setFocusedElement(event.target as HTMLElement)
    }"
  >
    <slot />
  </APopoverTrigger>
</template>
