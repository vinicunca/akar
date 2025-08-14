<script setup lang="ts">
import type {
  ADropdownMenuItemEmits,
} from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useEmitAsProps } from '~~/shared';
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
} from '..';

const props = defineProps<{ defaultOpen?: boolean }>();

const emits = defineEmits<ADropdownMenuItemEmits>();
const toggleState = ref(props.defaultOpen ?? false);
const checkboxOne = ref(false);
const checkboxTwo = ref(false);
const person = ref('pedro');

function handleClick() {
  // alert("hello!");
}

function handleCheck(ev: any) {
  // checkboxOne.value = ev;
  // eslint-disable-next-line no-console
  console.log(ev);
}
</script>

<template>
  <div>
    <ADropdownMenuRoot v-model:open="toggleState">
      <ADropdownMenuTrigger
        class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex h-[35px] w-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Customise options"
      >
        <Icon icon="radix-icons:hamburger-menu" />
      </ADropdownMenuTrigger>

      <ADropdownMenuPortal to="#here">
        <ADropdownMenuContent
          class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <ADropdownMenuItem
            value="New Tab"
            class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
            v-bind="useEmitAsProps(emits)"
            @click="handleClick"
          >
            New Tab
            <div
              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
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
            class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
          >
            New Window
            <div
              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
            >
              ⌘+N
            </div>
          </ADropdownMenuItem>
          <ADropdownMenuItem
            value="New Private Window"
            class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
            disabled
          >
            New Private Window
            <div
              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
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
          <ADropdownMenuSeparator class="bg-violet6 m-[5px] h-[1px]" />
          <ADropdownMenuCheckboxItem
            v-model="checkboxOne"
            class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
            @select="handleCheck"
          >
            <ADropdownMenuItemIndicator
              class="inline-flex w-[25px] items-center left-0 justify-center absolute"
            >
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Show Bookmarks
            <div
              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
            >
              ⌘+B
            </div>
          </ADropdownMenuCheckboxItem>
          <ADropdownMenuCheckboxItem
            v-model="checkboxTwo"
            class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
          >
            <ADropdownMenuItemIndicator
              class="inline-flex w-[25px] items-center left-0 justify-center absolute"
            >
              <Icon icon="radix-icons:check" />
            </ADropdownMenuItemIndicator>
            Show Full URLs
          </ADropdownMenuCheckboxItem>
          <ADropdownMenuSeparator class="bg-violet6 m-[5px] h-[1px]" />

          <ADropdownMenuLabel
            class="text-mauve11 text-xs leading-[25px] pl-[25px]"
          >
            People
          </ADropdownMenuLabel>
          <ADropdownMenuRadioGroup v-model="person">
            <ADropdownMenuRadioItem
              class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              value="pedro"
            >
              <ADropdownMenuItemIndicator
                class="inline-flex w-[25px] items-center left-0 justify-center absolute"
              >
                <Icon icon="radix-icons:dot-filled" />
              </ADropdownMenuItemIndicator>
              Pedro Duarte
            </ADropdownMenuRadioItem>
            <ADropdownMenuRadioItem
              class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              value="colm"
            >
              <ADropdownMenuItemIndicator
                class="inline-flex w-[25px] items-center left-0 justify-center absolute"
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
