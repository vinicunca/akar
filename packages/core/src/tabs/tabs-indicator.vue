<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { computed, ref, watch, watchPostEffect } from 'vue';
import { useForwardExpose } from '../shared';
import { injectATabsRootContext } from './tabs-root.vue';

export interface ATabsIndicatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';
import { APrimitive } from '../primitive';

const props = defineProps<ATabsIndicatorProps>();
const context = injectATabsRootContext();

defineExpose({
  updateIndicatorStyle,
});

useForwardExpose();

interface IndicatorStyle {
  size: null | number;
  position: null | number;
}

const indicatorStyle = ref<IndicatorStyle>({
  size: null,
  position: null,
});
const tabs = ref<Array<HTMLElement>>([]);

watch(
  () => [context.modelValue.value, context?.dir.value],
  async () => {
    updateIndicatorStyle();
  },
  { immediate: true, flush: 'post' },
);

watchPostEffect(() => {
  tabs.value = Array.from(context.tabsList.value?.querySelectorAll<HTMLElement>('[role="tab"]') || []);
});

useResizeObserver(
  computed(() => [context.tabsList.value, ...tabs.value]),
  updateIndicatorStyle,
);

function updateIndicatorStyle() {
  const activeTab = context.tabsList.value?.querySelector<HTMLButtonElement>('[role="tab"][data-state="active"]');

  if (!activeTab) {
    return;
  }

  if (context.orientation.value === 'horizontal') {
    indicatorStyle.value = {
      size: activeTab.offsetWidth,
      position: activeTab.offsetLeft,
    };
  } else {
    indicatorStyle.value = {
      size: activeTab.offsetHeight,
      position: activeTab.offsetTop,
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
