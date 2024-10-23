<script setup lang="ts">
import { ref } from 'vue';

import { ADialogClose, ADialogContent, ADialogDescription, ADialogOverlay, ADialogRoot, ADialogTitle, ADialogTrigger } from '~~/a-dialog';

import { AToastAction, AToastDescription, AToastProvider, AToastRoot, AToastViewport } from '..';

const open = ref(false);
</script>

<template>
  <Story
    title="AToast/From ADialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <AToastProvider>
      <ADialogRoot>
        <ADialogTrigger class="h-[35px] inline-flex items-center justify-center rounded bg-white px-[15px] text-[15px] text-violet11 font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black">
          Open
        </ADialogTrigger>
        <ADialogOverlay />
        <ADialogContent :style="{ border: '1px solid', width: 300, padding: 30 }">
          <ADialogTitle :style="{ margin: 0 }">
            Title
          </ADialogTitle>
          <ADialogDescription>Description</ADialogDescription>
          <button
            class="h-[35px] inline-flex items-center justify-center rounded bg-white px-[15px] text-[15px] text-violet11 font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            @click="open = true"
          >
            Open toast
          </button>
          <ADialogClose>Close</ADialogClose>
        </ADialogContent>
      </ADialogRoot>

      <AToastRoot
        v-model:open="open"
        class="space-between pointer-events-auto flex items-center"
      >
        <AToastDescription>There was an error</AToastDescription>
        <AToastAction
          class="h-[35px] inline-flex items-center justify-center rounded bg-white px-[15px] text-[15px] text-violet11 font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          alt-text="Resubmit the form to try again."
          @click="() => {
            console.log('try again')
          }"
        >
          Try again
        </AToastAction>
      </AToastRoot>

      <AToastViewport class="fixed right-1/2 top-1/2 flex flex-col overflow-hidden border" />
    </AToastProvider>
  </Story>
</template>
