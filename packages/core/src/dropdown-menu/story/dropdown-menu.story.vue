<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
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
  ADropdownMenuSub,
  ADropdownMenuSubContent,
  ADropdownMenuSubTrigger,
  ADropdownMenuTrigger,
} from '..';

const toggleState = ref(false);
const checkboxOne = ref(false);
const checkboxTwo = ref(false);
const person = ref('pedro');

const content = 'relative min-w-32 bg-white will-change-[opacity,transform] z-50 rounded-md border p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

const item = 'group w-full text-sm leading-none text-violet11 flex items-center h-7 relative pl-7 pr-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 cursor-default rounded';

const subContent = 'bg-white rounded-md shadow-md will-change-[opacity,transform] min-w-32 z-50 overflow-hidden p-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-left-right-1 data-[side=right]:slide-in-from-right-1 data-[side=top]:slide-in-from-bottom-2';

const separator = '-mx-1 my-1 h-px bg-mauve5';

const shortcut = 'ml-auto pl-5 text-[13px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8';

const checkboxItem = 'group w-full text-sm leading-none text-violet11 flex items-center h-7 relative pl-7 pr-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 cursor-default rounded';

const radioItem = 'group w-full text-sm leading-none text-violet11 flex items-center h-7 relative pl-7 pr-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 cursor-default rounded';
</script>

<template>
  <Story
    title="DropdownMenu/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ADropdownMenuRoot v-model:open="toggleState">
        <ADropdownMenuTrigger
          class="text-violet11 shadow-blackA7 size-10 inline-flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <Icon
            icon="radix-icons:hamburger-menu"
            class="size-4"
          />
        </ADropdownMenuTrigger>

        <ADropdownMenuPortal>
          <ADropdownMenuContent
            :class="content"
            :side-offset="4"
          >
            <ADropdownMenuItem
              value="New Tab"
              :class="item"
            >
              New Tab
              <div :class="shortcut">
                ⌘+T
              </div>
            </ADropdownMenuItem>
            <ADropdownMenuSub>
              <ADropdownMenuSubTrigger
                value="more tools"
                :class="item"
              >
                More Tools
                <div
                  class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white"
                >
                  <Icon
                    icon="tabler:chevron-right"
                    class="size-3.5"
                  />
                </div>
              </ADropdownMenuSubTrigger>
              <ADropdownMenuPortal>
                <ADropdownMenuSubContent
                  :class="subContent"
                  :side-offset="2"
                  :align-offset="-4"
                >
                  <ADropdownMenuItem :class="item">
                    Save Page As…
                    <div :class="shortcut">
                      ⌘+S
                    </div>
                  </ADropdownMenuItem>
                  <ADropdownMenuItem :class="item">
                    Create Shortcut…
                  </ADropdownMenuItem>
                  <ADropdownMenuItem :class="item">
                    Name Window…
                  </ADropdownMenuItem>
                  <ADropdownMenuSeparator :class="separator" />
                  <ADropdownMenuItem :class="item">
                    Developer Tools
                  </ADropdownMenuItem>
                </ADropdownMenuSubContent>
              </ADropdownMenuPortal>
            </ADropdownMenuSub>
            <ADropdownMenuItem
              value="New Window"
              :class="item"
            >
              New Window
              <div :class="shortcut">
                ⌘+N
              </div>
            </ADropdownMenuItem>
            <ADropdownMenuItem
              value="New Private Window"
              :class="item"
              disabled
            >
              New Private Window
              <div :class="shortcut">
                ⇧+⌘+N
              </div>
            </ADropdownMenuItem>
            <ADropdownMenuSub>
              <ADropdownMenuSubTrigger
                value="more tools"
                :class="item"
              >
                More Tools
                <div
                  class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white"
                >
                  <Icon
                    icon="tabler:chevron-right"
                    class="size-3.5"
                  />
                </div>
              </ADropdownMenuSubTrigger>
              <ADropdownMenuPortal>
                <ADropdownMenuSubContent
                  :class="subContent"
                  :side-offset="2"
                  :align-offset="-4"
                >
                  <ADropdownMenuItem :class="item">
                    Save Page As…
                    <div :class="shortcut">
                      ⌘+S
                    </div>
                  </ADropdownMenuItem>
                  <ADropdownMenuItem :class="item">
                    Create Shortcut…
                  </ADropdownMenuItem>
                  <ADropdownMenuItem :class="item">
                    Name Window…
                  </ADropdownMenuItem>
                  <ADropdownMenuSeparator :class="separator" />
                  <ADropdownMenuItem :class="item">
                    Developer Tools
                  </ADropdownMenuItem>
                  <ADropdownMenuSub>
                    <ADropdownMenuSubTrigger
                      value="more tools"
                      :class="item"
                    >
                      More Tools
                      <div
                        class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white"
                      >
                        <Icon
                          icon="tabler:chevron-right"
                          class="size-3.5"
                        />
                      </div>
                    </ADropdownMenuSubTrigger>
                    <ADropdownMenuPortal>
                      <ADropdownMenuSubContent
                        :class="subContent"
                        :side-offset="2"
                        :align-offset="-4"
                      >
                        <ADropdownMenuItem :class="item">
                          Save Page As…
                          <div :class="shortcut">
                            ⌘+S
                          </div>
                        </ADropdownMenuItem>
                        <ADropdownMenuItem :class="item">
                          Create Shortcut…
                        </ADropdownMenuItem>
                        <ADropdownMenuItem :class="item">
                          Name Window…
                        </ADropdownMenuItem>
                        <ADropdownMenuSeparator :class="separator" />
                        <ADropdownMenuItem :class="item">
                          Developer Tools
                        </ADropdownMenuItem>
                        <ADropdownMenuSub>
                          <ADropdownMenuSubTrigger
                            value="more tools"
                            :class="item"
                          >
                            More Tools
                            <div
                              class="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-5 group-data-[highlighted]:text-white"
                            >
                              <Icon
                                icon="tabler:chevron-right"
                                class="size-3.5"
                              />
                            </div>
                          </ADropdownMenuSubTrigger>
                          <ADropdownMenuPortal>
                            <ADropdownMenuSubContent
                              :class="subContent"
                              :side-offset="2"
                              :align-offset="-4"
                            >
                              <ADropdownMenuItem :class="item">
                                Save Page As…
                                <div :class="shortcut">
                                  ⌘+S
                                </div>
                              </ADropdownMenuItem>
                              <ADropdownMenuItem :class="item">
                                Create Shortcut…
                              </ADropdownMenuItem>
                              <ADropdownMenuItem :class="item">
                                Name Window…
                              </ADropdownMenuItem>
                              <ADropdownMenuSeparator :class="separator" />
                              <ADropdownMenuItem :class="item">
                                Developer Tools
                              </ADropdownMenuItem>
                            </ADropdownMenuSubContent>
                          </ADropdownMenuPortal>
                        </ADropdownMenuSub>
                      </ADropdownMenuSubContent>
                    </ADropdownMenuPortal>
                  </ADropdownMenuSub>
                  <ADropdownMenuItem :class="item">
                    Developer Tools
                  </ADropdownMenuItem>
                </ADropdownMenuSubContent>
              </ADropdownMenuPortal>
            </ADropdownMenuSub>
            <ADropdownMenuSeparator :class="separator" />
            <ADropdownMenuCheckboxItem
              v-model="checkboxOne"
              :class="checkboxItem"
              @select.prevent
            >
              <ADropdownMenuItemIndicator class="absolute left-0 w-7 inline-flex items-center justify-center">
                <Icon icon="tabler:check" />
              </ADropdownMenuItemIndicator>
              Show Bookmarks
              <div :class="shortcut">
                ⌘+B
              </div>
            </ADropdownMenuCheckboxItem>
            <ADropdownMenuCheckboxItem
              v-model="checkboxTwo"
              :class="checkboxItem"
              @select.prevent
            >
              <ADropdownMenuItemIndicator class="absolute left-0 w-7 inline-flex items-center justify-center">
                <Icon icon="tabler:check" />
              </ADropdownMenuItemIndicator>
              Show Full URLs
            </ADropdownMenuCheckboxItem>
            <ADropdownMenuSeparator :class="separator" />

            <ADropdownMenuLabel class="text-mauve11 pl-6 text-xs leading-6">
              People
            </ADropdownMenuLabel>
            <ADropdownMenuRadioGroup v-model="person">
              <ADropdownMenuRadioItem
                :class="radioItem"
                value="pedro"
                @select.prevent
              >
                <ADropdownMenuItemIndicator class="absolute left-0 w-7 inline-flex items-center justify-center">
                  <Icon icon="radix-icons:dot-filled" />
                </ADropdownMenuItemIndicator>
                Pedro Duarte
              </ADropdownMenuRadioItem>
              <ADropdownMenuRadioItem
                :class="radioItem"
                value="colm"
                @select.prevent
              >
                <ADropdownMenuItemIndicator class="absolute left-0 w-7 inline-flex items-center justify-center">
                  <Icon icon="radix-icons:dot-filled" />
                </ADropdownMenuItemIndicator>
                Colm Tuite
              </ADropdownMenuRadioItem>
            </ADropdownMenuRadioGroup>
            <ADropdownMenuArrow
              class="fill-mauve5"
              :width="12"
            />
          </ADropdownMenuContent>
        </ADropdownMenuPortal>
      </ADropdownMenuRoot>
    </Variant>
  </Story>
</template>
