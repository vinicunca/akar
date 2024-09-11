<script lang="ts">
export interface AScrollAreaScrollbarScrollProps {
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { watchEffect } from 'vue';

import { APresence } from '~~/a-presence';
import { useForwardExpose, useStateMachine } from '~~/shared';

import { injectAScrollAreaRootContext } from './a-scroll-area-root.vue';
import { injectAScrollAreaScrollbarContext } from './a-scroll-area-scrollbar.vue';
import AScrollAreaScrollbarVisible from './a-scroll-area-scrollbar-visible.vue';

defineProps<AScrollAreaScrollbarScrollProps>();

const rootContext = injectAScrollAreaRootContext();
const scrollbarContext = injectAScrollAreaScrollbarContext();

const { forwardRef } = useForwardExpose();

const { state, dispatch } = useStateMachine('hidden', {
  hidden: {
    SCROLL: 'scrolling',
  },
  scrolling: {
    SCROLL_END: 'idle',
    POINTER_ENTER: 'interacting',
  },
  interacting: {
    SCROLL: 'interacting',
    POINTER_LEAVE: 'idle',
  },
  idle: {
    HIDE: 'hidden',
    SCROLL: 'scrolling',
    POINTER_ENTER: 'interacting',
  },
});

watchEffect((onCleanup) => {
  if (state.value === 'idle') {
    const timeId = window.setTimeout(
      () => dispatch('HIDE'),
      rootContext.scrollHideDelay.value,
    );

    onCleanup(() => {
      window.clearTimeout(timeId);
    });
  }
});

const debounceScrollEnd = useDebounceFn(() => dispatch('SCROLL_END'), 100);

watchEffect((onCleanup) => {
  const viewport = rootContext.viewport.value;
  const scrollDirection = scrollbarContext.isHorizontal.value
    ? 'scrollLeft'
    : 'scrollTop';

  if (viewport) {
    let prevScrollPos = viewport[scrollDirection];
    const handleScroll = () => {
      const scrollPos = viewport[scrollDirection];
      const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
      if (hasScrollInDirectionChanged) {
        dispatch('SCROLL');
        debounceScrollEnd();
      }
      prevScrollPos = scrollPos;
    };
    viewport.addEventListener('scroll', handleScroll);

    onCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll);
    });
  }
});
</script>

<template>
  <APresence :present="forceMount || state !== 'hidden'">
    <AScrollAreaScrollbarVisible
      v-bind="$attrs"
      :ref="forwardRef"
    >
      <slot />
    </AScrollAreaScrollbarVisible>
  </APresence>
</template>
