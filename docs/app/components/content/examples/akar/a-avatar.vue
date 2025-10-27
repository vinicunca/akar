<script setup lang="ts">
import { AAvatarFallback, AAvatarImage, AAvatarRoot } from 'akar';
</script>

<template>
  <div class="flex gap-5">
    <AAvatarRoot class="align-middle rounded-full bg-background-accented inline-flex shrink-0 size-11 select-none items-center justify-center overflow-hidden">
      <AAvatarImage
        class="rounded-inherit size-full object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <AAvatarFallback
        class="text-grass11 text-sm leading-1 font-medium bg-white flex h-full w-full items-center justify-center dark:text-stone-300 dark:bg-stone-800"
        :delay-ms="600"
      >
        CT
      </AAvatarFallback>
    </AAvatarRoot>
    <AAvatarRoot class="align-middle rounded-full bg-background-accented inline-flex shrink-0 size-11 select-none items-center justify-center overflow-hidden">
      <AAvatarImage
        class="rounded-inherit size-full object-cover"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <AAvatarFallback
        class="text-grass11 text-sm leading-1 font-medium bg-white flex h-full w-full items-center justify-center dark:text-stone-300 dark:bg-stone-800"
        :delay-ms="600"
      >
        JD
      </AAvatarFallback>
    </AAvatarRoot>
    <AAvatarRoot class="align-middle rounded-full bg-background-accented inline-flex shrink-0 size-11 select-none items-center justify-center overflow-hidden">
      <AAvatarFallback class="color-text-muted leading-none font-medium truncate">
        PD
      </AAvatarFallback>
    </AAvatarRoot>
  </div>
</template>
