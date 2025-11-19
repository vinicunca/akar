<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectItemText,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectScrollDownButton,
  ASelectScrollUpButton,
  ASelectTrigger,
  ASelectValue,
  ASelectViewport,
} from '..';
import {
  ADialogClose,
  ADialogContent,
  ADialogRoot,
  ADialogTrigger,
} from '../../dialog';

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
</script>

<template>
  <Story
    title="Select/WithinDialog"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div>
        <ADialogRoot>
          <ADialogTrigger>Open Dialog</ADialogTrigger>
          <ADialogContent>
            <ASelectRoot>
              <ASelectTrigger
                class="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
                aria-label="Customise options"
              >
                <ASelectValue placeholder="Please select a fruit" />
                <Icon
                  icon="radix-icons:chevron-down"
                  class="h-4 w-4"
                />
              </ASelectTrigger>

              <ASelectPortal>
                <ASelectContent
                  class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden"
                  :side-offset="5"
                  position="popper"
                >
                  <ASelectScrollUpButton
                    class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
                  >
                    <Icon icon="radix-icons:chevron-up" />
                  </ASelectScrollUpButton>

                  <ASelectViewport class="p-[5px]">
                    <ASelectLabel
                      class="text-mauve11 text-xs leading-[25px] px-[25px]"
                    >
                      Fruits
                    </ASelectLabel>
                    <ASelectGroup>
                      <ASelectItem
                        v-for="(option, index) in options"
                        :key="index"
                        class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                        :value="option"
                      >
                        <ASelectItemIndicator
                          class="inline-flex w-[25px] items-center left-0 justify-center absolute"
                        >
                          <Icon icon="radix-icons:check" />
                        </ASelectItemIndicator>
                        <ASelectItemText>
                          {{ option }}
                        </ASelectItemText>
                      </ASelectItem>
                    </ASelectGroup>
                  </ASelectViewport>

                  <ASelectScrollDownButton
                    class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
                  >
                    <Icon icon="radix-icons:chevron-down" />
                  </ASelectScrollDownButton>
                </ASelectContent>
              </ASelectPortal>
            </ASelectRoot>

            <ADialogClose>Close dialog</ADialogClose>
          </ADialogContent>
        </ADialogRoot>
      </div>
    </Variant>
  </Story>
</template>
