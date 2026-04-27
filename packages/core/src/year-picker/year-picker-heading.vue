<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearPickerHeadingProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAYearPickerRootContext } from './year-picker-root.vue';

defineOptions({ name: 'AYearPickerHeading' });

const props = withDefaults(
  defineProps<AYearPickerHeadingProps>(),
  { as: 'div' },
);

defineSlots<{
  default?: (props: {
    /** Current year range heading */
    headingValue: string;
  }) => any;
}>();

const rootContext = injectAYearPickerRootContext();
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
