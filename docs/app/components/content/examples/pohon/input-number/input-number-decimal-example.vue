<script setup lang="ts">
import { ref } from 'vue';

const value = ref(5);
</script>

<template>
  <PInputNumber
    v-model="value"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
    }"
  />
</template>
