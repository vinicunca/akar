<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ANavigationMenuIndicatorProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';
import { computed, ref, watchEffect } from 'vue';
import { APresence } from '~~/presence';
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';
import { injectANavigationMenuContext } from './navigation-menu-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ANavigationMenuIndicatorProps>();

const { forwardRef } = useForwardExpose();
const menuContext = injectANavigationMenuContext();

const indicatorStyle = ref<{ size: number; position: number }>();
const isHorizontal = computed(() => menuContext.orientation === 'horizontal');
const isVisible = computed(() => !!menuContext.modelValue.value);
const { activeTrigger } = menuContext;

function handlePositionChange() {
  if (!activeTrigger.value) {
    return;
  }

  indicatorStyle.value = {
    size: isHorizontal.value
      ? activeTrigger.value.offsetWidth
      : activeTrigger.value.offsetHeight,
    position: isHorizontal.value
      ? activeTrigger.value.offsetLeft
      : activeTrigger.value.offsetTop,
  };
}

watchEffect(() => {
  if (!menuContext.modelValue.value) {
    return;
  }
  handlePositionChange();
});

useResizeObserver(activeTrigger, handlePositionChange);
useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
</script>

<template>
  <Teleport
    v-if="menuContext.indicatorTrack.value"
    :to="menuContext.indicatorTrack.value"
  >
    <APresence :present="forceMount || isVisible">
      <APrimitive
        :ref="forwardRef"
        aria-hidden="true"
        :data-state="isVisible ? 'visible' : 'hidden'"
        :data-orientation="menuContext.orientation"
        :as-child="props.asChild"
        :as="as"
        :style="{
          ...(indicatorStyle ? {
            '--akar-navigation-menu-indicator-size': `${indicatorStyle.size}px`,
            '--akar-navigation-menu-indicator-position': `${indicatorStyle.position}px`,
          } : {}),
        }"
        v-bind="$attrs"
      >
        <slot />
      </APrimitive>
    </APresence>
  </Teleport>
</template>
