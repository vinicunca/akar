<script setup lang="ts">
import {
  AHoverCardContent,
  AHoverCardPortal,
  AHoverCardRoot,
  AHoverCardTrigger,
} from '..';
</script>

<template>
  <Story
    title="Hover Card/Multi"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="mt-20 h-10 flex items-center gap-0.5">
        <AHoverCardRoot
          v-for="(entry, index) in 20"
          :key="index"
          :open-delay="10"
          :close-delay="0"
        >
          <AHoverCardTrigger as-child>
            <div
              class="h-full w-3 rounded-[1px] bg-green-500 first:rounded-l-[4px] last:rounded-r-[4px]"
            />
          </AHoverCardTrigger>
          <AHoverCardPortal>
            <AHoverCardContent
              side="top"
              :side-offset="5"
              class="font-brand w-16 rounded-md bg-black px-2 py-1 text-center text-white"
            >
              {{ index }}
            </AHoverCardContent>
          </AHoverCardPortal>
        </AHoverCardRoot>
      </div>
    </Variant>
  </Story>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
