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
    title="APopover/Nested"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="relative h-[300vh] flex flex-col items-center justify-center">
        <button
          type="button"
          class="fixed left-6 top-6 border text-white"
          @click="buttonRef.$el.focus()"
        >
          Focus popover button
        </button>

        <APopoverRoot>
          <APopoverTrigger
            ref="buttonRef"
            class="inline-flex cursor-default items-center justify-center bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            Open popover
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              side="bottom"
              :side-offset="5"
              class="will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]"
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
                class="h-[25px] w-[25px] inline-flex cursor-default items-center justify-center text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
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
