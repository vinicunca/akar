<script setup lang="ts">
import { ref } from 'vue';
import { ATooltipArrow, ATooltipContent, ATooltipPortal, ATooltipProvider, ATooltipRoot, ATooltipTrigger } from '..';

const toggleState = ref(false);
</script>

<template>
  <ATooltipProvider>
    <ATooltipRoot v-model:open="toggleState">
      <ATooltipTrigger
        class="h-[35px] w-[35px] inline-flex items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        some info
      </ATooltipTrigger>
      <ATooltipPortal>
        <ATooltipContent
          :side-offset="5"
          class="will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] text-violet11 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
        >
          Add to library
          <ATooltipArrow class="fill-white" />
        </ATooltipContent>
      </ATooltipPortal>
    </ATooltipRoot>
  </ATooltipProvider>
</template>
