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
      class="text-violet11 shadow-blackA7 hover:bg-mauve3 leading-none font-medium px-[15px] rounded-[4px] bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
    >
      Edit profile
    </ADialogTrigger>
    <ADialogPortal>
      <Transition name="fade">
        <ADialogOverlay
          class="bg-blackA9 inset-0 fixed"
        />
      </Transition>
      <Transition name="fade">
        <ADialogContent
          :is-escape-key-down-default="true"
          class="p-[25px] rounded-[6px] bg-white max-h-[85vh] max-w-[450px] w-[90vw] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] fixed focus:outline-none"
          @pointer-down-outside.prevent
        >
          <ADialogTitle class="text-mauve12 text-[17px] font-medium m-0">
            Edit profile
          </ADialogTitle>
          <ADialogDescription
            class="text-mauve11 text-[15px] leading-normal mb-5 mt-[10px]"
          >
            Make changes to your profile here. Click save when you're done.
          </ADialogDescription>
          <fieldset class="mb-[15px] flex gap-5 items-center">
            <label
              class="text-violet11 text-[15px] text-right w-[90px]"
              for="name"
            >
              Name
            </label>
            <input
              id="name"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-[10px] outline-none rounded-[4px] inline-flex flex-1 h-[35px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
              defaultValue="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex gap-5 items-center">
            <label
              class="text-violet11 text-[15px] text-right w-[90px]"
              for="username"
            >
              Username
            </label>
            <input
              id="username"
              class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[15px] leading-none px-[10px] outline-none rounded-[4px] inline-flex flex-1 h-[35px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
              defaultValue="@peduarte"
            >
          </fieldset>
          <div class="mt-[25px] flex justify-end">
            <ADialogClose as-child>
              <button
                class="bg-green4 color-green11 hover:bg-green5 focus:shadow-green7 leading-none font-medium px-[15px] rounded-[4px] inline-flex h-[35px] items-center justify-center focus:outline-none focus:shadow-[0_0_0_2px]"
              >
                Save changes
              </button>
            </ADialogClose>
          </div>
          <ADialogClose
            class="text-violet11 hover:bg-violet4 focus:shadow-violet7 appearance-none rounded-full inline-flex h-[25px] w-[25px] items-center right-[10px] top-[10px] justify-center absolute focus:outline-none focus:shadow-[0_0_0_2px]"
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
