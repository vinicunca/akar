<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerGridBodyProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AYearRangePickerGridBody' });

const props = withDefaults(
  defineProps<AYearRangePickerGridBodyProps>(),
  { as: 'tbody' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
