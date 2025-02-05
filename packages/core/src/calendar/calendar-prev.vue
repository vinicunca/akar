<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '~~/primitive';

export interface ACalendarPrevProps extends APrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `ACalendarRoot`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface CalendarPrevSlot {
  default: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectACalendarRootContext } from './calendar-root.vue';

const props = withDefaults(defineProps<ACalendarPrevProps>(), { as: 'button', step: 'month' });

defineSlots<CalendarPrevSlot>();

const disabled = computed(() =>
  rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage),
);

const rootContext = injectACalendarRootContext();
</script>

<template>
  <APrimitive
    aria-label="Previous page"
    :as="props.as"
    :as-child="props.asChild"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.prevPage(props.prevPage)"
  >
    <slot :disabled>
      Prev page
    </slot>
  </APrimitive>
</template>
