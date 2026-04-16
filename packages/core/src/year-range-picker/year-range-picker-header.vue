<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearRangePickerHeaderProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = withDefaults(
  defineProps<AYearRangePickerHeaderProps>(),
  { as: 'div' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
