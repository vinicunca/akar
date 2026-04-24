<script lang="ts">
import type { DateValue } from '@internationalized/date';
import type { APrimitiveProps } from '../primitive';

export interface AYearPickerPrevProps extends APrimitiveProps {
  /** The function to be used for the prev page. Overwrites the `prevPage` function set on the `AYearPickerRoot`. */
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface AYearPickerPrevSlot {
  default?: (props: {
    /** Current disable state */
    disabled: boolean;
  }) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAYearPickerRootContext } from './year-picker-root.vue';

defineOptions({ name: 'AYearPickerPrev' });

const props = withDefaults(
  defineProps<AYearPickerPrevProps>(),
  { as: 'button' },
);
defineSlots<AYearPickerPrevSlot>();

const rootContext = injectAYearPickerRootContext();

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
    aria-label="Previous page"
    :as="props.as"
    :as-child="props.asChild"
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
