<script setup lang="ts">
import { APopoverArrow, APopoverContent, APopoverPortal, APopoverRoot, APopoverTrigger } from '../../popover';
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
        class="data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade p-5 will-change-[transform,opacity] rounded bg-white w-[260px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
      >
        <slot />

        <APopoverArrow class="fill-white" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
