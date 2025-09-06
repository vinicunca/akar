<script setup lang="ts">
import { ref } from 'vue';
import { AProgressIndicator, AProgressRoot } from '..';

const interactive = ref(0);
setTimeout(() => {
  // For some reason, this interval triggers twice in the same tick
  interactive.value = (interactive.value + 50) % 100;
}, 200);
</script>

<template>
  <AProgressRoot
    v-model="interactive"
    class="full relative h-8 w-full flex items-center justify-center overflow-hidden rounded-full bg-blackA9"
  >
    <AProgressIndicator
      class="h-full w-full bg-white transition-transform duration-1000"
      :style="`transform: translateX(-${100 - interactive}%)`"
    />
    <div
      class="pointer-events-none absolute text-center text-xs color-green-400 font-bold tracking-widest font-mono uppercase mix-blend-normal"
    >
      {{ interactive.toFixed(2) }}%
    </div>
  </AProgressRoot>
</template>
