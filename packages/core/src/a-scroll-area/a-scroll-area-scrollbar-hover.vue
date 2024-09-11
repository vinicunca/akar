<script lang="ts">
import type { AScrollAreaScrollbarAutoProps } from './a-scroll-area-scrollbar-auto.vue';

export interface AScrollAreaScrollbarHoverProps extends AScrollAreaScrollbarAutoProps {}
</script>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { APresence } from '~~/a-presence';
import { useForwardExpose } from '~~/shared';

import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';
import AScrollAreaScrollbarAuto from './a-scroll-area-scrollbar-auto.vue';

defineOptions({
  inheritAttrs: false,
});

defineProps<AScrollAreaScrollbarHoverProps>();

const rootContext = injectAScrollAreaRootContext();

const { forwardRef } = useForwardExpose();

let timeout: number | ReturnType<typeof setTimeout> | undefined;
const visible = ref(false);

function handlePointerEnter() {
  window.clearTimeout(timeout);
  visible.value = true;
}

function handlePointerLeave() {
  timeout = window.setTimeout(
    () => {
      visible.value = false;
    },
    rootContext.scrollHideDelay.value,
  );
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
    <AScrollAreaScrollbarAuto
      v-bind="$attrs"
      :ref="forwardRef"
      :data-state="visible ? 'visible' : 'hidden'"
    >
      <slot />
    </AScrollAreaScrollbarAuto>
  </APresence>
</template>
