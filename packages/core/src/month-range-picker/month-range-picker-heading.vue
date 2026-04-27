<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerHeadingProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAMonthRangePickerRootContext } from './month-range-picker-root.vue';

defineOptions({ name: 'AMonthRangePickerHeading' });

const props = withDefaults(
  defineProps<AMonthRangePickerHeadingProps>(),
  { as: 'div' },
);

defineSlots<{
  default?: (props: {
    /** Current year heading */
    headingValue: string;
  }) => any;
}>();

const rootContext = injectAMonthRangePickerRootContext();
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
