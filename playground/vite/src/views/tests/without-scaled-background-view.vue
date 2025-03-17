<script setup lang="ts">
import {
  ADrawerClose,
  ADrawerContent,
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
  ADrawerTitle,
  ADrawerTrigger,
} from '@vinicunca/akar';
import { ref } from 'vue';

const open = ref<boolean>(false);
</script>

<template>
  <div
    class="h-screen w-screen flex items-center justify-center bg-white p-8"
    data-akar-drawer-wrapper=""
  >
    <ADrawerRoot v-model:open="open">
      <ADrawerTrigger as-child>
        <button
          data-testid="trigger"
          class="text-2xl"
        >
          Open Drawer
        </button>
      </ADrawerTrigger>
      <ADrawerPortal>
        <ADrawerOverlay
          data-testid="overlay"
          class="fixed inset-0 bg-black/40"
        />
        <ADrawerContent
          data-testid="content"
          class="fixed bottom-0 left-0 right-0 mt-24 h-[90%] flex flex-col rounded-t-[10px] bg-zinc-100"
        >
          <div class="flex-1 rounded-t-[10px] bg-white p-4">
            <div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div class="mx-auto max-w-md">
              <ADrawerTitle class="mb-4 font-medium">
                Unstyled drawer for Vue.
              </ADrawerTitle>
            </div>
            <p class="mb-2 text-zinc-600">
              This component can be used as a replacement for a Dialog on mobile and tablet devices.
            </p>
          </div>
          <!-- Move close button to bottom -->
          <ADrawerClose data-testid="drawer-close">
            Close
          </ADrawerClose>
          <button
            data-testid="controlled-close"
            class="text-2xl"
            @click="open = false"
          >
            Close
          </button>
        </ADrawerContent>
      </ADrawerPortal>
    </ADrawerRoot>
  </div>
</template>

<style scoped></style>
