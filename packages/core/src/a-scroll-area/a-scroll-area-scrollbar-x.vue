<script lang="ts" setup>
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
    rootContext.onScrollbarXChange(scrollbarElement.value);
  }
});

const sizes = computed(() => scrollbarVisibleContext.sizes.value);
</script>

<template>
  <AScrollAreaScrollbarImpl
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
  </AScrollAreaScrollbarImpl>
</template>
