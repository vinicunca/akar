<script setup lang="ts">
import { AAvatarFallback, AAvatarImage, AAvatarRoot } from '..';

defineProps<{ delay?: number }>();
</script>

<template>
  <AAvatarRoot
    class="bg-blackA3 align-middle rounded-full inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden"
  >
    <AAvatarImage
      class="rounded-[inherit] h-full w-full object-cover"
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      alt="Colm Tuite"
    />
    <AAvatarFallback
      class="text-violet11 text-[15px] leading-1 font-medium bg-white flex h-full w-full items-center justify-center"
      :delay-ms="delay"
    >
      CT
    </AAvatarFallback>
  </AAvatarRoot>
</template>
