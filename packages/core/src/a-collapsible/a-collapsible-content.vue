<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { useForwardExpose } from '~~/shared';

export interface ACollapsibleContentProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useId, watch } from 'vue';

import { APresence } from '~~/a-presence';
import {
  APrimitive,
} from '~~/a-primitive';

import { injectACollapsibleRootContext } from './a-collapsible-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ACollapsibleContentProps>();

const rootContext = injectACollapsibleRootContext();
rootContext.contentId ||= useId();

const presentRef = ref<InstanceType<typeof APresence>>();
const { forwardRef, currentElement } = useForwardExpose();

const width = ref(0);
const height = ref(0);

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => rootContext.open.value);
const isMountAnimationPrevented = ref(isOpen.value);
const currentStyle = ref<Record<string, string>>();

watch(
  () => [isOpen.value, presentRef.value?.present],
  async () => {
    await nextTick();

    const node = currentElement.value;
    if (!node) {
      return;
    }

    currentStyle.value = currentStyle.value || {
      transitionDuration: node.style.transitionDuration,
      animationName: node.style.animationName,
    };

    // block any animations/transitions so the element renders at its full dimensions
    node.style.transitionDuration = '0s';
    node.style.animationName = 'none';

    // get width and height from full dimensions
    const rect = node.getBoundingClientRect();
    height.value = rect.height;
    width.value = rect.width;

    // kick off any animations/transitions that were originally set up if it isn't the initial mount
    if (!isMountAnimationPrevented.value) {
      node.style.transitionDuration = currentStyle.value.transitionDuration;
      node.style.animationName = currentStyle.value.animationName;
    }
  },
  {
    immediate: true,
  },
);

const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPrevented.value = false;
  });
});
</script>

<template>
  <APresence
    v-slot="{ present }"
    ref="presentRef"
    :present="forceMount || rootContext.open.value"
    :force-mount="true"
  >
    <APrimitive
      v-bind="$attrs"
      :id="rootContext.contentId"
      :ref="forwardRef"
      :as-child="props.asChild"
      :as="as"
      :hidden="!present"
      :data-state="skipAnimation ? undefined : rootContext.open.value ? 'open' : 'closed'"
      :data-disabled="rootContext.disabled?.value ? '' : undefined"
      :style="{
        [`--akar-collapsible-content-height`]: `${height}px`,
        [`--akar-collapsible-content-width`]: `${width}px`,
      }"
    >
      <slot v-if="rootContext.unmountOnHide.value ? present : true" />
    </APrimitive>
  </APresence>
</template>
