<script setup lang="ts">
import type { ATooltipProviderProps } from '..';
import { ref } from 'vue';
import { ATooltipArrow, ATooltipContent, ATooltipPortal, ATooltipProvider, ATooltipRoot, ATooltipTrigger } from '..';

const props = defineProps<{
  tooltipProvider?: ATooltipProviderProps;
}>();

const toggleState = ref(false);
</script>

<template>
  <ATooltipProvider v-bind="props.tooltipProvider">
    <ATooltipRoot v-model:open="toggleState">
      <ATooltipTrigger
        class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex h-[35px] w-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        some info
      </ATooltipTrigger>
      <ATooltipPortal>
        <ATooltipContent
          :side-offset="5"
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 text-[15px] leading-none px-[15px] py-[10px] will-change-[transform,opacity] rounded-[4px] bg-white select-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
        >
          Add to library
          <ATooltipArrow class="fill-white" />
        </ATooltipContent>
      </ATooltipPortal>
    </ATooltipRoot>
  </ATooltipProvider>
</template>
