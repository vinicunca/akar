<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import type {
  ADropdownMenuItemEmits,
} from '..'
import {
  ADropdownMenuArrow,
  ADropdownMenuCheckboxItem,
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuItemIndicator,
  ADropdownMenuLabel,
  ADropdownMenuPortal,
  ADropdownMenuRadioGroup,
  ADropdownMenuRadioItem,
  ADropdownMenuRoot,
  ADropdownMenuSeparator,
  ADropdownMenuTrigger,
} from '..'
import { useEmitAsProps } from '~~/shared'

const props = defineProps<{ defaultOpen?: boolean }>()

const emits = defineEmits<ADropdownMenuItemEmits>()
const toggleState = ref(props.defaultOpen ?? false)
const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')

function handleClick() {
  // alert("hello!");
}

function handleCheck(ev: any) {
  // checkboxOne.value = ev;
  // eslint-disable-next-line no-console
  console.log(ev)
}
</script>

<template>
  <div>
    <ADropdownMenuRoot v-model:open="toggleState">
      <ADropdownMenuTrigger
        class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Customise options"
      >
        <Icon icon="radix-icons:hamburger-menu" />
      </ADropdownMenuTrigger>

      <ADropdownMenuPortal to="#here">
        <ADropdownMenuContent
          class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          <ADropdownMenuItem
            value="New Tab"
            class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            v-bind="useEmitAsProps(emits)"
            @click="handleClick"
          >
            New Tab
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
            >
              ⌘+T
            </div>
          </ADropdownMenuItem>
          <!-- <ADropdownMenuSub>
            <ADropdownMenuSubTrigger
              value="more toolsz"
              class="group w-full text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1"
            >
              More Tools
              <div
                class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
              >
                <Icon icon="radix-icons:chevron-right" />
              </div>
            </ADropdownMenuSubTrigger>
            <ADropdownMenuPortal>
              <ADropdownMenuSubContent
                class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                :side-offset="2"
                :align-offset="-5"
              >
                <ADropdownMenuItem
                  class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Save Page As…
                  <div
                    class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                  >
                    ⌘+S
                  </div>
                </ADropdownMenuItem>
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Create Shortcut…
                </ADropdownMenuItem>
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Name Window…
                </ADropdownMenuItem>
                <ADropdownMenuSeparator class="h-[1px] bg-violet6 m-[5px]" />
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Developer Tools
                </ADropdownMenuItem>
              </ADropdownMenuSubContent>
            </ADropdownMenuPortal>
          </ADropdownMenuSub> -->
          <ADropdownMenuItem
            value="New Window"
            class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            New Window
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
            >
              ⌘+N
            </div>
          </ADropdownMenuItem>
          <ADropdownMenuItem
            value="New Private Window"
            class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            disabled
          >
            New Private Window
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
            >
              ⇧+⌘+N
            </div>
          </ADropdownMenuItem>
          <!-- <ADropdownMenuSub>
            <ADropdownMenuSubTrigger
              value="more tools"
              class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none w-full outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1"
            >
              More Tools
              <div
                class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
              >
                <Icon icon="radix-icons:chevron-right" />
              </div>
            </ADropdownMenuSubTrigger>
            <ADropdownMenuPortal>
              <ADropdownMenuSubContent
                class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                :side-offset="2"
                :align-offset="-5"
              >
                <ADropdownMenuItem
                  class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Save Page As…
                  <div
                    class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                  >
                    ⌘+S
                  </div>
                </ADropdownMenuItem>
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Create Shortcut…
                </ADropdownMenuItem>
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Name Window…
                </ADropdownMenuItem>
                <ADropdownMenuSeparator class="h-[1px] bg-violet6 m-[5px]" />
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Developer Tools
                </ADropdownMenuItem>
                <ADropdownMenuSub>
                  <ADropdownMenuSubTrigger
                    value="more toolsz"
                    class="group w-full text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1"
                  >
                    More Tools
                    <div
                      class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                    >
                      <Icon icon="radix-icons:chevron-right" />
                    </div>
                  </ADropdownMenuSubTrigger>
                  <ADropdownMenuPortal>
                    <ADropdownMenuSubContent
                      class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                      :side-offset="2"
                      :align-offset="-5"
                    >
                      <ADropdownMenuItem
                        class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                      >
                        Save Page As…
                        <div
                          class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                        >
                          ⌘+S
                        </div>
                      </ADropdownMenuItem>
                      <ADropdownMenuItem
                        class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                      >
                        Create Shortcut…
                      </ADropdownMenuItem>
                      <ADropdownMenuItem
                        class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                      >
                        Name Window…
                      </ADropdownMenuItem>
                      <ADropdownMenuSeparator
                        class="h-[1px] bg-violet6 m-[5px]"
                      />
                      <ADropdownMenuItem
                        class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                      >
                        Developer Tools
                      </ADropdownMenuItem>
                      <ADropdownMenuSub>
                        <ADropdownMenuSubTrigger
                          value="more toolsz"
                          class="group w-full text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1"
                        >
                          More Tools
                          <div
                            class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                          >
                            <Icon icon="radix-icons:chevron-right" />
                          </div>
                        </ADropdownMenuSubTrigger>
                        <ADropdownMenuPortal>
                          <ADropdownMenuSubContent
                            class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            :side-offset="2"
                            :align-offset="-5"
                          >
                            <ADropdownMenuItem
                              class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            >
                              Save Page As…
                              <div
                                class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
                              >
                                ⌘+S
                              </div>
                            </ADropdownMenuItem>
                            <ADropdownMenuItem
                              class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            >
                              Create Shortcut…
                            </ADropdownMenuItem>
                            <ADropdownMenuItem
                              class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            >
                              Name Window…
                            </ADropdownMenuItem>
                            <ADropdownMenuSeparator
                              class="h-[1px] bg-violet6 m-[5px]"
                            />
                            <ADropdownMenuItem
                              class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            >
                              Developer Tools
                            </ADropdownMenuItem>
                          </ADropdownMenuSubContent>
                        </ADropdownMenuPortal>
                      </ADropdownMenuSub>
                    </ADropdownMenuSubContent>
                  </ADropdownMenuPortal>
                </ADropdownMenuSub>
                <ADropdownMenuItem
                  class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  Developer Tools
                </ADropdownMenuItem>
              </ADropdownMenuSubContent>
            </ADropdownMenuPortal>
          </ADropdownMenuSub> -->
          <ADropdownMenuSeparator class="h-[1px] bg-violet6 m-[5px]" />
          <ADropdownMenuCheckboxItem
            v-model="checkboxOne"
            class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            @select="handleCheck"
          >
            <ADropdownMenuItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Show Bookmarks
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
            >
              ⌘+B
            </div>
          </ADropdownMenuCheckboxItem>
          <ADropdownMenuCheckboxItem
            v-model="checkboxTwo"
            class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            <ADropdownMenuItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Show Full URLs
          </ADropdownMenuCheckboxItem>
          <ADropdownMenuSeparator class="h-[1px] bg-violet6 m-[5px]" />

          <ADropdownMenuLabel
            class="pl-[25px] text-xs leading-[25px] text-mauve11"
          >
            People
          </ADropdownMenuLabel>
          <ADropdownMenuRadioGroup v-model="person">
            <ADropdownMenuRadioItem
              class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              value="pedro"
            >
              <ADropdownMenuItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:dot-filled" />
              </ADropdownMenuItemIndicator>
              Pedro Duarte
            </ADropdownMenuRadioItem>
            <ADropdownMenuRadioItem
              class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              value="colm"
            >
              <ADropdownMenuItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:dot-filled" />
              </ADropdownMenuItemIndicator>
              Colm Tuite
            </ADropdownMenuRadioItem>
          </ADropdownMenuRadioGroup>
          <ADropdownMenuArrow class="fill-white" />
        </ADropdownMenuContent>
      </ADropdownMenuPortal>
    </ADropdownMenuRoot>

    <div id="here" />
  </div>
</template>
