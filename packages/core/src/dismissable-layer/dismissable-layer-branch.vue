<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface DismissableLayerBranchProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { APrimitive } from '../primitive';
import { context } from './dismissable-layer.vue';

const props = defineProps<DismissableLayerBranchProps>();

const { forwardRef, currentElement } = useForwardExpose();
onMounted(() => {
  context.branches.add(currentElement.value);
});
onUnmounted(() => {
  context.branches.delete(currentElement.value);
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    v-bind="props"
  >
    <slot />
  </APrimitive>
</template>
