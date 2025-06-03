<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ARangeCalendarHeadingProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

const props = withDefaults(defineProps<ARangeCalendarHeadingProps>(), { as: 'div' });
defineSlots<{
  default?: (props: {
    /** Current month and year */
    headingValue: string;
  }) => any;
}>();
const rootContext = injectARangeCalendarRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
  >
    <slot :heading-value="rootContext.headingValue.value">
      {{ rootContext.headingValue.value }}
    </slot>
  </APrimitive>
</template>
