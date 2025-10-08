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
      class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex h-[35px] w-[35px] cursor-default shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
      aria-label="Update dimensions"
    >
      <Icon icon="radix-icons:mixer-horizontal" />
      Open
    </APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        side="bottom"
        :side-offset="5"
        class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade p-5 will-change-[transform,opacity] rounded bg-white w-[260px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
      >
        <div class="flex flex-col gap-2.5">
          <p
            class="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5"
          >
            Dimensions
          </p>
        </div>
        <APopoverClose
          class="text-violet11 hover:bg-violet4 focus:shadow-violet7 outline-none rounded-full inline-flex h-[25px] w-[25px] cursor-default items-center right-[5px] top-[5px] justify-center absolute focus:shadow-[0_0_0_2px]"
          aria-label="Close"
        >
          Close
        </APopoverClose>
        <APopoverArrow class="fill-white" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
