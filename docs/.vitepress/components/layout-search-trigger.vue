<script setup lang="ts">
import {
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
} from '@vinicunca/akar';
import { useMagicKeys, whenever } from '@vueuse/core';
import { defineAsyncComponent, ref } from 'vue';

const LayoutSearchCommandBox = defineAsyncComponent(() => import('./layout-search-command-box.vue'));

const isOpen = ref(false);
const { meta_k: metaK } = useMagicKeys();

whenever(metaK, (isPressed) => {
  if (isPressed) {
    isOpen.value = true;
  }
});

function handleClose() {
  requestAnimationFrame(() => {
    isOpen.value = false;
  });
}
</script>

<template>
  <ADialogRoot v-model:open="isOpen">
    <ADialogTrigger class="flex items-center border-muted rounded-lg px-3 py-[7px] text-sm text-muted-foreground space-x-2 md:border hover:bg-muted md:bg-card">
      <i class="i-lucide:search" />

      <span class="hidden w-24 text-left lg:w-40 md:inline-flex">Search</span>
      <span class="hidden text-xs md:inline-flex">
        <kbd>⌘ K</kbd>
      </span>
    </ADialogTrigger>

    <ADialogPortal>
      <ADialogOverlay
        class="fixed inset-0 z-30 bg-background/50 backdrop-blur"
      />
      <ADialogContent
        class="fixed left-[50%] top-[10%] z-[100] max-h-[85vh] max-w-[750px] w-[90vw] translate-x-[-50%] border border-muted rounded-xl bg-card shadow-xl focus:outline-none"
      >
        <ADialogTitle class="sr-only">
          Search documentation
        </ADialogTitle>
        <ADialogDescription class="sr-only">
          Show related results based on search term
        </ADialogDescription>

        <LayoutSearchCommandBox
          @close="handleClose"
        />
      </ADialogContent>
    </ADialogPortal>
  </ADialogRoot>
</template>
