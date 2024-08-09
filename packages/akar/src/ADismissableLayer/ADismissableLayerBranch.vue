<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

import { useForwardExpose } from '~~/shared';

export interface ADismissableLayerBranchProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { APrimitive } from '~~/APrimitive';

import { context } from './ADismissableLayer.vue';

const props = defineProps<ADismissableLayerBranchProps>();

const { currentElement, forwardRef } = useForwardExpose();
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
