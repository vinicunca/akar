<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '~~/primitive';

export interface ACalendarNextProps extends APrimitiveProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the `ACalendarRoot`. */
  nextPage?: (placeholder: DateValue) => DateValue;
}

export interface CalendarNextSlot {
  default?: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectACalendarRootContext } from './calendar-root.vue';

const props = withDefaults(defineProps<ACalendarNextProps>(), { as: 'button', step: 'month' });

defineSlots<CalendarNextSlot>();

const disabled = computed(() =>
  rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage),
);

const rootContext = injectACalendarRootContext();
</script>

<template>
  <APrimitive
    :as="props.as"
    :as-child="props.asChild"
    aria-label="Next page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.nextPage(props.nextPage)"
  >
    <slot :disabled>
      Next page
    </slot>
  </APrimitive>
</template>
