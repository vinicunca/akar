<script setup lang="ts">
import { ref } from 'vue'
import {
  ADialogRoot,
} from '../'

const dialogOpen = ref(false)
</script>

<template>
  <ADialogRoot v-model:open="dialogOpen">
    <p>A</p>
  </ADialogRoot>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
