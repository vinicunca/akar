<script lang="ts" setup>
import { ADropdownMenuContent, ADropdownMenuGroup, ADropdownMenuItem, ADropdownMenuLabel, ADropdownMenuPortal, ADropdownMenuRoot, ADropdownMenuSub, ADropdownMenuSubContent, ADropdownMenuSubTrigger, ADropdownMenuTrigger } from 'akar';

const contentClasses = 'rounded-md bg-background flex flex-col min-w-32 ring ring-ring shadow-lg origin-$akar-context-menu-content-transform-origin overflow-hidden animate-in fade-in-80 data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

const itemClasses = 'group text-sm color-text p-1.5 outline-none flex gap-1.5 w-full select-none transition-colors-280 items-start relative data-[highlighted]:color-text-highlighted data-[state=open]:color-text-highlighted before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:before:bg-background-elevated/50 data-[state=open]:before:bg-background-elevated/50';

const leadingIconClasses = 'shrink-0 color-text-dimmed group-data-[highlighted]:color-text group-data-[state=open]:color-text transition-colors-280 size-5';
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger
      class="text-sm color-text font-500 px-2.5 py-1.5 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center focus:outline-none active:bg-background-elevated hover:bg-background-elevated focus-visible:(ring-2 ring-ring-inverted)"
      aria-label="Customise options"
    >
      <i class="i-lucide:menu" />
    </ADropdownMenuTrigger>

    <ADropdownMenuPortal>
      <ADropdownMenuContent
        :class="contentClasses"
        :side-offset="5"
      >
        <div class="flex-1 relative overflow-y-auto scroll-py-1 divide-divide divide-y">
          <ADropdownMenuGroup class="p-1 isolate">
            <ADropdownMenuLabel class="text-sm color-text-highlighted font-semibold p-1.5 flex gap-1.5 w-full items-center">
              <span class="align-middle rounded-full bg-background-elevated inline-flex shrink-0 size-5 select-none items-center justify-center">
                <img
                  src="https://github.com/praburangki.png"
                  class="rounded-inherit size-full object-cover"
                >
              </span>

              <span class="text-start flex flex-1 flex-col min-w-0">
                My account
              </span>
            </ADropdownMenuLabel>
          </ADropdownMenuGroup>

          <ADropdownMenuGroup class="p-1 isolate">
            <ADropdownMenuSub>
              <ADropdownMenuSubTrigger
                as="button"
                :class="itemClasses"
              >
                <span class="text-start flex flex-1 flex-col min-w-0">
                  <span class="truncate">Appearance</span>
                  <span class="color-text-muted truncate">Change the appearance of the app</span>
                </span>

                <span class="ms-auto inline-flex gap-1.5 items-center"><span class="i-lucide:chevron-right shrink-0 size-5" /></span>
              </ADropdownMenuSubTrigger>

              <ADropdownMenuPortal>
                <ADropdownMenuSubContent :class="contentClasses">
                  <div class="flex-1 relative overflow-y-auto scroll-py-1 divide-divide divide-y">
                    <ADropdownMenuGroup class="p-1 isolate">
                      <ADropdownMenuItem as-child>
                        <button :class="itemClasses">
                          <span
                            class="i-lucide:monitor"
                            :class="leadingIconClasses"
                          />
                          <span class="text-start flex flex-1 flex-col min-w-0"><span class="truncate">System</span></span>
                        </button>
                      </ADropdownMenuItem>

                      <ADropdownMenuItem as-child>
                        <button :class="itemClasses">
                          <span
                            class="i-lucide:sun"
                            :class="leadingIconClasses"
                          />
                          <span class="text-start flex flex-1 flex-col min-w-0"><span class="truncate">Light</span></span>
                        </button>
                      </ADropdownMenuItem>

                      <ADropdownMenuItem as-child>
                        <button :class="itemClasses">
                          <span
                            class="i-lucide:moon"
                            :class="leadingIconClasses"
                          />
                          <span class="text-start flex flex-1 flex-col min-w-0"><span class="truncate">Dark</span></span>
                        </button>
                      </ADropdownMenuItem>
                    </ADropdownMenuGroup>
                  </div>
                </ADropdownMenuSubContent>
              </ADropdownMenuPortal>
            </ADropdownMenuSub>
          </ADropdownMenuGroup>

          <ADropdownMenuGroup class="p-1 isolate">
            <ADropdownMenuItem as-child>
              <button :class="itemClasses">
                Show Sidebar
              </button>
            </ADropdownMenuItem>
            <ADropdownMenuItem as-child>
              <button :class="itemClasses">
                Show Toolbar
              </button>
            </ADropdownMenuItem>
            <ADropdownMenuItem
              as-child
              disabled
            >
              <button :class="itemClasses">
                Collapse Pinned Tabs
              </button>
            </ADropdownMenuItem>
          </ADropdownMenuGroup>
        </div>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
