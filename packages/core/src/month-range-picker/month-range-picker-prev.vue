<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerPrevProps extends APrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the Root. */
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface AMonthRangePickerPrevSlot {
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

defineOptions({ name: 'AMonthRangePickerPrev' });

const props = withDefaults(
  defineProps<AMonthRangePickerPrevProps>(),
  { as: 'button' },
);
defineSlots<AMonthRangePickerPrevSlot>();

const rootContext = injectAMonthRangePickerRootContext();

const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));

function handleClick() {
  if (disabled.value) {
    return;
  }
  rootContext.prevPage(props.prevPage);
}
</script>

<template>
  <APrimitive
    aria-label="Previous year"
    :as="props.as"
    :as-child="props.asChild"
    :type="props.as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :disabled>
      Prev year
    </slot>
  </APrimitive>
</template>
