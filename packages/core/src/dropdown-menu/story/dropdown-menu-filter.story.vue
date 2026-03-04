<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  ADropdownMenuArrow,
  ADropdownMenuCheckboxItem,
  ADropdownMenuContent,
  ADropdownMenuFilter,
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

const filterText = ref('');
const subFilterText = ref('');

const content = 'relative min-w-32 bg-white border will-change-[opacity,transform] z-50 rounded-md border p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
const item = 'group w-full text-sm leading-none text-violet11 flex items-center h-7 relative pl-7 pr-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 cursor-default rounded';
const subContent = 'bg-white rounded-md border shadow-md border will-change-[opacity,transform] min-w-32 z-50 overflow-hidden p-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-left-right-1 data-[side=right]:slide-in-from-right-1 data-[side=top]:slide-in-from-bottom-2';
const separator = '-mx-1 my-1 h-px bg-mauve5';
const shortcut = 'ml-auto pl-5 text-[13px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8';
const checkboxItem = 'group w-full text-sm leading-none text-violet11 flex items-center h-7 relative pl-7 pr-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 cursor-default rounded';
const radioItem = 'group w-full text-sm leading-none text-violet11 flex items-center h-7 relative pl-7 pr-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 cursor-default rounded';

function matches(text: string, filter: string) {
  return !filter || text.toLowerCase().includes(filter.toLowerCase());
}
</script>

<template>
  <Story
    title="ADropdownMenu/Filter"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="flex min-h-screen items-center justify-center">
        <ADropdownMenuRoot v-model:open="toggleState">
          <ADropdownMenuTrigger
            class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex size-10 shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
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
              <ADropdownMenuFilter
                v-model="filterText"
                class="placeholder:text-mauve9 border-mauve5 text-sm mb-1 px-2 py-1 outline-none border-b w-full"
                placeholder="Filter items..."
                auto-focus
              />

              <ADropdownMenuItem
                v-if="matches('New Tab', filterText)"
                value="New Tab"
                :class="item"
              >
                New Tab
                <div :class="shortcut">
                  ⌘+T
                </div>
              </ADropdownMenuItem>

              <ADropdownMenuSub v-if="matches('More Tools', filterText)">
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
                    <ADropdownMenuFilter
                      v-model="subFilterText"
                      class="placeholder:text-mauve9 border-mauve5 text-sm mb-1 px-2 py-1 outline-none border-b w-full"
                      placeholder="Filter tools..."
                      auto-focus
                    />
                    <ADropdownMenuItem
                      v-if="matches('Save Page As…', subFilterText)"
                      :class="item"
                    >
                      Save Page As…
                      <div :class="shortcut">
                        ⌘+S
                      </div>
                    </ADropdownMenuItem>
                    <ADropdownMenuItem
                      v-if="matches('Create Shortcut…', subFilterText)"
                      :class="item"
                    >
                      Create Shortcut…
                    </ADropdownMenuItem>
                    <ADropdownMenuItem
                      v-if="matches('Name Window…', subFilterText)"
                      :class="item"
                    >
                      Name Window…
                    </ADropdownMenuItem>
                    <ADropdownMenuSeparator
                      v-if="matches('Developer Tools', subFilterText)"
                      :class="separator"
                    />
                    <ADropdownMenuItem
                      v-if="matches('Developer Tools', subFilterText)"
                      :class="item"
                    >
                      Developer Tools
                    </ADropdownMenuItem>
                  </ADropdownMenuSubContent>
                </ADropdownMenuPortal>
              </ADropdownMenuSub>

              <ADropdownMenuItem
                v-if="matches('New Window', filterText)"
                value="New Window"
                :class="item"
              >
                New Window
                <div :class="shortcut">
                  ⌘+N
                </div>
              </ADropdownMenuItem>
              <ADropdownMenuItem
                v-if="matches('New Private Window', filterText)"
                value="New Private Window"
                :class="item"
                disabled
              >
                New Private Window
                <div :class="shortcut">
                  ⇧+⌘+N
                </div>
              </ADropdownMenuItem>

              <ADropdownMenuSeparator :class="separator" />

              <ADropdownMenuCheckboxItem
                v-if="matches('Show Bookmarks', filterText)"
                v-model="checkboxOne"
                :class="checkboxItem"
                @select.prevent
              >
                <ADropdownMenuItemIndicator class="inline-flex w-7 items-center left-0 justify-center absolute">
                  <Icon icon="tabler:check" />
                </ADropdownMenuItemIndicator>
                Show Bookmarks
                <div :class="shortcut">
                  ⌘+B
                </div>
              </ADropdownMenuCheckboxItem>
              <ADropdownMenuCheckboxItem
                v-if="matches('Show Full URLs', filterText)"
                v-model="checkboxTwo"
                :class="checkboxItem"
                @select.prevent
              >
                <ADropdownMenuItemIndicator class="inline-flex w-7 items-center left-0 justify-center absolute">
                  <Icon icon="tabler:check" />
                </ADropdownMenuItemIndicator>
                Show Full URLs
              </ADropdownMenuCheckboxItem>
              <ADropdownMenuSeparator :class="separator" />

              <ADropdownMenuLabel
                v-if="matches('People', filterText) || matches('Pedro Duarte', filterText) || matches('Colm Tuite', filterText)"
                class="text-mauve11 text-xs leading-6 pl-6"
              >
                People
              </ADropdownMenuLabel>
              <ADropdownMenuRadioGroup v-model="person">
                <ADropdownMenuRadioItem
                  v-if="matches('Pedro Duarte', filterText)"
                  :class="radioItem"
                  value="pedro"
                  @select.prevent
                >
                  <ADropdownMenuItemIndicator class="inline-flex w-7 items-center left-0 justify-center absolute">
                    <Icon icon="radix-icons:dot-filled" />
                  </ADropdownMenuItemIndicator>
                  Pedro Duarte
                </ADropdownMenuRadioItem>
                <ADropdownMenuRadioItem
                  v-if="matches('Colm Tuite', filterText)"
                  :class="radioItem"
                  value="colm"
                  @select.prevent
                >
                  <ADropdownMenuItemIndicator class="inline-flex w-7 items-center left-0 justify-center absolute">
                    <Icon icon="radix-icons:dot-filled" />
                  </ADropdownMenuItemIndicator>
                  Colm Tuite
                </ADropdownMenuRadioItem>
              </ADropdownMenuRadioGroup>
              <ADropdownMenuArrow
                class="fill-white"
                :width="12"
              />
            </ADropdownMenuContent>
          </ADropdownMenuPortal>
        </ADropdownMenuRoot>
      </div>
    </Variant>
  </Story>
</template>
