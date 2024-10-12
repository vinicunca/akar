<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACalendarGridHeadProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

const props = withDefaults(
  defineProps<ACalendarGridHeadProps>(),
  { as: 'thead' },
);
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-hidden="true"
  >
    <slot />
  </APrimitive>
</template>
