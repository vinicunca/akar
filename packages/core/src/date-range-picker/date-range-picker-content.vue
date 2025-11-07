<script lang="ts">
import type { APopoverContentEmits, APopoverContentProps, APopoverPortalProps } from '..';
import { APopoverContent, APopoverPortal, useForwardPropsEmits } from '..';

export interface ADateRangePickerContentProps extends APopoverContentProps {
  /**
   * Props to control the portal wrapped around the content.
   */
  portal?: APopoverPortalProps;
}
export interface ADateRangePickerContentEmits extends APopoverContentEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { handleCalendarInitialFocus } from '../shared/date';

const props = defineProps<ADateRangePickerContentProps>();
const emits = defineEmits<ADateRangePickerContentEmits>();

const propsToForward = computed(() => ({
  ...props,
  portal: undefined,
}));

const forwarded = useForwardPropsEmits(propsToForward, emits);

function handleOpenFocus(event: Event) {
  emits('openAutoFocus', event);

  if (!event.defaultPrevented && event.target) {
    handleCalendarInitialFocus(event.target as HTMLElement);
    event.preventDefault();
  }
}
</script>

<template>
  <APopoverPortal>
    <APopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      @open-auto-focus="handleOpenFocus"
    >
      <slot />
    </APopoverContent>
  </APopoverPortal>
</template>
