<script setup lang="ts">
import { ref } from 'vue';

import { ADialogRoot, ADialogTrigger } from '../';

const dialogOpen = ref(false);
</script>

<template>
  <h1 class="color-black">
    Testing Adialog
  </h1>
  <ADialogRoot v-model:open="dialogOpen">
    <ADialogTrigger
      class="h-[35px] inline-flex items-center justify-center rounded-[4px] bg-blue px-[15px] color-white font-medium leading-none shadow-[0_2px_10px] hover-bg-amber focus:outline-none"
    >
      Edit profile
    </ADialogTrigger>
  </ADialogRoot>
</template>

<style>
</style>
