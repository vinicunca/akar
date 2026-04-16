<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AMonthPickerPrevProps extends APrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `AMonthPickerRoot`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface AMonthPickerPrevSlot {
  default?: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAMonthPickerRootContext } from './month-picker-root.vue';

const props = withDefaults(
  defineProps<AMonthPickerPrevProps>(),
  { as: 'button' },
);
defineSlots<AMonthPickerPrevSlot>();

const rootContext = injectAMonthPickerRootContext();

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
