<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  APopoverArrow,
  APopoverClose,
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from '..';

const toggleState = ref(false);
</script>

<template>
  <APopoverRoot
    v-model:open="toggleState"
    :modal="false"
  >
    <APopoverTrigger
      class="text-violet11 shadow-blackA7 h-[35px] w-[35px] inline-flex cursor-default items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      aria-label="Update dimensions"
    >
      <Icon icon="radix-icons:mixer-horizontal" />
      Open
    </APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        side="bottom"
        :side-offset="5"
        class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
      >
        <div class="flex flex-col gap-2.5">
          <p
            class="text-mauve12 mb-2.5 text-[15px] font-medium leading-[19px]"
          >
            Dimensions
          </p>
        </div>
        <APopoverClose
          class="text-violet11 absolute right-[5px] top-[5px] h-[25px] w-[25px] inline-flex cursor-default items-center justify-center rounded-full outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
          aria-label="Close"
        >
          Close
        </APopoverClose>
        <APopoverArrow class="fill-white" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
