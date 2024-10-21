<script setup lang="ts">
import { APopoverArrow, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from '~~/a-popover';
</script>

<template>
  <APopoverRoot :modal="false">
    <APopoverTrigger
      as-child
    >
      <slot name="trigger" />
    </APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        side="bottom"
        :side-offset="5"
        class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
      >
        <slot />

        <APopoverArrow class="fill-white" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
