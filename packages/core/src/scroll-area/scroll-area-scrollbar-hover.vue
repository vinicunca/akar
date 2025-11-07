<script lang="ts">
import type { ScrollAreaScrollbarAutoProps } from './scroll-area-scrollbar-auto.vue';

export interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { APresence } from '../presence';
import { useForwardExpose } from '../shared';
import { injectAScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaScrollbarAuto from './scroll-area-scrollbar-auto.vue';

defineOptions({
  inheritAttrs: false,
});

defineProps<ScrollAreaScrollbarHoverProps>();

const rootContext = injectAScrollAreaRootContext();

const { forwardRef } = useForwardExpose();

let timeout: number | ReturnType<typeof setTimeout> | undefined;
const visible = ref(false);

function handlePointerEnter() {
  window.clearTimeout(timeout);
  visible.value = true;
}
function handlePointerLeave() {
  timeout = window.setTimeout(() => {
    visible.value = false;
  }, rootContext.scrollHideDelay.value);
}

onMounted(() => {
  const scrollArea = rootContext.scrollArea.value;

  if (scrollArea) {
    scrollArea.addEventListener('pointerenter', handlePointerEnter);
    scrollArea.addEventListener('pointerleave', handlePointerLeave);
  }
});

onUnmounted(() => {
  const scrollArea = rootContext.scrollArea.value;
  if (scrollArea) {
    window.clearTimeout(timeout);
    scrollArea.removeEventListener('pointerenter', handlePointerEnter);
    scrollArea.removeEventListener('pointerleave', handlePointerLeave);
  }
});
</script>

<template>
  <APresence :present="forceMount || visible">
    <ScrollAreaScrollbarAuto
      v-bind="$attrs"
      :ref="forwardRef"
      :data-state="visible ? 'visible' : 'hidden'"
    >
      <slot />
    </ScrollAreaScrollbarAuto>
  </APresence>
</template>
