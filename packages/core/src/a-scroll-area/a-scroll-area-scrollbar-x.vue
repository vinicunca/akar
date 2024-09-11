<script lang="ts" setup>
import { computed, onMounted } from 'vue';

import { useForwardExpose } from '~~/shared';

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
  >
    <slot />
  </AScrollAreaScrollbarImpl>
</template>
