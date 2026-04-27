<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerGridProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAMonthRangePickerRootContext } from './month-range-picker-root.vue';

defineOptions({ name: 'AMonthRangePickerGrid' });

const props = withDefaults(defineProps<AMonthRangePickerGridProps>(), { as: 'table' });

const rootContext = injectAMonthRangePickerRootContext();
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
