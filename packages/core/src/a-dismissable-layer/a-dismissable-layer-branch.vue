<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { useForwardExpose } from '~~/shared';

export interface ADismissableLayerBranchProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { APrimitive } from '~~/a-primitive';

import { context } from './a-dismissable-layer.vue';

const props = defineProps<ADismissableLayerBranchProps>();

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
