<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerHeadingProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAYearRangePickerRootContext } from './year-range-picker-root.vue';

const props = withDefaults(
  defineProps<AYearRangePickerHeadingProps>(),
  { as: 'div' },
);

defineSlots<{
  default?: (props: {
    /** Current year range heading */
    headingValue: string;
  }) => any;
}>();

const rootContext = injectAYearRangePickerRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="rootContext.headingId"
    role="heading"
    aria-level="2"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
  >
    <slot :heading-value="rootContext.headingValue.value">
      {{ rootContext.headingValue.value }}
    </slot>
  </APrimitive>
</template>
