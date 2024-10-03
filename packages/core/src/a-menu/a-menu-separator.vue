<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AMenuSeparatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

const props = defineProps<AMenuSeparatorProps>();
</script>

<template>
  <APrimitive
    v-bind="props"
    role="separator"
    aria-orientation="horizontal"
  >
    <slot />
  </APrimitive>
</template>
