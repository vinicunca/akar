<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearPickerGridProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { APrimitive } from '../primitive';
import { injectAYearPickerRootContext } from './year-picker-root.vue';

defineOptions({ name: 'AYearPickerGrid' });

const props = withDefaults(defineProps<AYearPickerGridProps>(), { as: 'table' });

const rootContext = injectAYearPickerRootContext();
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
