<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
} from '..'
import {
  ADialogClose,
  ADialogContent,
  ADialogRoot,
  ADialogTrigger,
} from '~~/dialog'

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
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
                class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
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
                  class="min-w-[160px] bg-white overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  :side-offset="5"
                  position="popper"
                >
                  <ASelectScrollUpButton
                    class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                  >
                    <Icon icon="radix-icons:chevron-up" />
                  </ASelectScrollUpButton>

                  <ASelectViewport class="p-[5px]">
                    <ASelectLabel
                      class="px-[25px] text-xs leading-[25px] text-mauve11"
                    >
                      Fruits
                    </ASelectLabel>
                    <ASelectGroup>
                      <ASelectItem
                        v-for="(option, index) in options"
                        :key="index"
                        class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                        :value="option"
                      >
                        <ASelectItemIndicator
                          class="absolute left-0 w-[25px] inline-flex items-center justify-center"
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
                    class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
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
