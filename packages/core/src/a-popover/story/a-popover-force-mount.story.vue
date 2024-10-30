<script setup lang="ts">
import {
  APopoverArrow,
  APopoverClose,
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from '..';
</script>

<template>
  <Story
    title="APopover/ForceMount"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="h-[110vh] flex flex-col items-center justify-center">
        <APopoverRoot>
          <APopoverTrigger
            class="h-[35px] w-[35px] inline-flex cursor-default items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Update dimensions"
          >
            <i class="i-radix-icons:mixer-horizontal" />
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              :force-mount="true"
              side="bottom"
              :side-offset="5"
              class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
            >
              <APopoverClose
                class="h-[25px] w-[25px] inline-flex cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                aria-label="Close"
              >
                Close
              </APopoverClose>
              <APopoverArrow class="fill-white" />
            </APopoverContent>
          </APopoverPortal>
        </APopoverRoot>

        <textarea
          class="mt-6 h-[100px] w-[500px] text-gray-600"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
    </Variant>
  </Story>
</template>
