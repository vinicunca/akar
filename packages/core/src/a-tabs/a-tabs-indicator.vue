<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ATabsIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';
import { nextTick, ref, watch } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATabsRootContext } from './a-tabs-root.vue';

const props = defineProps<ATabsIndicatorProps>();
const context = injectATabsRootContext();

useForwardExpose();

interface IndicatorStyle {
  position: null | number;
  size: null | number;
}
const activeTab = ref<HTMLElement | null>();
const indicatorStyle = ref<IndicatorStyle>({
  size: null,
  position: null,
});

watch(
  () => [context.modelValue.value, context?.dir.value],
  async () => {
    await nextTick();
    updateIndicatorStyle();
  },
  { immediate: true },
);

useResizeObserver([context.tabsList, activeTab], updateIndicatorStyle);

function updateIndicatorStyle() {
  activeTab.value = context.tabsList.value?.querySelector<HTMLButtonElement>('[role="tab"][data-state="active"]');

  if (!activeTab.value) {
    return;
  }

  if (context.orientation.value === 'horizontal') {
    indicatorStyle.value = {
      size: activeTab.value.offsetWidth,
      position: activeTab.value.offsetLeft,
    };
  } else {
    indicatorStyle.value = {
      size: activeTab.value.offsetHeight,
      position: activeTab.value.offsetTop,
    };
  }
}
</script>

<template>
  <APrimitive
    v-if="typeof indicatorStyle.size === 'number'"
    v-bind="props"
    :style="{
      '--akar-tabs-indicator-size': `${indicatorStyle.size}px`,
      '--akar-tabs-indicator-position': `${indicatorStyle.position}px`,
    }"
  >
    <slot />
  </APrimitive>
</template>
