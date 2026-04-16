<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerGridProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAYearRangePickerRootContext } from './year-range-picker-root.vue';

const props = withDefaults(
  defineProps<AYearRangePickerGridProps>(),
  { as: 'table' },
);

const rootContext = injectAYearRangePickerRootContext();
const disabled = computed(() => rootContext.disabled.value ? true : undefined);
const readonly = computed(() => rootContext.readonly.value ? true : undefined);
</script>

<template>
  <APrimitive
    v-bind="props"
    tabindex="-1"
    role="application"
    :aria-labelledby="rootContext.headingId"
    :aria-readonly="readonly"
    :aria-disabled="disabled"
    :data-readonly="readonly && ''"
    :data-disabled="disabled && ''"
  >
    <slot />
  </APrimitive>
</template>
