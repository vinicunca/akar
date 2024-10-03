<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AMenuGroupProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

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
