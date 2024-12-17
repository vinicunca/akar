<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useForwardExpose } from '~~/shared';
import { injectAScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaScrollbarImpl from './scroll-area-scrollbar-impl.vue';
import { injectScrollAreaScrollbarVisibleContext } from './scroll-area-scrollbar-visible.vue';
import { getThumbSize } from './utils';

const rootContext = injectAScrollAreaRootContext();
const scrollbarVisibleContext = injectScrollAreaScrollbarVisibleContext();

const { forwardRef, currentElement: scrollbarElement } = useForwardExpose();

onMounted(() => {
  if (scrollbarElement.value) {
    rootContext.onScrollbarXChange(scrollbarElement.value);
  }
});
const sizes = computed(() => scrollbarVisibleContext.sizes.value);
</script>

<template>
  <ScrollAreaScrollbarImpl
    :ref="forwardRef"
    :is-horizontal="true"
    data-orientation="horizontal"
    :style="{
      bottom: 0,
      left: rootContext.dir.value === 'rtl' ? 'var(--akar-scroll-area-corner-width)' : 0,
      right: rootContext.dir.value === 'ltr' ? 'var(--akar-scroll-area-corner-width)' : 0,
      ['--akar-scroll-area-thumb-width' as any]: sizes ? `${getThumbSize(sizes)}px` : undefined,
    }"
    @on-drag-scroll="scrollbarVisibleContext.onDragScroll($event.x)"
  >
    <slot />
  </ScrollAreaScrollbarImpl>
</template>
