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
      class="block w-[300px] select-none border-2 border-white rounded border-dashed py-[45px] text-center text-[15px] text-white"
    >
      Right click here.
    </AContextMenuTrigger>

    <AContextMenuPortal>
      <AContextMenuContent
        class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        :side-offset="5"
      >
        <AContextMenuItem
          value="New Tab"
          class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
          @click="handleClick"
        >
          New Tab
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
          >
            ⌘+T
          </div>
        </AContextMenuItem>
        <AContextMenuSub>
          <AContextMenuSubTrigger
            value="more toolsz"
            class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 relative h-[25px] w-full flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11"
          >
            More Tools
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
            >
              <Icon icon="radix-icons:chevron-right" />
            </div>
          </AContextMenuSubTrigger>
          <AContextMenuPortal>
            <AContextMenuSubContent
              class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              :side-offset="2"
              :align-offset="-5"
            >
              <AContextMenuItem
                class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Save Page As…
                <div
                  class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
                >
                  ⌘+S
                </div>
              </AContextMenuItem>
              <AContextMenuItem
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Create Shortcut…
              </AContextMenuItem>
              <AContextMenuItem
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Name Window…
              </AContextMenuItem>
              <AContextMenuSeparator class="m-[5px] h-[1px] bg-violet6" />
              <AContextMenuItem
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Developer Tools
              </AContextMenuItem>

              <AContextMenuArrow class="fill-white" />
            </AContextMenuSubContent>
          </AContextMenuPortal>
        </AContextMenuSub>
        <AContextMenuItem
          value="New Window"
          class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
        >
          New Window
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
          >
            ⌘+N
          </div>
        </AContextMenuItem>
        <AContextMenuItem
          value="New Private Window"
          class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
          disabled
        >
          New Private Window
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
          >
            ⇧+⌘+N
          </div>
        </AContextMenuItem>
        <AContextMenuSub>
          <AContextMenuSubTrigger
            value="more tools"
            class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 relative h-[25px] w-full flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11"
          >
            More Tools
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
            >
              <Icon icon="radix-icons:chevron-right" />
            </div>
          </AContextMenuSubTrigger>
          <AContextMenuPortal>
            <AContextMenuSubContent
              class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              :side-offset="2"
              :align-offset="-5"
            >
              <AContextMenuItem
                class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Save Page As…
                <div
                  class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
                >
                  ⌘+S
                </div>
              </AContextMenuItem>
              <AContextMenuItem
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Create Shortcut…
              </AContextMenuItem>
              <AContextMenuItem
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Name Window…
              </AContextMenuItem>
              <AContextMenuSeparator class="m-[5px] h-[1px] bg-violet6" />
              <AContextMenuItem
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Developer Tools
              </AContextMenuItem>
              <AContextMenuSub>
                <AContextMenuSubTrigger
                  value="more toolsz"
                  class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 relative h-[25px] w-full flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11"
                >
                  More Tools
                  <div
                    class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
                  >
                    <Icon icon="radix-icons:chevron-right" />
                  </div>
                </AContextMenuSubTrigger>
                <AContextMenuPortal>
                  <AContextMenuSubContent
                    class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    :side-offset="2"
                    :align-offset="-5"
                  >
                    <AContextMenuItem
                      class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                    >
                      Save Page As…
                      <div
                        class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
                      >
                        ⌘+S
                      </div>
                    </AContextMenuItem>
                    <AContextMenuItem
                      class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                    >
                      Create Shortcut…
                    </AContextMenuItem>
                    <AContextMenuItem
                      class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                    >
                      Name Window…
                    </AContextMenuItem>
                    <AContextMenuSeparator
                      class="m-[5px] h-[1px] bg-violet6"
                    />
                    <AContextMenuItem
                      class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                    >
                      Developer Tools
                    </AContextMenuItem>
                    <AContextMenuSub>
                      <AContextMenuSubTrigger
                        value="more toolsz"
                        class="group data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 relative h-[25px] w-full flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-violet11"
                      >
                        More Tools
                        <div
                          class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
                        >
                          <Icon icon="radix-icons:chevron-right" />
                        </div>
                      </AContextMenuSubTrigger>
                      <AContextMenuPortal>
                        <AContextMenuSubContent
                          class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                          :side-offset="2"
                          :align-offset="-5"
                        >
                          <AContextMenuItem
                            class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                          >
                            Save Page As…
                            <div
                              class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
                            >
                              ⌘+S
                            </div>
                          </AContextMenuItem>
                          <AContextMenuItem
                            class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                          >
                            Create Shortcut…
                          </AContextMenuItem>
                          <AContextMenuItem
                            class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                          >
                            Name Window…
                          </AContextMenuItem>
                          <AContextMenuSeparator
                            class="m-[5px] h-[1px] bg-violet6"
                          />
                          <AContextMenuItem
                            class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
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
                class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
              >
                Developer Tools
              </AContextMenuItem>
            </AContextMenuSubContent>
          </AContextMenuPortal>
        </AContextMenuSub>
        <AContextMenuSeparator class="m-[5px] h-[1px] bg-violet6" />
        <AContextMenuCheckboxItem
          v-model="checkboxOne"
          class="group relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
          @select.prevent
        >
          <AContextMenuItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <Icon icon="radix-icons:check" />
          </AContextMenuItemIndicator>
          Show Bookmarks
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white"
          >
            ⌘+B
          </div>
        </AContextMenuCheckboxItem>
        <AContextMenuCheckboxItem
          v-model="checkboxTwo"
          class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
          @select.prevent
        >
          <AContextMenuItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <Icon icon="radix-icons:check" />
          </AContextMenuItemIndicator>
          Show Full URLs
        </AContextMenuCheckboxItem>
        <AContextMenuSeparator class="m-[5px] h-[1px] bg-violet6" />

        <AContextMenuLabel
          class="pl-[25px] text-xs text-mauve11 leading-[25px]"
        >
          People
        </AContextMenuLabel>
        <AContextMenuRadioGroup v-model="person">
          <AContextMenuRadioItem
            class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
            value="pedro"
          >
            <AContextMenuItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon icon="radix-icons:dot-filled" />
            </AContextMenuItemIndicator>
            Pedro Duarte
          </AContextMenuRadioItem>
          <AContextMenuRadioItem
            class="relative h-[25px] flex select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] text-violet11 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
            value="colm"
          >
            <AContextMenuItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
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
