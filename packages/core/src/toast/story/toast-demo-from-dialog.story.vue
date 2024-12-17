<script setup lang="ts">
import { ref } from 'vue'
import { AToastAction, AToastDescription, AToastProvider, AToastRoot, AToastViewport } from '..'
import { ADialogClose, ADialogContent, ADialogDescription, ADialogOverlay, ADialogRoot, ADialogTitle, ADialogTrigger } from '~~/dialog'

const open = ref(false)
</script>

<template>
  <Story
    title="Toast/From Dialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <AToastProvider>
      <ADialogRoot>
        <ADialogTrigger class="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black">
          Open
        </ADialogTrigger>
        <ADialogOverlay />
        <ADialogContent :style="{ border: '1px solid', width: 300, padding: 30 }">
          <ADialogTitle :style="{ margin: 0 }">
            Title
          </ADialogTitle>
          <ADialogDescription>Description</ADialogDescription>
          <button
            class="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            @click="open = true"
          >
            Open toast
          </button>
          <ADialogClose>Close</ADialogClose>
        </ADialogContent>
      </ADialogRoot>

      <AToastRoot
        v-model:open="open"
        class="flex items-center space-between pointer-events-auto"
      >
        <AToastDescription>There was an error</AToastDescription>
        <AToastAction
          class="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          alt-text="Resubmit the form to try again."
          @click="() => {
            console.log('try again')
          }"
        >
          Try again
        </AToastAction>
      </AToastRoot>

      <AToastViewport class="fixed top-1/2 right-1/2 border flex flex-col overflow-hidden" />
    </AToastProvider>
  </Story>
</template>
