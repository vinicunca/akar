<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface AScrollAreaCornerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import ScrollAreaCornerImpl from './scroll-area-corner-impl.vue';
import { injectAScrollAreaRootContext } from './scroll-area-root.vue';

const props = defineProps<AScrollAreaCornerProps>();

const { forwardRef } = useForwardExpose();
const rootContext = injectAScrollAreaRootContext();

const hasBothScrollbarsVisible = computed(
  () => !!rootContext.scrollbarX.value && !!rootContext.scrollbarY.value,
);
const hasCorner = computed(
  () => rootContext.type.value !== 'scroll' && hasBothScrollbarsVisible.value,
);
</script>

<template>
  <ScrollAreaCornerImpl
    v-if="hasCorner"
    v-bind="props"
    :ref="forwardRef"
  >
    <slot />
  </ScrollAreaCornerImpl>
</template>
