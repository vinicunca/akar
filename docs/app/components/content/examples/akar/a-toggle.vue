<script setup lang="ts">
import { AToggle } from 'akar';
import { ref } from 'vue';

const toggleState = ref(false);
</script>

<template>
  <AToggle
    v-model="toggleState"
    aria-label="Toggle italic"
    class="text-base text-stone-700 leading-4 border rounded-lg bg-white flex size-9 shadow-sm items-center justify-center focus-within:outline-none data-[state=on]:bg-stone-100 hover:bg-stone-50 focus-within:shadow-[0_0_0_2px]"
  >
    <i
      class="i-lucide:italic size-6"
    />
  </AToggle>
</template>
