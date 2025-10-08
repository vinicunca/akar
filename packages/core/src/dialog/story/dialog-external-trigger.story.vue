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
          class="text-violet11 shadow-blackA7 hover:bg-mauve3 leading-none font-medium mr-2 px-[15px] rounded-[4px] bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          @click="open = true"
        >
          External Trigger
        </button>
        <ADialogRoot v-model:open="open">
          <ADialogTrigger
            class="text-violet11 shadow-blackA7 hover:bg-mauve3 leading-none font-medium px-[15px] rounded-[4px] bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            Main Trigger
          </ADialogTrigger>
          <ADialogPortal>
            <Transition name="fade">
              <ADialogOverlay class="bg-blackA9 inset-0 fixed" />
            </Transition>
            <Transition name="fade">
              <ADialogContent
                class="p-[25px] rounded-[6px] bg-white max-h-[85vh] max-w-[450px] w-[90vw] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] fixed focus:outline-none"
              >
                <ADialogTitle class="text-mauve12 text-[17px] font-medium m-0">
                  Edit profile
                </ADialogTitle>
                <ADialogDescription class="text-mauve11 text-[15px] leading-normal mb-5 mt-[10px]">
                  Make changes to your
                  profile here. Click save when you're done.
                </ADialogDescription>
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
      </div>
    </Variant>
  </Story>
</template>
