<script setup lang="ts">
import { ref } from 'vue'
import {
  ADialogRoot,
  ADialogTrigger,
} from '../'

const dialogOpen = ref(false)
</script>

<template>
  <h1>Akar Dialog </h1>
  <ADialogRoot v-model:open="dialogOpen">
    <ADialogTrigger
      class="color-white hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-blue px-[15px] font-medium leading-none shadow-[0_2px_10px]  focus:outline-none"
    >
      Edit profile
    </ADialogTrigger>
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
