<script setup lang="ts">
import { ref } from 'vue';
import {
  AHoverCardArrow,
  AHoverCardContent,
  AHoverCardPortal,
  AHoverCardRoot,
  AHoverCardTrigger,
} from '..';

const hoverState = ref(false);
</script>

<template>
  <AHoverCardRoot
    v-model:open="hoverState"
    :open-delay="100"
  >
    <AHoverCardTrigger
      class="outline-none rounded-full inline-block cursor-pointer shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:shadow-[0_0_0_2px_white]"
      href="https://twitter.com/unovue"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        class="rounded-full h-[45px] w-[45px] block"
        src="https://pbs.twimg.com/profile_images/1833445381986045952/jwoHkIIq_400x400.jpg"
        alt="Radix UI"
      >
    </AHoverCardTrigger>
    <AHoverCardPortal>
      <Transition name="fade">
        <AHoverCardContent
          class="p-5 rounded-md bg-white w-[300px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
          :side-offset="5"
          as-child
        >
          <div>
            <div class="flex flex-col gap-[7px]">
              <img
                class="rounded-full h-[60px] w-[60px] block"
                src="https://pbs.twimg.com/profile_images/1833445381986045952/jwoHkIIq_400x400.jpg"
                alt="Radix UI"
              >
              <div class="flex flex-col gap-[15px]">
                <div>
                  <div
                    class="text-mauve12 text-[15px] leading-[1.5] font-medium m-0"
                  >
                    Radix
                  </div>
                  <div class="text-mauve10 text-[15px] leading-[1.5] m-0">
                    @radix_ui
                  </div>
                </div>
                <div class="text-mauve12 text-[15px] leading-[1.5] m-0">
                  Components, icons, colors, and templates for building
                  high-quality, accessible UI. Free and open-source.
                </div>
                <div class="flex gap-[15px]">
                  <div class="flex gap-[5px]">
                    <div
                      class="text-mauve12 text-[15px] leading-[1.5] font-medium m-0"
                    >
                      0
                    </div>
                    <div class="text-mauve10 text-[15px] leading-[1.5] m-0">
                      Following
                    </div>
                  </div>
                  <div class="flex gap-[5px]">
                    <div
                      class="text-mauve12 text-[15px] leading-[1.5] font-medium m-0"
                    >
                      2,900
                    </div>
                    <div class="text-mauve10 text-[15px] leading-[1.5] m-0">
                      Followers
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AHoverCardArrow
              class="fill-white"
              :width="8"
            />
          </div>
        </AHoverCardContent>
      </Transition>
    </AHoverCardPortal>
  </AHoverCardRoot>
</template>
