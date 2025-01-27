<script lang="ts">
import type { APopoverTriggerProps } from '..';
import { APopoverTrigger } from '..';
import { injectADatePickerRootContext } from './date-picker-root.vue';

export interface ADatePickerTriggerProps extends APopoverTriggerProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerTriggerProps>();
const rootContext = injectADatePickerRootContext();
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
