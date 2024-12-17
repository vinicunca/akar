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
    rootContext.onScrollbarYChange(scrollbarElement.value);
  }
});

const sizes = computed(() => scrollbarVisibleContext.sizes.value);
</script>

<template>
  <ScrollAreaScrollbarImpl
    :ref="forwardRef"
    :is-horizontal="false"
    data-orientation="vertical"
    :style="{
      top: 0,
      right: rootContext.dir.value === 'ltr' ? 0 : undefined,
      left: rootContext.dir.value === 'rtl' ? 0 : undefined,
      bottom: 'var(--akar-scroll-area-corner-height)',
      ['--akar-scroll-area-thumb-height' as any]: sizes ? `${getThumbSize(sizes)}px` : undefined,
    }"
    @on-drag-scroll="scrollbarVisibleContext.onDragScroll($event.y)"
  >
    <slot />
  </ScrollAreaScrollbarImpl>
</template>
