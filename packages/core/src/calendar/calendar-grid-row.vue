<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ACalendarGridRowProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ACalendarGridRowProps>(), { as: 'tr' });
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
