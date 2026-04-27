<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ACalendarGridHeadProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineOptions({ name: 'ACalendarGridHead' });

const props = withDefaults(defineProps<ACalendarGridHeadProps>(), { as: 'thead' });
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-hidden="true"
  >
    <slot />
  </APrimitive>
</template>
