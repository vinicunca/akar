<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthPickerGridProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAMonthPickerRootContext } from './month-picker-root.vue';

const props = withDefaults(
  defineProps<AMonthPickerGridProps>(),
  { as: 'table' },
);

const rootContext = injectAMonthPickerRootContext();
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
