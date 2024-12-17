<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '~~/primitive';

export interface ARangeCalendarPrevProps extends APrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `range-calendar-root`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

const props = withDefaults(defineProps<ARangeCalendarPrevProps>(), { as: 'button' });
const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));

const rootContext = injectARangeCalendarRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="Previous page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.prevPage(props.prevPage)"
  >
    <slot>Prev page</slot>
  </APrimitive>
</template>
