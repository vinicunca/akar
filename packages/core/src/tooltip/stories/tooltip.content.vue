<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ATooltipArrow, ATooltipContent, ATooltipPortal, ATooltipProvider, ATooltipRoot, ATooltipTrigger } from '..';

const lastEvent = ref('');
</script>

<template>
  <Story
    title="Tooltip/Content"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="Aria ALabel">
      <div class="grid h-28 w-full place-content-center">
        <ATooltipProvider :disable-closing-trigger="true">
          <ATooltipRoot
            :delay-duration="1000"
            :default-open="true"
          >
            <ATooltipTrigger
              class="text-violet11 shadow-blackA7 h-[35px] w-[35px] inline-flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon icon="radix-icons:plus" />
            </ATooltipTrigger>
            <ATooltipPortal>
              <ATooltipContent
                as-child
                align="start"
                side="bottom"
                :align-offset="20"
                aria-label="label tooltip content"
                :side-offset="5"
                class="text-violet11 will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
              >
                <ul>
                  <h4>Add to library</h4>
                  <p>
                    We will make sure that the files synchronise <b>immediately</b>
                  </p>
                  <ATooltipArrow class="fill-white" />
                </ul>
              </ATooltipContent>
            </ATooltipPortal>
          </ATooltipRoot>
        </ATooltipProvider>
      </div>
    </Variant>

    <Variant title="Events">
      <div class="grid h-28 w-full place-content-center">
        <p class="mb-4">
          <template v-if="lastEvent">
            The event <code>{{ lastEvent }}</code> has been triggered
          </template>
          <template v-else>
            No event has been emitted yet
          </template>
        </p>

        <ATooltipProvider>
          <ATooltipRoot>
            <ATooltipTrigger
              class="text-violet11 shadow-blackA7 h-[35px] w-[35px] inline-flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
              @click.prevent
            >
              <Icon icon="radix-icons:plus" />
            </ATooltipTrigger>
            <Teleport to="body">
              <ATooltipContent
                :side-offset="5"
                class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 will-change-[transform,opacity] select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
                @escape-key-down="lastEvent = '@on-escape-key-down'"
                @pointer-down-outside="lastEvent = '@pointer-down-outside'"
              >
                Add to library
                <ATooltipArrow class="fill-white" />
              </ATooltipContent>
            </Teleport>
          </ATooltipRoot>
        </ATooltipProvider>
      </div>
    </Variant>
  </Story>
</template>
