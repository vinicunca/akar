<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface AComboboxSeparatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<AComboboxSeparatorProps>();
useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-hidden="true"
  >
    <slot />
  </APrimitive>
</template>
