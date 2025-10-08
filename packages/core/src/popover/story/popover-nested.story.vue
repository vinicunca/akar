<script setup lang="ts">
import { ref } from 'vue';
import {
  APopoverArrow,
  APopoverClose,
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from '..';

const buttonRef = ref();
</script>

<template>
  <Story
    title="Popover/Nested"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="flex flex-col h-[300vh] items-center justify-center relative">
        <button
          type="button"
          class="text-white border left-6 top-6 fixed"
          @click="buttonRef.$el.focus()"
        >
          Focus popover button
        </button>

        <APopoverRoot>
          <APopoverTrigger
            ref="buttonRef"
            class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none bg-white inline-flex cursor-default shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            Open popover
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              side="bottom"
              :side-offset="5"
              class="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade p-5 will-change-[transform,opacity] rounded w-[260px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]"
              style="background-color: crimson"
            >
              <APopoverRoot>
                <APopoverTrigger class="{triggerClass()}">
                  Open nested popover
                </APopoverTrigger>
                <APopoverPortal>
                  <APopoverContent
                    side="top"
                    align="center"
                    :side-offset="5"
                    :style="{ backgroundColor: 'green' }"
                  >
                    <APopoverClose>close</APopoverClose>
                    <APopoverArrow
                      :width="20"
                      :height="10"
                      :offset="20"
                      :style="{ fill: 'green' }"
                    />
                  </APopoverContent>
                </APopoverPortal>
              </APopoverRoot>

              <APopoverClose
                class="text-violet11 hover:bg-violet4 focus:shadow-violet7 outline-none inline-flex h-[25px] w-[25px] cursor-default items-center justify-center focus:shadow-[0_0_0_2px]"
                aria-label="Close"
              >
                Close
              </APopoverClose>
              <APopoverArrow style="fill: crimson" />
            </APopoverContent>
          </APopoverPortal>
        </APopoverRoot>
      </div>
    </Variant>
  </Story>
</template>
