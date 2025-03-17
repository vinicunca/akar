<script setup lang="ts">
import {
  ADrawerContent,
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
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
    <ADrawerRoot
      v-model:open="open"
      :dismissible="false"
    >
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
          class="fixed bottom-0 left-0 right-0 mt-24 h-[96%] flex flex-col rounded-t-[10px] bg-zinc-100"
        >
          <div class="flex-1 rounded-t-[10px] bg-white p-4">
            <div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div class="mx-auto max-w-md">
              <DrawerTitle class="mb-4 font-medium">
                Unstyled drawer for Vue.
              </DrawerTitle>
            </div>
            <p class="mb-2 text-zinc-600">
              This component can be used as a replacement for a Dialog on mobile and tablet devices.
            </p>
          </div>
          <button
            type="button"
            data-testid="dismiss-button"
            class="mb-6 w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-gray-600 focus-visible:outline-offset-2 focus-visible:outline"
            @click="() => (open = false)"
          >
            Click to close
          </button>
        </ADrawerContent>
      </ADrawerPortal>
    </ADrawerRoot>
  </div>
</template>

<style scoped></style>
