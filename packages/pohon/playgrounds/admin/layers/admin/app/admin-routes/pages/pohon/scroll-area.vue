<script setup lang="ts">
import { AScrollAreaRoot, AScrollAreaScrollbar, AScrollAreaThumb, AScrollAreaViewport } from 'akar';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<template>
  <AScrollAreaRoot
    class="border border-border rounded-lg bg-background h-[225px] w-[200px] shadow-sm relative overflow-hidden"
    style="--scrollbar-size: 10px"
  >
    <div class="h-6 w-full top-0 absolute z-10 from-transparent to-white bg-gradient-to-t" />
    <AScrollAreaViewport class="rounded h-full w-full">
      <div class="px-5 py-[15px]">
        <div class="text-sm color-primary leading-[18px] font-semibold">
          Tags
        </div>
        <div
          v-for="tag in tags"
          :key="tag"
          class="text-xs leading-[18px] mt-2.5 pt-2.5 border-t border-t-border"
        >
          {{ tag }}
        </div>
      </div>
    </AScrollAreaViewport>
    <AScrollAreaScrollbar
      class="p-0.5 bg-background-elevated flex select-none transition-colors duration-[160ms] ease-out z-20 touch-none hover:bg-background-accented data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5"
      orientation="vertical"
    >
      <AScrollAreaThumb
        class="rounded-[10px] bg-primary flex-1 relative before:(h-full min-h-[44px] min-w-[44px] w-full content-empty left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2)"
      />
    </AScrollAreaScrollbar>
    <AScrollAreaScrollbar
      class="p-0.5 bg-background-elevated flex select-none transition-colors duration-[160ms] ease-out touch-none hover:bg-background-accented data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5"
      orientation="horizontal"
    >
      <AScrollAreaThumb
        class="rounded-[10px] bg-primary flex-1 relative before:(h-full min-h-[44px] min-w-[44px] w-full content-empty left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2)"
      />
    </AScrollAreaScrollbar>

    <div class="h-6 w-full bottom-0 absolute z-10 from-transparent to-white bg-gradient-to-b" />
  </AScrollAreaRoot>
</template>
