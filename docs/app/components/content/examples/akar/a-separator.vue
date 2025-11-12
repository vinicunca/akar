<script setup lang="ts">
import { ASeparator } from 'akar';
</script>

<template>
  <div class="mx-4 max-w-[300px] w-full">
    <div class="text-sm leading-5 font-semibold">
      Akar
    </div>
    <div class="text-sm leading-5 dark:text-white">
      An open-source UI component library.
    </div>
    <ASeparator
      class="my-4 border border-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
    />
    <div class="flex h-5 items-center">
      <div class="text-sm leading-5 dark:text-white">
        Blog
      </div>
      <ASeparator
        class="mx-4 border border-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        decorative
        orientation="vertical"
      />
      <div class="text-sm leading-5 dark:text-white">
        Docs
      </div>
      <ASeparator
        class="mx-4 border border-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        decorative
        orientation="vertical"
      />
      <div class="text-sm leading-5 dark:text-white">
        Source
      </div>
    </div>
  </div>
</template>
