<script setup lang="ts">
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from 'akar';
</script>

<template>
  <ANumberFieldRoot
    id="age"
    :min="0"
    :default-value="18"
    class="inline-flex items-center relative"
  >
    <div class="ps-1 flex items-center start-0 inset-y-0 absolute">
      <ANumberFieldDecrement class="text-sm color-primary font-medium px-2.5 py-1.5 rounded-md inline-flex gap-1.5 transition-colors-280 items-center active:color-primary/75 aria-disabled:(color-primary opacity-75 cursor-not-allowed) disabled:(color-primary opacity-75 cursor-not-allowed) hover:color-primary/75 focus:outline-none focus-visible:(ring-2 ring-primary ring-inset) akar:p-1.5">
        <i class="i-lucide:minus shrink-0 size-5" />
      </ANumberFieldDecrement>
    </div>
    <ANumberFieldInput class="text-sm color-text-highlighted px-2.5 py-1.5 pe-9 ps-9 text-center border-0 rounded-md bg-background gap-1.5 w-full ring ring-ring-accented ring-inset transition-colors-280 placeholder:color-text-dimmed focus:outline-none disabled:(opacity-75 cursor-not-allowed) focus-visible:(ring-2 ring-primary ring-inset)" />
    <div class="pe-1 flex items-center end-0 inset-y-0 absolute">
      <ANumberFieldIncrement class="text-sm color-primary font-medium px-2.5 py-1.5 rounded-md inline-flex gap-1.5 transition-colors-280 items-center active:color-primary/75 aria-disabled:(color-primary opacity-75 cursor-not-allowed) disabled:(color-primary opacity-75 cursor-not-allowed) hover:color-primary/75 focus:outline-none focus-visible:(ring-2 ring-primary ring-inset) akar:p-1.5">
        <i class="i-lucide:plus shrink-0 size-5" />
      </ANumberFieldIncrement>
    </div>
  </ANumberFieldRoot>
</template>
