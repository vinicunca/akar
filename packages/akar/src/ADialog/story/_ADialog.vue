<script setup lang="ts">
import { ref } from 'vue';

import { ADialogOverlay, ADialogPortal, ADialogRoot, ADialogTrigger } from '../';

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
    <ADialogPortal>
      <Transition name="fade">
        <ADialogOverlay
          class="bg-blackA9 fixed inset-0"
        />
      </Transition>
      <Transition name="fade">
        <ADialogContent
          :is-escape-key-down-default="true"
          class="fixed left-[50%] top-[50%] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          @pointer-down-outside.prevent
        >
          <div>a</div>
        </ADialogContent>
      </Transition>
    </ADialogPortal>
  </ADialogRoot>
</template>

<style>
</style>
