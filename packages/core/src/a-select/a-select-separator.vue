<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ASelectSeparatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

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
