<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACalendarHeaderProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

const props = withDefaults(
  defineProps<ACalendarHeaderProps>(),
  { as: 'div' },
);
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
