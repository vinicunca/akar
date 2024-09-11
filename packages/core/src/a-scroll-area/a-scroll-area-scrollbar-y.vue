<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useForwardExpose } from '~~/shared';

import { getThumbSize } from './a-scroll.utils';
import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';
import AScrollAreaScrollbarImpl from './a-scroll-area-scrollbar-impl.vue';
import { injectAScrollAreaScrollbarVisibleContext } from './a-scroll-area-scrollbar-visible.vue';

const rootContext = injectAScrollAreaRootContext();
const scrollbarVisibleContext = injectAScrollAreaScrollbarVisibleContext();

const { forwardRef, currentElement: scrollbarElement } = useForwardExpose();

onMounted(() => {
  if (scrollbarElement.value) {
    rootContext.onScrollbarYChange(scrollbarElement.value);
  }
});

const sizes = computed(() => scrollbarVisibleContext.sizes.value);
</script>

<template>
  <AScrollAreaScrollbarImpl
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
  </AScrollAreaScrollbarImpl>
</template>
