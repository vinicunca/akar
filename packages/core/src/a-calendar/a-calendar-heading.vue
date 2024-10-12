<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACalendarHeadingProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectACalendarRootContext } from './a-calendar-root.vue';

const props = withDefaults(defineProps<ACalendarHeadingProps>(), { as: 'div' });

defineSlots<{
  default: (props: {
    /** Current month and year */
    headingValue: string;
  }) => any;
}>();

const rootContext = injectACalendarRootContext();
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
