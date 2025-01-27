<script setup lang="ts">
import { ref } from 'vue';
import { AToastDescription, AToastProvider, AToastRoot, AToastViewport } from '..';

const one = ref(0);
const two = ref(0);
</script>

<template>
  <Story
    title="Toast/Key Change"
    :layout="{ type: 'single', iframe: false }"
  >
    <AToastProvider>
      <button @click="one++">
        Open toast one
      </button>
      <button @click="two++">
        Open toast two
      </button>

      <AToastRoot
        v-if="one > 0"
        :key="`one-${String(one)}`"
        class="space-between pointer-events-auto flex items-center"
      >
        <AToastDescription>Toast one</AToastDescription>
      </AToastRoot>

      <AToastRoot
        v-if="two > 0"
        :key="`two-${String(two)}`"
        class="space-between pointer-events-auto flex items-center"
      >
        <AToastDescription>Toast two</AToastDescription>
      </AToastRoot>

      <AToastViewport class="fixed right-1/2 top-1/2 flex flex-col overflow-hidden border" />
    </AToastProvider>
  </Story>
</template>
