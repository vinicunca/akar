<script setup lang="ts">
import { AToastAction, AToastDescription, AToastPortal, AToastProvider, AToastRoot, AToastTitle, AToastViewport } from 'akar';
import { ref } from 'vue';

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
  <AToastProvider>
    <button
      class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center focus:outline-none active:bg-background-elevated hover:bg-background-elevated focus-visible:(ring-2 ring-ring-inverted)"
      @click="handleClick"
    >
      Add to calendar
    </button>

    <AToastRoot
      v-model:open="open"
      class="p-[15px] border rounded-lg bg-background gap-x-[15px] grid grid-cols-[auto_max-content] shadow-sm [grid-template-areas:_'title_action'_'description_action'] items-center z-100 data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[state=open]:(animate-in animate-duration-280 slide-in-from-bottom)"
    >
      <AToastTitle class="text-slate12 text-sm font-medium mb-[5px] [grid-area:_title]">
        Scheduled: Catch up
      </AToastTitle>
      <AToastDescription as-child>
        <time
          class="text-slate11 text-xs leading-[1.3] m-0 [grid-area:_description]"
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
        <button class="bg-green2 text-green11 shadow-green7 hover:shadow-green8 focus:shadow-green8 text-xs leading-[25px] font-medium px-[10px] rounded-md inline-flex h-[25px] shadow-[inset_0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px] hover:shadow-[inset_0_0_0_1px]">
          Undo
        </button>
      </AToastAction>
    </AToastRoot>

    <AToastPortal>
      <AToastViewport class="m-0 p-[var(--viewport-padding)] outline-none list-none flex flex-col gap-[10px] max-w-[100vw] w-[390px] [--viewport-padding:_25px] bottom-0 right-0 fixed z-[2147483647]" />
    </AToastPortal>
  </AToastProvider>
</template>
