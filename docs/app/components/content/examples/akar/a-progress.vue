<script setup lang="ts">
import { AProgressIndicator, AProgressRoot } from 'akar';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const progressValue = ref(10);
const timer = ref();

onMounted(() => {
  timer.value = setInterval(() => {
    if (progressValue.value === 100) {
      progressValue.value = 10;
    } else {
      progressValue.value += 30;
    }
  }, 2000);
});

onBeforeUnmount(() => {
  clearTimeout(timer.value);
});
</script>

<template>
  <AProgressRoot
    v-model="progressValue"
    class="rounded-full bg-background-accented h-2 w-full relative overflow-hidden"
  >
    <AProgressIndicator
      class="rounded-full bg-primary size-full transition-transform-280 ease-out data-[state=indeterminate]:animate-carousel"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </AProgressRoot>
</template>
