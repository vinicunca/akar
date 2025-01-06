<script setup lang="ts">
import { AAvatarFallback, AAvatarImage, AAvatarRoot } from '..';

defineProps<{ delay?: number }>();
</script>

<template>
  <AAvatarRoot
    class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle"
  >
    <AAvatarImage
      class="h-full w-full rounded-[inherit] object-cover"
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      alt="Colm Tuite"
    />
    <AAvatarFallback
      class="text-violet11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
      :delay-ms="delay"
    >
      CT
    </AAvatarFallback>
  </AAvatarRoot>
</template>
