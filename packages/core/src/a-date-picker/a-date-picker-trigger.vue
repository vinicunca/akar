<script lang="ts">
import type { APopoverTriggerProps } from '~~/a-popover';

export interface ADatePickerTriggerProps extends APopoverTriggerProps {}
</script>

<script setup lang="ts">
import { APopoverTrigger } from '~~/a-popover';

import { injectADatePickerRootContext } from './a-date-picker-root.vue';

const props = defineProps<ADatePickerTriggerProps>();
const rootContext = injectADatePickerRootContext();

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
