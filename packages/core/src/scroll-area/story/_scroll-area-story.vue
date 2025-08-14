<script setup lang="ts">
import type { AScrollAreaRootProps } from '../scroll-area-root.vue';
import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaScrollbar,
  AScrollAreaThumb,
  AScrollAreaViewport,
} from '..';

interface Props extends AScrollAreaRootProps {
  animated?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  animated: false,
  vertical: true,
  horizontal: true,
});
</script>

<template>
  <AScrollAreaRoot
    class="text-gray-900 rounded bg-white h-[200px] w-[200px] shadow-lg overflow-hidden"
    style="--scrollbar-size: 10px"
    v-bind="props"
  >
    <AScrollAreaViewport class="border-[inherit] h-full w-full">
      <div class="p-5">
        <slot />
      </div>
    </AScrollAreaViewport>
    <AScrollAreaScrollbar
      v-if="vertical"
      class="p-0.5 bg-black/10 flex select-none transition touch-none hover:bg-black/20 data-[orientation=vertical]:w-[var(--scrollbar-size)]"
      :class="[animated
        && 'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut']"
      orientation="vertical"
    >
      <AScrollAreaThumb
        :class="
          animated
            && 'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut'
        "
        class="rounded-[var(--scrollbar-size)] bg-gray-400 flex-1 relative"
      />
    </AScrollAreaScrollbar>

    <AScrollAreaScrollbar
      v-if="horizontal"
      class="p-0.5 bg-black/10 flex select-none transition touch-none hover:bg-black/20 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-[var(--scrollbar-size)]"
      :class="[animated
        && 'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut']"
      orientation="horizontal"
    >
      <AScrollAreaThumb
        :class="
          animated
            && 'data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut'
        "
        class="rounded-[var(--scrollbar-size)] bg-gray-400 flex-1 relative"
      />
    </AScrollAreaScrollbar>

    <AScrollAreaCorner class="bg-gray-300" />
  </AScrollAreaRoot>
</template>
