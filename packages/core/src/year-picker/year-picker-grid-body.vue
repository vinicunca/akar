<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearPickerGridBodyProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = withDefaults(
  defineProps<AYearPickerGridBodyProps>(),
  { as: 'tbody' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
