<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '~~/primitive';

export interface ARangeCalendarNextProps extends APrimitiveProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the `range-calendar-root`. */
  nextPage?: (placeholder: DateValue) => DateValue;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

const props = withDefaults(defineProps<ARangeCalendarNextProps>(), { as: 'button' });
const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));

const rootContext = injectARangeCalendarRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="Next page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.nextPage(props.nextPage)"
  >
    <slot>Next page</slot>
  </APrimitive>
</template>
