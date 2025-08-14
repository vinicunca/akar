<script setup lang="ts">
import {
  ATooltipContent,
  ATooltipPortal,
  ATooltipRoot,
  ATooltipTrigger,
} from 'akar';

defineProps<{
  content: string;
}>();
</script>

<template>
  <ATooltipRoot>
    <ATooltipTrigger
      class="text-muted-foreground rounded-lg bg-transparent inline-flex h-[35px] w-[35px] items-center justify-center focus:text-foreground hover:text-foreground focus:bg-background hover:bg-background"
      as-child
    >
      <slot />
    </ATooltipTrigger>
    <ATooltipPortal>
      <ATooltipContent
        class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-xs text-foreground leading-none px-[15px] py-[10px] will-change-[transform,opacity] border border-muted rounded-md bg-background select-none"
        :side-offset="6"
      >
        {{ content }}
      </ATooltipContent>
    </ATooltipPortal>
  </ATooltipRoot>
</template>
