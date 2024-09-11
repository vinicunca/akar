<script setup lang="ts">
import type { AScrollAreaRootProps } from '../a-scroll-area-root.vue';

import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaScrollbar,
  AScrollAreaThumb,
  AScrollAreaViewport,
} from '..';

interface Props extends AScrollAreaRootProps {
  animated?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  animated: false,
  vertical: true,
  horizontal: true,
});
</script>

<template>
  <AScrollAreaRoot
    class="h-[200px] w-[200px] overflow-hidden rounded bg-white text-gray-900 shadow-lg"
    style="--scrollbar-size: 10px"
    v-bind="props"
  >
    <AScrollAreaViewport class="h-full w-full border-[inherit]">
      <div class="p-5">
        <slot />
      </div>
    </AScrollAreaViewport>

    <AScrollAreaScrollbar
      v-if="vertical"
      class="flex touch-none select-none bg-black/10 p-0.5 transition data-[orientation=vertical]:w-[var(--scrollbar-size)] hover:bg-black/20"
      orientation="vertical"
    >
      <AScrollAreaThumb
        :class="
          animated
            && 'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut'
        "
        class="relative flex-1 rounded-[var(--scrollbar-size)] bg-gray-400"
      />
    </AScrollAreaScrollbar>

    <AScrollAreaScrollbar
      v-if="horizontal"
      class="flex touch-none select-none bg-black/10 p-0.5 transition data-[orientation=horizontal]:h-[var(--scrollbar-size)] data-[orientation=horizontal]:flex-col hover:bg-black/20"
      orientation="horizontal"
    >
      <AScrollAreaThumb
        :class="
          animated
            && 'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut'
        "
        class="relative flex-1 rounded-[var(--scrollbar-size)] bg-gray-400"
      />
    </AScrollAreaScrollbar>

    <AScrollAreaCorner class="bg-gray-300" />
  </AScrollAreaRoot>
</template>
