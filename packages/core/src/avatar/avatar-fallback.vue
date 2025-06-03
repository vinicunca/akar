<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { isBrowser } from '@vinicunca/perkakas';

export interface AAvatarFallbackProps extends APrimitiveProps {
  /** Useful for delaying rendering so it only appears for those with slower connections. */
  delayMs?: number;
}
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

import { injectAAvatarRootContext } from './avatar-root.vue';

const props = withDefaults(
  defineProps<AAvatarFallbackProps>(),
  {
    as: 'span',
  },
);

const rootContext = injectAAvatarRootContext();
useForwardExpose();

const canRender = ref(props.delayMs === undefined);

watchEffect((onCleanup) => {
  if (props.delayMs && isBrowser) {
    const timerId = window.setTimeout(() => {
      canRender.value = true;
    }, props.delayMs);

    onCleanup(() => {
      window.clearTimeout(timerId);
    });
  }
});
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
