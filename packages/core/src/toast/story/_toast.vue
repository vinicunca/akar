<script setup lang="ts">
import { ref } from 'vue';
import { AToastAction, AToastDescription, AToastProvider, AToastRoot, AToastTitle, AToastViewport } from '..';

const open = ref(false);
const eventDateRef = ref(new Date());
const timerRef = ref(0);

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

function handleClick() {
  open.value = false;
  window.clearTimeout(timerRef.value);
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway();
    open.value = true;
  }, 100);
}
</script>

<template>
  <AToastProvider swipe-direction="left">
    <button
      class="text-violet11 shadow-blackA7 hover:bg-mauve3 text-[15px] leading-[35px] font-medium px-[15px] outline-none rounded bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
      @click="handleClick"
    >
      Add to calendar
    </button>

    <AToastRoot
      v-model:open="open"
      class="data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut p-[15px] rounded-md bg-white gap-x-[15px] grid grid-cols-[auto_max-content] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] items-center data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--akar-toast-swipe-move-x)]"
    >
      <AToastTitle class="text-slate12 text-[15px] font-medium mb-[5px] [grid-area:_title]">
        Scheduled: Catch up
      </AToastTitle>
      <AToastDescription as-child>
        <time
          class="text-slate11 text-[13px] leading-[1.3] m-0 [grid-area:_description]"
          :dateTime="eventDateRef.toISOString()"
        >
          {{ prettyDate(eventDateRef) }}
        </time>
      </AToastDescription>
      <AToastAction
        class="[grid-area:_action]"
        as-child
        alt-text="Goto schedule to undo"
      >
        <button class="bg-green2 color-green11 shadow-green7 focus:shadow-green8 hover:shadow-green8 text-xs leading-[25px] font-medium px-[10px] rounded inline-flex h-[25px] shadow-[inset_0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px] hover:shadow-[inset_0_0_0_1px]">
          Close
        </button>
      </AToastAction>
    </AToastRoot>
    <AToastViewport class="m-0 p-[var(--viewport-padding)] outline-none list-none flex flex-col gap-[10px] max-w-[100vw] w-[390px] [--viewport-padding:_25px] bottom-0 right-0 fixed z-[2147483647]" />
  </AToastProvider>
</template>
