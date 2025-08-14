<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  AContextMenuArrow,
  AContextMenuCheckboxItem,
  AContextMenuContent,
  AContextMenuItem,
  AContextMenuItemIndicator,
  AContextMenuLabel,
  AContextMenuPortal,
  AContextMenuRadioGroup,
  AContextMenuRadioItem,
  AContextMenuRoot,
  AContextMenuSeparator,
  AContextMenuSub,
  AContextMenuSubContent,
  AContextMenuSubTrigger,
  AContextMenuTrigger,
} from '..';

const checkboxOne = ref(false);
const checkboxTwo = ref(false);
const person = ref('pedro');

function handleClick() {
  // eslint-disable-next-line no-alert
  alert('hello!');
}
</script>

<template>
  <AContextMenuRoot :modal="true">
    <AContextMenuTrigger
      class="text-[15px] text-white py-[45px] text-center border-2 border-white rounded border-dashed w-[300px] block select-none"
    >
      Right click here.
    </AContextMenuTrigger>

    <AContextMenuPortal>
      <AContextMenuContent
        class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        :side-offset="5"
      >
        <AContextMenuItem
          value="New Tab"
          class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
          @click="handleClick"
        >
          New Tab
          <div
            class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
          >
            ⌘+T
          </div>
        </AContextMenuItem>
        <AContextMenuSub>
          <AContextMenuSubTrigger
            value="more toolsz"
            class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 text-violet11 data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] w-full select-none items-center relative data-[disabled]:pointer-events-none"
          >
            More Tools
            <div
              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
            >
              <Icon icon="radix-icons:chevron-right" />
            </div>
          </AContextMenuSubTrigger>
          <AContextMenuPortal>
            <AContextMenuSubContent
              class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              :side-offset="2"
              :align-offset="-5"
            >
              <AContextMenuItem
                class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Save Page As…
                <div
                  class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
                >
                  ⌘+S
                </div>
              </AContextMenuItem>
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Create Shortcut…
              </AContextMenuItem>
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Name Window…
              </AContextMenuItem>
              <AContextMenuSeparator class="bg-violet6 m-[5px] h-[1px]" />
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Developer Tools
              </AContextMenuItem>

              <AContextMenuArrow class="fill-white" />
            </AContextMenuSubContent>
          </AContextMenuPortal>
        </AContextMenuSub>
        <AContextMenuItem
          value="New Window"
          class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
        >
          New Window
          <div
            class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
          >
            ⌘+N
          </div>
        </AContextMenuItem>
        <AContextMenuItem
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
        </AContextMenuItem>
        <AContextMenuSub>
          <AContextMenuSubTrigger
            value="more tools"
            class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 text-violet11 data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] w-full select-none items-center relative data-[disabled]:pointer-events-none"
          >
            More Tools
            <div
              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
            >
              <Icon icon="radix-icons:chevron-right" />
            </div>
          </AContextMenuSubTrigger>
          <AContextMenuPortal>
            <AContextMenuSubContent
              class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              :side-offset="2"
              :align-offset="-5"
            >
              <AContextMenuItem
                class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Save Page As…
                <div
                  class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
                >
                  ⌘+S
                </div>
              </AContextMenuItem>
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Create Shortcut…
              </AContextMenuItem>
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Name Window…
              </AContextMenuItem>
              <AContextMenuSeparator class="bg-violet6 m-[5px] h-[1px]" />
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Developer Tools
              </AContextMenuItem>
              <AContextMenuSub>
                <AContextMenuSubTrigger
                  value="more toolsz"
                  class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 text-violet11 data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] w-full select-none items-center relative data-[disabled]:pointer-events-none"
                >
                  More Tools
                  <div
                    class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
                  >
                    <Icon icon="radix-icons:chevron-right" />
                  </div>
                </AContextMenuSubTrigger>
                <AContextMenuPortal>
                  <AContextMenuSubContent
                    class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    :side-offset="2"
                    :align-offset="-5"
                  >
                    <AContextMenuItem
                      class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                    >
                      Save Page As…
                      <div
                        class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
                      >
                        ⌘+S
                      </div>
                    </AContextMenuItem>
                    <AContextMenuItem
                      class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                    >
                      Create Shortcut…
                    </AContextMenuItem>
                    <AContextMenuItem
                      class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                    >
                      Name Window…
                    </AContextMenuItem>
                    <AContextMenuSeparator
                      class="bg-violet6 m-[5px] h-[1px]"
                    />
                    <AContextMenuItem
                      class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                    >
                      Developer Tools
                    </AContextMenuItem>
                    <AContextMenuSub>
                      <AContextMenuSubTrigger
                        value="more toolsz"
                        class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 text-violet11 data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] w-full select-none items-center relative data-[disabled]:pointer-events-none"
                      >
                        More Tools
                        <div
                          class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
                        >
                          <Icon icon="radix-icons:chevron-right" />
                        </div>
                      </AContextMenuSubTrigger>
                      <AContextMenuPortal>
                        <AContextMenuSubContent
                          class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                          :side-offset="2"
                          :align-offset="-5"
                        >
                          <AContextMenuItem
                            class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                          >
                            Save Page As…
                            <div
                              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
                            >
                              ⌘+S
                            </div>
                          </AContextMenuItem>
                          <AContextMenuItem
                            class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                          >
                            Create Shortcut…
                          </AContextMenuItem>
                          <AContextMenuItem
                            class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                          >
                            Name Window…
                          </AContextMenuItem>
                          <AContextMenuSeparator
                            class="bg-violet6 m-[5px] h-[1px]"
                          />
                          <AContextMenuItem
                            class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
                          >
                            Developer Tools
                          </AContextMenuItem>
                        </AContextMenuSubContent>
                      </AContextMenuPortal>
                    </AContextMenuSub>
                  </AContextMenuSubContent>
                </AContextMenuPortal>
              </AContextMenuSub>
              <AContextMenuItem
                class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
              >
                Developer Tools
              </AContextMenuItem>
            </AContextMenuSubContent>
          </AContextMenuPortal>
        </AContextMenuSub>
        <AContextMenuSeparator class="bg-violet6 m-[5px] h-[1px]" />
        <AContextMenuCheckboxItem
          v-model="checkboxOne"
          class="group text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
          @select.prevent
        >
          <AContextMenuItemIndicator
            class="inline-flex w-[25px] items-center left-0 justify-center absolute"
          >
            <Icon icon="radix-icons:check" />
          </AContextMenuItemIndicator>
          Show Bookmarks
          <div
            class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white"
          >
            ⌘+B
          </div>
        </AContextMenuCheckboxItem>
        <AContextMenuCheckboxItem
          v-model="checkboxTwo"
          class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
          @select.prevent
        >
          <AContextMenuItemIndicator
            class="inline-flex w-[25px] items-center left-0 justify-center absolute"
          >
            <Icon icon="radix-icons:check" />
          </AContextMenuItemIndicator>
          Show Full URLs
        </AContextMenuCheckboxItem>
        <AContextMenuSeparator class="bg-violet6 m-[5px] h-[1px]" />

        <AContextMenuLabel
          class="text-mauve11 text-xs leading-[25px] pl-[25px]"
        >
          People
        </AContextMenuLabel>
        <AContextMenuRadioGroup v-model="person">
          <AContextMenuRadioItem
            class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
            value="pedro"
          >
            <AContextMenuItemIndicator
              class="inline-flex w-[25px] items-center left-0 justify-center absolute"
            >
              <Icon icon="radix-icons:dot-filled" />
            </AContextMenuItemIndicator>
            Pedro Duarte
          </AContextMenuRadioItem>
          <AContextMenuRadioItem
            class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
            value="colm"
          >
            <AContextMenuItemIndicator
              class="inline-flex w-[25px] items-center left-0 justify-center absolute"
            >
              <Icon icon="radix-icons:dot-filled" />
            </AContextMenuItemIndicator>
            Colm Tuite
          </AContextMenuRadioItem>
        </AContextMenuRadioGroup>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>
</template>
