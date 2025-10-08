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
  <Story
    title="Popover/BodyLock"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="mt-20 h-[200vh]">
        <APopoverRoot
          v-model:open="toggleState"
          :modal="false"
        >
          <APopoverTrigger
            class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex h-[35px] w-[35px] cursor-default shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Update dimensions"
          >
            <button>
              <Icon icon="radix-icons:mixer-horizontal" />
            </button>
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              side="bottom"
              :side-offset="5"
              class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade p-5 will-change-[transform,opacity] rounded bg-white h-[150px] w-[260px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] overflow-auto"
            >
              <div class="flex flex-col gap-2.5">
                <p
                  class="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5"
                >
                  Dimensions
                </p>
                <fieldset class="flex gap-5 items-center">
                  <label
                    class="text-violet11 text-[13px] w-[75px]"
                    for="width"
                  >
                    Width
                  </label>
                  <input
                    id="width"
                    class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[13px] leading-none px-2.5 outline-none rounded inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
                    defaultValue="100%"
                  >
                </fieldset>
                <fieldset class="flex gap-5 items-center">
                  <label
                    class="text-violet11 text-[13px] w-[75px]"
                    for="maxWidth"
                  >
                    Max. width
                  </label>
                  <input
                    id="maxWidth"
                    class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[13px] leading-none px-2.5 outline-none rounded inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
                    defaultValue="300px"
                  >
                </fieldset>
                <fieldset class="flex gap-5 items-center">
                  <label
                    class="text-violet11 text-[13px] w-[75px]"
                    for="height"
                  >
                    Height
                  </label>
                  <input
                    id="height"
                    class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[13px] leading-none px-2.5 outline-none rounded inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
                    defaultValue="25px"
                  >
                </fieldset>
                <fieldset class="flex gap-5 items-center">
                  <label
                    class="text-violet11 text-[13px] w-[75px]"
                    for="maxHeight"
                  >
                    Max. height
                  </label>
                  <input
                    id="maxHeight"
                    class="text-violet11 shadow-violet7 focus:shadow-violet8 text-[13px] leading-none px-2.5 outline-none rounded inline-flex flex-1 h-[25px] w-full shadow-[0_0_0_1px] items-center justify-center focus:shadow-[0_0_0_2px]"
                    defaultValue="none"
                  >
                </fieldset>
              </div>
              <APopoverClose
                class="text-violet11 hover:bg-violet4 focus:shadow-violet7 outline-none rounded-full inline-flex h-[25px] w-[25px] cursor-default items-center right-[5px] top-[5px] justify-center absolute focus:shadow-[0_0_0_2px]"
                aria-label="Close"
              >
                <Icon icon="radix-icons:cross-2" />
              </APopoverClose>
              <APopoverArrow class="fill-white" />
            </APopoverContent>
          </APopoverPortal>
        </APopoverRoot>
      </div>
    </Variant>
  </Story>
</template>
