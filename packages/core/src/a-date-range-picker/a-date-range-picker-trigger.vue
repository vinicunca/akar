<script lang="ts">
import { APopoverTrigger, type APopoverTriggerProps } from '~~/a-popover';

import { injectADateRangePickerRootContext } from './a-date-range-picker-root.vue';

export interface ADateRangePickerTriggerProps extends APopoverTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerTriggerProps>();
const rootContext = injectADateRangePickerRootContext();

function handleFocusin(event: FocusEvent) {
  rootContext.dateFieldRef.value?.setFocusedElement(event.target as HTMLElement);
}
</script>

<template>
  <APopoverTrigger
    data-akar-date-field-segment="trigger"
    v-bind="props"
    :disabled="rootContext.disabled.value"
    @focusin="handleFocusin"
  >
    <slot />
  </APopoverTrigger>
</template>
