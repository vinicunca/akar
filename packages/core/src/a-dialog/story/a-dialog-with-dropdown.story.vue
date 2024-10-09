<script setup lang="ts">
import { Icon } from '@iconify/vue';

import {
  ADialogClose,
  ADialogContent,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTrigger,
} from '..';
import DropdownMenu from '../../DropdownMenu/story/_DropdownMenu.vue';
</script>

<template>
  <Story
    title="ADialog/With Dropdown"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ADialogRoot>
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
              class="fixed left-[50%] top-[50%] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
            >
              <DropdownMenu />
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
    </Variant>
  </Story>
</template>
