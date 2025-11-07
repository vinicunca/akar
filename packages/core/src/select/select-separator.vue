<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ASelectSeparatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<ASelectSeparatorProps>();
</script>

<template>
  <APrimitive
    aria-hidden="true"
    v-bind="props"
  >
    <slot />
  </APrimitive>
</template>
