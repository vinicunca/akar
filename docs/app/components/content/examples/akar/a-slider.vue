<script setup lang="ts">
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
import { ref } from 'vue';

const value = ref([50]);
</script>

<template>
  <ASliderRoot
    v-model="value"
    class="flex w-full select-none items-center relative touch-none"
    :max="100"
    :step="1"
  >
    <ASliderTrack class="rounded-full bg-background-accented grow h-[8px] relative overflow-hidden">
      <ASliderRange class="rounded-full bg-primary h-full absolute" />
    </ASliderTrack>
    <ASliderThumb
      class="frounded-full bg-background size-4 ring-2 ring-primary focus-visible:(outline-2 outline-primary/50 outline-offset-2)"
      aria-label="Volume"
    />
  </ASliderRoot>
</template>
