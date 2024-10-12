<script lang="ts">
import type { APopoverTriggerProps } from '~~/a-popover';

export interface ADatePickerTriggerProps extends APopoverTriggerProps {}
</script>

<script setup lang="ts">
import { APopoverTrigger } from '~~/a-popover';

import { injectADatePickerRootContext } from './a-date-picker-root.vue';

const props = defineProps<ADatePickerTriggerProps>();
const rootContext = injectADatePickerRootContext();
</script>

<template>
  <APopoverTrigger
    data-reka-date-field-segment="trigger"
    v-bind="props"
    :disabled="rootContext.disabled.value"
    @focusin="(e: FocusEvent) => {
      rootContext.dateFieldRef.value?.setFocusedElement(e.target as HTMLElement)
    }"
  >
    <slot />
  </APopoverTrigger>
</template>
