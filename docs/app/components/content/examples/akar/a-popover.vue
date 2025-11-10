<script setup lang="ts">
import { APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger
      class="text-sm color-text p-1.5 rounded-md inline-flex ring ring-ring-accented ring-inset shadow-md transition-colors-280 items-center focus-visible:bg-background-elevated hover:bg-background-elevated"
    >
      <i class="i-lucide:info" />
    </APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        side="bottom"
        :side-offset="5"
        class="rounded-md bg-background pointer-events-auto ring ring-ring shadow-lg origin-$akar-popover-content-transform-origin focus:outline-none data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        <CorePlaceholder class="m-4 inline-flex size-48" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
