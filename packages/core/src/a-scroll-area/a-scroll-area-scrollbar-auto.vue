<script lang="ts">
export interface AScrollAreaScrollbarAutoProps {
  forceMount?: boolean;
}
</script>

<script lang="ts" setup>
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { APresence } from '~~/a-presence';
import { useForwardExpose } from '~~/shared';

import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';
import { injectAScrollAreaScrollbarContext } from './a-scroll-area-scrollbar.vue';
import AScrollAreaScrollbarVisible from './a-scroll-area-scrollbar-visible.vue';

defineProps<AScrollAreaScrollbarAutoProps>();

const rootContext = injectAScrollAreaRootContext();
const scrollbarContext = injectAScrollAreaScrollbarContext();

const { forwardRef } = useForwardExpose();

const visible = ref(false);

const handleResize = useDebounceFn(() => {
  if (rootContext.viewport.value) {
    const isOverflowX
      = rootContext.viewport.value.offsetWidth
      < rootContext.viewport.value.scrollWidth;
    const isOverflowY
      = rootContext.viewport.value.offsetHeight
      < rootContext.viewport.value.scrollHeight;

    visible.value = scrollbarContext.isHorizontal.value
      ? isOverflowX
      : isOverflowY;
  }
}, 10);

onMounted(() => {
  handleResize();
});

useResizeObserver(rootContext.viewport, handleResize);
useResizeObserver(rootContext.content, handleResize);
</script>

<template>
  <APresence :present="forceMount || visible">
    <AScrollAreaScrollbarVisible
      v-bind="$attrs"
      :ref="forwardRef"
      :data-state="visible ? 'visible' : 'hidden'"
    >
      <slot />
    </AScrollAreaScrollbarVisible>
  </APresence>
</template>
