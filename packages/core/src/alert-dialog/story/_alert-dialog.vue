<script setup lang="ts">
import { ref } from 'vue';
import {
  AAlertDialogAction,
  AAlertDialogCancel,
  AAlertDialogContent,
  AAlertDialogDescription,
  AAlertDialogOverlay,
  AAlertDialogPortal,
  AAlertDialogRoot,
  AAlertDialogTitle,
  AAlertDialogTrigger,
} from '..';

const isOpen = ref(false);
</script>

<template>
  <AAlertDialogRoot v-model:open="isOpen">
    <AAlertDialogTrigger
      class="text-violet11 hover:bg-mauve3 shadow-blackA7 leading-none font-medium px-[15px] outline-none rounded-[4px] bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
    >
      Open
    </AAlertDialogTrigger>
    <AAlertDialogPortal>
      <AAlertDialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow inset-0 fixed"
      />
      <AAlertDialogContent
        class="data-[state=open]:animate-contentShow p-[25px] rounded-[6px] bg-white max-h-[85vh] max-w-[500px] w-[90vw] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] fixed focus:outline-none"
      >
        <AAlertDialogTitle class="text-mauve12 text-[17px] font-medium m-0">
          Title
        </AAlertDialogTitle>
        <AAlertDialogDescription
          class="text-mauve11 text-[15px] leading-normal mb-5 mt-4"
        >
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AAlertDialogDescription>
        <button>hihi</button>
        <div class="flex gap-[25px] justify-end">
          <AAlertDialogCancel
            class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 leading-none font-medium px-[15px] outline-none rounded-[4px] inline-flex h-[35px] items-center justify-center focus:shadow-[0_0_0_2px]"
          >
            Cancel
          </AAlertDialogCancel>
          <AAlertDialogAction
            class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 leading-none font-medium px-[15px] outline-none rounded-[4px] inline-flex h-[35px] items-center justify-center focus:shadow-[0_0_0_2px]"
          >
            Yes, delete account
          </AAlertDialogAction>
        </div>
      </AAlertDialogContent>
    </AAlertDialogPortal>
  </AAlertDialogRoot>
</template>
