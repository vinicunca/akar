<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  APopoverArrow,
  APopoverClose,
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from 'akar';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger
      class="text-grass11 dark:focus:shadow-green8 border rounded-full bg-white inline-flex h-[35px] w-[35px] cursor-default shadow-sm items-center justify-center focus:outline-none hover:bg-stone-50 focus:shadow-[0_0_0_2px] focus:shadow-black"
      aria-label="Update dimensions"
    >
      <Icon icon="radix-icons:mixer-horizontal" />
    </APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        side="bottom"
        :side-offset="5"
        class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade p-5 will-change-[transform,opacity] border rounded-lg bg-white w-[260px] shadow-sm"
      >
        <div class="flex flex-col gap-2.5">
          <p class="text-mauve12 text-sm leading-[19px] font-semibold mb-2.5">
            Dimensions
          </p>
          <fieldset class="flex gap-5 items-center">
            <label
              class="text-grass11 text-xs w-[75px]"
              for="width"
            > Width </label>
            <input
              id="width"
              class="text-grass11 shadow-green7 focus:shadow-green8 text-xs leading-none px-2.5 outline-none rounded bg-stone-50 inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
              defaultValue="100%"
            >
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label
              class="text-grass11 text-xs w-[75px]"
              for="maxWidth"
            > Max. width </label>
            <input
              id="maxWidth"
              class="text-grass11 shadow-green7 focus:shadow-green8 text-xs leading-none px-2.5 outline-none rounded bg-stone-50 inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
              defaultValue="300px"
            >
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label
              class="text-grass11 text-xs w-[75px]"
              for="height"
            > Height </label>
            <input
              id="height"
              class="text-grass11 shadow-green7 focus:shadow-green8 text-xs leading-none px-2.5 outline-none rounded bg-stone-50 inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
              defaultValue="25px"
            >
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label
              class="text-grass11 text-xs w-[75px]"
              for="maxHeight"
            > Max. height </label>
            <input
              id="maxHeight"
              class="text-grass11 shadow-green7 focus:shadow-green8 text-xs leading-none px-2.5 outline-none rounded bg-stone-50 inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
              defaultValue="none"
            >
          </fieldset>
        </div>
        <APopoverClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 outline-none rounded-full inline-flex h-[25px] w-[25px] cursor-default items-center right-[8px] top-[8px] justify-center absolute focus:shadow-[0_0_0_2px]"
          aria-label="Close"
        >
          <Icon icon="radix-icons:cross-2" />
        </APopoverClose>
        <APopoverArrow class="fill-white stroke-gray-200" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
