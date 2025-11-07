<script setup lang="ts">
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar';
</script>

<template>
  <ACollapsibleRoot
    class="text-sm w-[300px]"
  >
    <div class="flex items-center justify-between">
      <span class="text-stone-800 font-medium dark:text-white"> @bebedag starred 3 repos </span>
      <ACollapsibleTrigger
        class="group color-primary outline-none border rounded-full inline-flex size-6 transition-colors-280 items-center justify-center data-[state=closed]:bg-white data-[state=open]:(bg-background-accented) hover:(bg-background-accented)"
      >
        <i
          class="group-data-[state=open]:i-lucide:x group-data-[state=closed]:i-lucide:arrow-down size-3.5"
        />
      </ACollapsibleTrigger>
    </div>

    <div class="mt-2 p-2 border border-border-accented rounded-lg bg-white">
      <span class="color-primary">akar</span>
    </div>

    <ACollapsibleContent class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
      <div class="my-2 p-2 border border-border-accented rounded-lg bg-white">
        <span class="color-primary">@vuejs/core</span>
      </div>
      <div class="my-2 p-2 border border-border-accented rounded-lg bg-white">
        <span class="color-primary">@vinicunca/perkakas</span>
      </div>
    </ACollapsibleContent>
  </ACollapsibleRoot>
</template>
