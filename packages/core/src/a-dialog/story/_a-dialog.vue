<script setup lang="ts">
import { ref } from 'vue';

import {
  ADialogClose,
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
} from '..';

const dialogOpen = ref(false);
</script>

<template>
  <ADialogRoot v-model:open="dialogOpen">
    <ADialogTrigger
      class="h-[35px] inline-flex items-center justify-center rounded-[4px] bg-white px-[15px] text-violet11 font-medium leading-none shadow-[0_2px_10px] shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
    >
      Edit profile
    </ADialogTrigger>
    <ADialogPortal>
      <Transition name="fade">
        <ADialogOverlay
          class="fixed inset-0 bg-blackA9"
        />
      </Transition>
      <Transition name="fade">
        <ADialogContent
          :is-escape-key-down-default="true"
          class="fixed left-[50%] top-[50%] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          @pointer-down-outside.prevent
        >
          <ADialogTitle class="m-0 text-[17px] text-mauve12 font-medium">
            Edit profile
          </ADialogTitle>
          <ADialogDescription
            class="mb-5 mt-[10px] text-[15px] text-mauve11 leading-normal"
          >
            Make changes to your profile here. Click save when you're done.
          </ADialogDescription>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="w-[90px] text-right text-[15px] text-violet11"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="h-[35px] w-full inline-flex flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              defaultValue="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="w-[90px] text-right text-[15px] text-violet11"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="h-[35px] w-full inline-flex flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              defaultValue="@peduarte"
            >
          </fieldset>
          <div class="mt-[25px] flex justify-end">
            <ADialogClose as-child>
              <button
                class="h-[35px] inline-flex items-center justify-center rounded-[4px] bg-green4 px-[15px] text-green11 font-medium leading-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
              >
                Save changes
              </button>
            </ADialogClose>
          </div>
          <ADialogClose
            class="absolute right-[10px] top-[10px] h-[25px] w-[25px] inline-flex appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          >
            <i class="i-lucide:x" />
          </ADialogClose>
        </ADialogContent>
      </Transition>
    </ADialogPortal>
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
