<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ARangeCalendarGridProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectARangeCalendarRootContext } from './range-calendar-root.vue';

const props = withDefaults(defineProps<ARangeCalendarGridProps>(), { as: 'table' });

const rootContext = injectARangeCalendarRootContext();

const disabled = computed(() => rootContext.disabled.value ? true : undefined);
const readonly = computed(() => rootContext.readonly.value ? true : undefined);
</script>

<template>
  <APrimitive
    v-bind="props"
    tabindex="-1"
    role="grid"
    :aria-readonly="readonly"
    :aria-disabled="disabled"
    :data-readonly="readonly && ''"
    :data-disabled="disabled && ''"
  >
    <slot />
  </APrimitive>
</template>
