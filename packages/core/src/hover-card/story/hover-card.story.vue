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
  <Story
    title="Hover Card/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <AHoverCardRoot v-model:open="hoverState">
        <AHoverCardTrigger
          class="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
          href="https://twitter.com/unovue"
          target="_blank"
          rel="noreferrer noopener"
          as-child
        >
          <a>
            <img
              class="block h-[45px] w-[45px] rounded-full"
              src="https://pbs.twimg.com/profile_images/1833445381986045952/jwoHkIIq_400x400.jpg"
              alt="Radix UI"
            >
          </a>
        </AHoverCardTrigger>
        <AHoverCardPortal>
          <Transition name="fade">
            <AHoverCardContent
              class="w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
              :side-offset="5"
              as-child
            >
              <div>
                <div class="flex flex-col gap-[7px]">
                  <img
                    class="block h-[60px] w-[60px] rounded-full"
                    src="https://pbs.twimg.com/profile_images/1833445381986045952/jwoHkIIq_400x400.jpg"
                    alt="Radix UI"
                  >
                  <div class="flex flex-col gap-[15px]">
                    <div>
                      <div
                        class="m-0 text-[15px] text-mauve12 font-medium leading-[1.5]"
                      >
                        Radix
                      </div>
                      <div class="m-0 text-[15px] text-mauve10 leading-[1.5]">
                        @radix_ui
                      </div>
                    </div>
                    <div class="m-0 text-[15px] text-mauve12 leading-[1.5]">
                      Components, icons, colors, and templates for building
                      high-quality, accessible UI. Free and open-source.
                    </div>
                    <div class="flex gap-[15px]">
                      <div class="flex gap-[5px]">
                        <div
                          class="m-0 text-[15px] text-mauve12 font-medium leading-[1.5]"
                        >
                          0
                        </div>
                        <div class="m-0 text-[15px] text-mauve10 leading-[1.5]">
                          Following
                        </div>
                      </div>
                      <div class="flex gap-[5px]">
                        <div
                          class="m-0 text-[15px] text-mauve12 font-medium leading-[1.5]"
                        >
                          2,900
                        </div>
                        <div class="m-0 text-[15px] text-mauve10 leading-[1.5]">
                          Followers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <AHoverCardArrow
                  class="fill-white"
                  size="8"
                />
              </div>
            </AHoverCardContent>
          </Transition>
        </AHoverCardPortal>
      </AHoverCardRoot>
    </Variant>
  </Story>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
