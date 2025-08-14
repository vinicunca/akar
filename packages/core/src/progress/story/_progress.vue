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
    class="full bg-blackA9 rounded-full flex h-8 w-full items-center justify-center relative overflow-hidden"
  >
    <AProgressIndicator
      class="bg-white h-full w-full transition-transform duration-1000"
      :style="`transform: translateX(-${100 - interactive}%)`"
    />
    <div
      class="text-xs text-green-400 tracking-widest font-bold font-mono text-center pointer-events-none uppercase absolute mix-blend-normal"
    >
      {{ interactive.toFixed(2) }}%
    </div>
  </AProgressRoot>
</template>
