<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface MonthPickerGridBodyProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AMonthPickerGridBody' });

const props = withDefaults(
  defineProps<MonthPickerGridBodyProps>(),
  { as: 'tbody' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
