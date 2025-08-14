<script setup lang="ts">
import { Icon } from '@iconify/vue';
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
    title="Popover/ForceMount"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="flex flex-col h-[110vh] items-center justify-center">
        <APopoverRoot>
          <APopoverTrigger
            class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex h-[35px] w-[35px] cursor-default shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Update dimensions"
          >
            <Icon icon="radix-icons:mixer-horizontal" />
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              :force-mount="true"
              side="bottom"
              :side-offset="5"
              class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade p-5 will-change-[transform,opacity] rounded bg-white w-[260px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
            >
              <APopoverClose
                class="text-violet11 hover:bg-violet4 focus:shadow-violet7 outline-none rounded-full inline-flex h-[25px] w-[25px] cursor-default items-center justify-center focus:shadow-[0_0_0_2px]"
                aria-label="Close"
              >
                Close
              </APopoverClose>
              <APopoverArrow class="fill-white" />
            </APopoverContent>
          </APopoverPortal>
        </APopoverRoot>

        <textarea
          class="text-gray-600 mt-6 h-[100px] w-[500px]"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
    </Variant>
  </Story>
</template>
