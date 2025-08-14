<script setup lang="ts">
import { ref } from 'vue';
import { ADialogClose, ADialogContent, ADialogDescription, ADialogOverlay, ADialogRoot, ADialogTitle, ADialogTrigger } from '~~/dialog';
import { AToastAction, AToastDescription, AToastProvider, AToastRoot, AToastViewport } from '..';

const open = ref(false);
</script>

<template>
  <Story
    title="Toast/From Dialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <AToastProvider>
      <ADialogRoot>
        <ADialogTrigger class="text-violet11 shadow-blackA7 hover:bg-mauve3 text-[15px] leading-[35px] font-medium px-[15px] outline-none rounded bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black">
          Open
        </ADialogTrigger>
        <ADialogOverlay />
        <ADialogContent :style="{ border: '1px solid', width: 300, padding: 30 }">
          <ADialogTitle :style="{ margin: 0 }">
            Title
          </ADialogTitle>
          <ADialogDescription>Description</ADialogDescription>
          <button
            class="text-violet11 shadow-blackA7 hover:bg-mauve3 text-[15px] leading-[35px] font-medium px-[15px] outline-none rounded bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
            @click="open = true"
          >
            Open toast
          </button>
          <ADialogClose>Close</ADialogClose>
        </ADialogContent>
      </ADialogRoot>

      <AToastRoot
        v-model:open="open"
        class="space-between flex pointer-events-auto items-center"
      >
        <AToastDescription>There was an error</AToastDescription>
        <AToastAction
          class="text-violet11 shadow-blackA7 hover:bg-mauve3 text-[15px] leading-[35px] font-medium px-[15px] outline-none rounded bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
          alt-text="Resubmit the form to try again."
          @click="() => {
            console.log('try again')
          }"
        >
          Try again
        </AToastAction>
      </AToastRoot>

      <AToastViewport class="border flex flex-col right-1/2 top-1/2 fixed overflow-hidden" />
    </AToastProvider>
  </Story>
</template>
