<script setup lang="ts">
import { ASeparator } from 'akar';
</script>

<template>
  <div class="mx-[15px] max-w-[300px] w-full">
    <div class="text-sm text-stone-700 leading-5 font-semibold dark:text-white">
      Akar
    </div>
    <div class="text-sm text-stone-700 leading-5 dark:text-white">
      An open-source UI component library.
    </div>
    <ASeparator
      class="my-[15px] bg-stone-300/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
    />
    <div class="flex h-5 items-center">
      <div class="text-sm text-stone-700 leading-5 dark:text-white">
        Blog
      </div>
      <ASeparator
        class="mx-[15px] bg-stone-300/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        decorative
        orientation="vertical"
      />
      <div class="text-sm text-stone-700 leading-5 dark:text-white">
        Docs
      </div>
      <ASeparator
        class="mx-[15px] bg-stone-300/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        decorative
        orientation="vertical"
      />
      <div class="text-sm text-stone-700 leading-5 dark:text-white">
        Source
      </div>
    </div>
  </div>
</template>
