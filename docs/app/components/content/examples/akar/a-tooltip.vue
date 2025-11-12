<script setup lang="ts">
import { ATooltipArrow, ATooltipContent, ATooltipPortal, ATooltipProvider, ATooltipRoot, ATooltipTrigger } from 'akar';
</script>

<template>
  <ATooltipProvider>
    <ATooltipRoot>
      <ATooltipTrigger
        class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center justify-center focus:outline-none active:bg-background-elevated hover:bg-background-elevated focus-visible:(ring-2 ring-ring-inverted)"
      >
        <i class="i-lucide:plus" />
      </ATooltipTrigger>
      <ATooltipPortal>
        <ATooltipContent
          class="text-xs color-text-highlighted px-2.5 py-1 rounded-sm bg-background flex gap-1 h-6 pointer-events-auto select-none ring ring-ring shadow-sm origin-$akar-tooltip-content-transform-origin items-center data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=delayed-open]:(animate-in fade-in-0 zoom-in-95) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          :side-offset="5"
        >
          Add to library
          <ATooltipArrow
            class="fill-background stroke-border"
            :width="12"
            :height="6"
          />
        </ATooltipContent>
      </ATooltipPortal>
    </ATooltipRoot>
  </ATooltipProvider>
</template>
