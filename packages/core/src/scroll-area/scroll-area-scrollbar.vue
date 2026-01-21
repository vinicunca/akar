<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '../primitive';
import { createContext, useForwardExpose } from '../shared';

export interface AScrollAreaScrollbarProps extends APrimitiveProps {
  /** The orientation of the scrollbar */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}

export interface ScrollAreaScrollbarContext {
  as: Ref<APrimitiveProps['as']>;
  orientation: Ref<'horizontal' | 'vertical'>;
  forceMount?: Ref<boolean>;
  isHorizontal: Ref<boolean>;
  asChild: Ref<boolean>;
}

export const [
  injectAScrollAreaScrollbarContext,
  provideScrollAreaScrollbarContext,
] = createContext<ScrollAreaScrollbarContext>('AScrollAreaScrollbar');
</script>

<script setup lang="ts">
import {
  computed,
  onUnmounted,
  toRefs,
  watch,
} from 'vue';
import { injectAScrollAreaRootContext } from './scroll-area-root.vue';
import ScrollAreaScrollbarAuto from './scroll-area-scrollbar-auto.vue';
import ScrollAreaScrollbarGlimpse from './scroll-area-scrollbar-glimpse.vue';
import ScrollAreaScrollbarHover from './scroll-area-scrollbar-hover.vue';
import ScrollAreaScrollbarScroll from './scroll-area-scrollbar-scroll.vue';
import ScrollAreaScrollbarVisible from './scroll-area-scrollbar-visible.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<AScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
  as: 'div',
});

const { forwardRef } = useForwardExpose();
const rootContext = injectAScrollAreaRootContext();

const isHorizontal = computed(() => props.orientation === 'horizontal');

watch(
  isHorizontal,
  () => {
    if (isHorizontal.value) {
      rootContext.onScrollbarXEnabledChange(true);
    } else {
      rootContext.onScrollbarYEnabledChange(true);
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  rootContext.onScrollbarXEnabledChange(false);
  rootContext.onScrollbarYEnabledChange(false);
});

const { orientation, forceMount, asChild, as } = toRefs(props);
provideScrollAreaScrollbarContext({
  orientation,
  forceMount,
  isHorizontal,
  as,
  asChild,
});
</script>

<template>
  <ScrollAreaScrollbarHover
    v-if="rootContext.type.value === 'hover'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarHover>
  <ScrollAreaScrollbarScroll
    v-else-if="rootContext.type.value === 'scroll'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarScroll>
  <ScrollAreaScrollbarGlimpse
    v-else-if="rootContext.type.value === 'glimpse'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarGlimpse>
  <ScrollAreaScrollbarAuto
    v-else-if="rootContext.type.value === 'auto'"
    v-bind="$attrs"
    :ref="forwardRef"
    :force-mount="forceMount"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
  <ScrollAreaScrollbarVisible
    v-else-if="rootContext.type.value === 'always'"
    v-bind="$attrs"
    :ref="forwardRef"
    data-state="visible"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
