<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface ARangeCalendarPrevProps extends APrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `range-calendar-root`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface RangeCalendarPrevSlot {
  default?: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

defineOptions({ name: 'ARangeCalendarPrev' });

const props = withDefaults(defineProps<ARangeCalendarPrevProps>(), { as: 'button' });

defineSlots<RangeCalendarPrevSlot>();

const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));

const rootContext = injectARangeCalendarRootContext();

function handleClick() {
  if (disabled.value) {
    return;
  }

  rootContext.prevPage(props.prevPage);
}
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    aria-label="Previous page"
    :type="props.as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :disabled>
      Prev page
    </slot>
  </APrimitive>
</template>
