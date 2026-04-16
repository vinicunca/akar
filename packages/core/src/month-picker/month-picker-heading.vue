<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthPickerHeadingProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAMonthPickerRootContext } from './month-picker-root.vue';

const props = withDefaults(
  defineProps<AMonthPickerHeadingProps>(),
  { as: 'div' },
);

defineSlots<{
  default?: (props: {
    /** Current year heading */
    headingValue: string;
  }) => any;
}>();

const rootContext = injectAMonthPickerRootContext();
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
