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

const open = ref(false);
</script>

<template>
  <Story
    title="Dialog/External Trigger"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div>
        <button
          class="text-violet11 shadow-blackA7 hover:bg-mauve3 mr-2 h-[35px] inline-flex items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          @click="open = true"
        >
          External Trigger
        </button>
        <ADialogRoot v-model:open="open">
          <ADialogTrigger
            class="text-violet11 shadow-blackA7 hover:bg-mauve3 h-[35px] inline-flex items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            Main Trigger
          </ADialogTrigger>
          <ADialogPortal>
            <Transition name="fade">
              <ADialogOverlay class="bg-blackA9 fixed inset-0" />
            </Transition>
            <Transition name="fade">
              <ADialogContent
                class="fixed left-[50%] top-[50%] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
              >
                <ADialogTitle class="text-mauve12 m-0 text-[17px] font-medium">
                  Edit profile
                </ADialogTitle>
                <ADialogDescription class="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
                  Make changes to your
                  profile here. Click save when you're done.
                </ADialogDescription>
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
      </div>
    </Variant>
  </Story>
</template>
