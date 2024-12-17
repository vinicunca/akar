<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AMenuGroupProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = defineProps<AMenuGroupProps>();
</script>

<template>
  <APrimitive
    role="group"
    v-bind="props"
  >
    <slot />
  </APrimitive>
</template>
