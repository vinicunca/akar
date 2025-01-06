<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AAvatarFallbackProps extends APrimitiveProps {
  /** Useful for delaying rendering so it only appears for those with slower connections. */
  delayMs?: number;
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

import { injectAAvatarRootContext } from './avatar-root.vue';

const props = withDefaults(
  defineProps<AAvatarFallbackProps>(),
  {
    delayMs: 0,
    as: 'span',
  },
);

const rootContext = injectAAvatarRootContext();
useForwardExpose();

const canRender = ref(false);
let timeout: ReturnType<typeof setTimeout> | undefined;

watch(
  rootContext.imageLoadingStatus,
  (value) => {
    if (value === 'loading') {
      canRender.value = false;
      if (props.delayMs) {
        timeout = setTimeout(() => {
          canRender.value = true;
          clearTimeout(timeout);
        }, props.delayMs);
      } else {
        canRender.value = true;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <APrimitive
    v-if="canRender && rootContext.imageLoadingStatus.value !== 'loaded'"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </APrimitive>
</template>
