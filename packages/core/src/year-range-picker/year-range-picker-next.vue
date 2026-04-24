<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerNextProps extends APrimitiveProps {
  /** The function to be used for the next page. Overwrites the `nextPage` function set on the Root. */
  nextPage?: (placeholder: DateValue) => DateValue;
}

export interface YearRangePickerNextSlot {
  default?: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAYearRangePickerRootContext } from './year-range-picker-root.vue';

defineOptions({ name: 'AYearRangePickerNext' });

const props = withDefaults(
  defineProps<AYearRangePickerNextProps>(),
  { as: 'button' },
);
defineSlots<YearRangePickerNextSlot>();

const rootContext = injectAYearRangePickerRootContext();

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
    aria-label="Next page"
    :type="props.as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :disabled>
      Next page
    </slot>
  </APrimitive>
</template>
