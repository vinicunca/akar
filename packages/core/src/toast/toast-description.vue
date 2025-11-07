<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface AToastDescriptionProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

const props = defineProps<AToastDescriptionProps>();
useForwardExpose();
</script>

<template>
  <APrimitive v-bind="props">
    <slot />
  </APrimitive>
</template>
