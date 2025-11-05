<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <PInput
    v-model="value"
    placeholder=""
    :pohon="{ base: 'peer' }"
  >
    <label class="peer-placeholder-shown:(text-sm color-text-dimmed font-normal top-1.5) akar:(text-xs color-text-highlighted font-medium px-1.5 pointer-events-none transition-all left-0 absolute -top-2.5) akar:peer-focus:(text-xs color-text-highlighted font-medium -top-2.5)">
      <span class="px-1 bg-background inline-flex">Email address</span>
    </label>
  </PInput>
</template>
