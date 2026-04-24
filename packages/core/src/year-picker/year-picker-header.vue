<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AYearPickerHeaderProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AYearPickerHeader' });

const props = withDefaults(
  defineProps<AYearPickerHeaderProps>(),
  { as: 'div' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
