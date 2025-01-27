<script lang="ts">
export interface ScrollAreaScrollbarAutoProps {
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { APresence } from '~~/presence';
import { useForwardExpose } from '~~/shared';
import { injectAScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaScrollbarVisible from './scroll-area-scrollbar-visible.vue';
import { injectAScrollAreaScrollbarContext } from './scroll-area-scrollbar.vue';

defineProps<ScrollAreaScrollbarAutoProps>();

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

onMounted(() => handleResize());

useResizeObserver(rootContext.viewport, handleResize);
useResizeObserver(rootContext.content, handleResize);
</script>

<template>
  <APresence :present="forceMount || visible">
    <ScrollAreaScrollbarVisible
      v-bind="$attrs"
      :ref="forwardRef"
      :data-state="visible ? 'visible' : 'hidden'"
    >
      <slot />
    </ScrollAreaScrollbarVisible>
  </APresence>
</template>
