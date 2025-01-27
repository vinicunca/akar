<script setup lang="ts">
import { Icon } from '@iconify/vue';
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
      class="text-violet11 shadow-blackA7 hover:bg-mauve3 h-[35px] inline-flex items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
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
          <ADialogTitle class="text-mauve12 m-0 text-[17px] font-medium">
            Edit profile
          </ADialogTitle>
          <ADialogDescription
            class="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal"
          >
            Make changes to your profile here. Click save when you're done.
          </ADialogDescription>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="text-violet11 w-[90px] text-right text-[15px]"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="text-violet11 h-[35px] w-full inline-flex flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              defaultValue="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="text-violet11 w-[90px] text-right text-[15px]"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="text-violet11 h-[35px] w-full inline-flex flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
              defaultValue="@peduarte"
            >
          </fieldset>
          <div class="mt-[25px] flex justify-end">
            <ADialogClose as-child>
              <button
                class="text-green11 h-[35px] inline-flex items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
              >
                Save changes
              </button>
            </ADialogClose>
          </div>
          <ADialogClose
            class="text-violet11 absolute right-[10px] top-[10px] h-[25px] w-[25px] inline-flex appearance-none items-center justify-center rounded-full hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          >
            <Icon icon="lucide:x" />
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
