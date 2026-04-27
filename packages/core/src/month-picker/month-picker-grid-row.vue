<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthPickerGridRowProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AMonthPickerGridRow' });

const props = withDefaults(
  defineProps<AMonthPickerGridRowProps>(),
  { as: 'tr' },
);
</script>

<template>
  <APrimitive
    v-bind="props"
    role="row"
  >
    <slot />
  </APrimitive>
</template>
