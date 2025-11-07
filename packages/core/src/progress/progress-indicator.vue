<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface AProgressIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';
import { injectAProgressRootContext } from './progress-root.vue';

const props = defineProps<AProgressIndicatorProps>();

const rootContext = injectAProgressRootContext();
useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    :data-state="rootContext.progressState.value"
    :data-value="rootContext.modelValue?.value ?? undefined"
    :data-max="rootContext.max.value"
  >
    <slot />
  </APrimitive>
</template>
