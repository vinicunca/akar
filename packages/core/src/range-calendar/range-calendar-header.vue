<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ARangeCalendarHeaderProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ARangeCalendarHeaderProps>(), { as: 'div' });
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
