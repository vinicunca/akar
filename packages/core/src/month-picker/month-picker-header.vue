<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface AMonthPickerHeaderProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'AMonthPickerHeader' });

const props = withDefaults(
  defineProps<AMonthPickerHeaderProps>(),
  { as: 'div' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
