<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthRangePickerGridBodyProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AMonthRangePickerGridBody' });

const props = withDefaults(
  defineProps<AMonthRangePickerGridBodyProps>(),
  { as: 'tbody' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
