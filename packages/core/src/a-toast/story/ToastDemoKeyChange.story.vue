<script setup lang="ts">
import { ref } from 'vue'
import { AToastDescription, AToastProvider, AToastRoot, AToastViewport } from '..'

const one = ref(0)
const two = ref(0)
</script>

<template>
  <Story
    title="AToast/Key Change"
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
        class="flex items-center space-between pointer-events-auto"
      >
        <AToastDescription>AToast one</AToastDescription>
      </AToastRoot>

      <AToastRoot
        v-if="two > 0"
        :key="`two-${String(two)}`"
        class="flex items-center space-between pointer-events-auto"
      >
        <AToastDescription>AToast two</AToastDescription>
      </AToastRoot>

      <AToastViewport class="fixed top-1/2 right-1/2 border flex flex-col overflow-hidden" />
    </AToastProvider>
  </Story>
</template>
