<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AScrollAreaCornerProps extends APrimitiveProps {}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

import { useForwardExpose } from '~~/shared';

import AScrollAreaCornerImpl from './a-scroll-area-corner-impl.vue';
import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';

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
  <AScrollAreaCornerImpl
    v-if="hasCorner"
    v-bind="props"
    :ref="forwardRef"
  >
    <slot />
  </AScrollAreaCornerImpl>
</template>
