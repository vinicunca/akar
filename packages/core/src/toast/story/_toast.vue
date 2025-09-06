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
      class="h-[35px] inline-flex items-center justify-center rounded bg-white px-[15px] text-[15px] text-violet11 font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      @click="handleClick"
    >
      Add to calendar
    </button>

    <AToastRoot
      v-model:open="open"
      class="data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut [grid-template-areas:_'title_action'_'description_action'] grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--akar-toast-swipe-move-x)]"
    >
      <AToastTitle class="[grid-area:_title] mb-[5px] text-[15px] text-slate12 font-medium">
        Scheduled: Catch up
      </AToastTitle>
      <AToastDescription as-child>
        <time
          class="[grid-area:_description] m-0 text-[13px] text-slate11 leading-[1.3]"
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
        <button class="h-[25px] inline-flex items-center justify-center rounded bg-green2 px-[10px] text-xs color-green11 font-medium leading-[25px] shadow-[inset_0_0_0_1px] shadow-green7 focus:shadow-[0_0_0_2px] focus:shadow-green8 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8">
          Close
        </button>
      </AToastAction>
    </AToastRoot>
    <AToastViewport class="[--viewport-padding:_25px] fixed bottom-0 right-0 z-[2147483647] m-0 max-w-[100vw] w-[390px] flex flex-col list-none gap-[10px] p-[var(--viewport-padding)] outline-none" />
  </AToastProvider>
</template>
