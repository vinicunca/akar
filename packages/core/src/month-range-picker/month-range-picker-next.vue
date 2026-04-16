<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerNextProps extends APrimitiveProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the Root. */
  nextPage?: (placeholder: DateValue) => DateValue;
}

export interface AMonthRangePickerNextSlot {
  default?: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAMonthRangePickerRootContext } from './month-range-picker-root.vue';

const props = withDefaults(
  defineProps<AMonthRangePickerNextProps>(),
  { as: 'button' },
);
defineSlots<AMonthRangePickerNextSlot>();

const rootContext = injectAMonthRangePickerRootContext();

const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));

function handleClick() {
  if (disabled.value) {
    return;
  }
  rootContext.nextPage(props.nextPage);
}
</script>

<template>
  <APrimitive
    :as="props.as"
    :as-child="props.asChild"
    aria-label="Next year"
    :type="props.as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :disabled>
      Next year
    </slot>
  </APrimitive>
</template>
