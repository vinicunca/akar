<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ARangeCalendarGridRowProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

const props = withDefaults(
  defineProps<ARangeCalendarGridRowProps>(),
  { as: 'tr' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
