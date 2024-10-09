<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AComboboxSeparatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

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
