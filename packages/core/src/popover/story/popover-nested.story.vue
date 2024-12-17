<script setup lang="ts">
import { ref } from 'vue'
import {
  APopoverArrow,
  APopoverClose,
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from '..'

const buttonRef = ref()
</script>

<template>
  <Story
    title="Popover/Nested"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="relative flex items-center justify-center flex-col h-[300vh]">
        <button
          type="button"
          class="border fixed top-6 left-6 text-white"
          @click="buttonRef.$el.focus()"
        >
          Focus popover button
        </button>

        <APopoverRoot>
          <APopoverTrigger
            ref="buttonRef"
            class="inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
          >
            Open popover
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              side="bottom"
              :side-offset="5"
              class="rounded p-5 w-[260px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
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
                class="h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
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
