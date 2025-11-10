<script setup lang="ts">
import {
  ADialogClose,
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
} from 'akar';
</script>

<template>
  <ADialogRoot>
    <ADialogTrigger
      class="text-sm color-primary font-500 px-2.5 py-1.5 rounded-md inline-flex gap-1.5 ring ring-primary/50 ring-inset shadow-md transition-colors-280 items-center focus:outline-none active:bg-primary/10 hover:bg-primary/10 focus-visible:(ring-2 ring-primary)"
    >
      Open dialog
    </ADialogTrigger>

    <ADialogPortal>
      <ADialogOverlay class="bg-background-elevated/75 inset-0 fixed data-[state=closed]:(animate-out fade-out-0) data-[state=open]:(animate-in fade-in-0)" />
      <ADialogContent
        class="rounded-lg bg-background grid grid-rows-[min-content_1fr_min-content] max-h-[calc(100dvh-2rem)] max-w-lg w-[calc(100vw-2rem)] ring ring-ring shadow-lg left-1/2 top-1/2 fixed overflow-hidden divide-divide divide-y focus:outline-none sm:max-h-[calc(100dvh-4rem)] -translate-x-1/2 -translate-y-1/2 data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in fade-in-0 zoom-in-95)"
      >
        <ADialogTitle class="color-text-highlighted font-semibold p-4 flex gap-1.5 min-h-16 items-center sm:px-6">
          Edit profile
        </ADialogTitle>
        <ADialogDescription class="text-sm color-text-muted mt-1 p-4 flex-1 overflow-y-auto sm:p-6">
          Make changes to your profile here. Click save when you're done.
        </ADialogDescription>

        <div class="p-4 flex gap-1.5 gap-4 items-center justify-end sm:px-6">
          <ADialogClose as-child>
            <button
              class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background-elevated inline-flex gap-1.5 shadow-md transition-colors-280 items-center focus:outline-none active:bg-background-accented/75 focus-visible:bg-background-accented/75 hover:bg-background-accented/75"
            >
              Save changes
            </button>
          </ADialogClose>
        </div>
        <ADialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 appearance-none rounded-full inline-flex h-[25px] w-[25px] items-center right-[10px] top-[10px] justify-center absolute focus:outline-none focus:shadow-[0_0_0_2px]"
          aria-label="Close"
        >
          <i class="i-lucide:x" />
        </ADialogClose>
      </ADialogContent>
    </ADialogPortal>
  </ADialogRoot>
</template>
