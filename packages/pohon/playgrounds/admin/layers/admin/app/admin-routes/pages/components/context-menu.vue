<script setup lang="ts">
import theme from '#build/pohon/context-menu';
import { defineShortcuts, extractShortcuts } from '#imports';
import {
  AContextMenuContent,
  AContextMenuGroup,
  AContextMenuItem,
  AContextMenuLabel,
  AContextMenuPortal,
  AContextMenuRoot,
  AContextMenuSub,
  AContextMenuSubContent,
  AContextMenuSubTrigger,
  AContextMenuTrigger,
} from 'akar';
import { computed, reactive, ref } from 'vue';

const loading = ref(false);

const items = computed(() => [
  [{
    label: 'My account',
    type: 'label' as const,
    avatar: {
      src: 'https://github.com/praburangki.png',
    },
  }],
  [
    {
      label: 'Appearance',
      description: 'Change the appearance of the app',
      children: [{
        label: 'System',
        icon: 'i-lucide:monitor',
      }, {
        label: 'Light',
        icon: 'i-lucide:sun',
      }, {
        label: 'Dark',
        icon: 'i-lucide:moon',
      }],
    },
  ],
  [
    {
      label: 'Show Sidebar',
      kbds: ['meta', 'S'],
      onSelect() {
        console.log('Show Sidebar clicked');
      },
    },
    {
      label: 'Show Toolbar',
      kbds: ['shift', 'meta', 'D'],
      onSelect() {
        console.log('Show Toolbar clicked');
      },
    },
    {
      label: 'Collapse Pinned Tabs',
      disabled: true,
    },
  ],
  [
    {
      label: 'Refresh the Page',
      loading: loading.value,
      onSelect(e: Event) {
        e.preventDefault();

        loading.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 2000);
      },
    },
    {
      label: 'Clear Cookies and Refresh',
      color: 'warning',
    },
    {
      label: 'Clear Cache and Refresh',
      color: 'error',
    },
    {
      type: 'separator' as const,
    },
    {
      label: 'Developer',
      children: [
        [
          {
            label: 'View Source',
            description: 'View the source code of the app',
            kbds: ['option', 'meta', 'U'],
            onSelect() {
              console.log('View Source clicked');
            },
          },
          {
            label: 'Developer Tools',
            kbds: ['option', 'meta', 'I'],
            onSelect() {
              console.log('Developer Tools clicked');
            },
          },
        ],
        [
          {
            label: 'Inspect Elements',
            kbds: ['option', 'meta', 'C'],
            onSelect() {
              console.log('Inspect Elements clicked');
            },
          },
        ],
        [
          {
            label: 'JavaScript Console',
            kbds: ['option', 'meta', 'J'],
            onSelect() {
              console.log('JavaScript Console clicked');
            },
          },
        ],
      ],
    },
  ],
]);

const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  size: [theme.defaultVariants.size],
});

defineShortcuts(extractShortcuts(items.value));

const contentClasses = 'rounded-md bg-background flex flex-col min-w-32 ring ring-ring shadow-lg origin-$akar-context-menu-content-transform-origin overflow-hidden animate-in fade-in-80 data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

const itemClasses = 'group text-sm color-text p-1.5 outline-none flex gap-1.5 w-full select-none transition-colors-280 items-start relative data-[highlighted]:color-text-highlighted data-[state=open]:color-text-highlighted before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:before:bg-background-elevated/50 data-[state=open]:before:bg-background-elevated/50';

const leadingIconClasses = 'shrink-0 color-text-dimmed group-data-[highlighted]:color-text group-data-[state=open]:color-text transition-colors-280 size-5';
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      placeholder="Size"
      multiple
    />
  </BaseNavbar>

  <AContextMenuRoot>
    <AContextMenuTrigger
      as-child
      class="text-sm border border-border-accented rounded-md border-dashed flex w-72 aspect-video items-center justify-center"
    >
      <span> Right click here. </span>
    </AContextMenuTrigger>
    <AContextMenuPortal>
      <AContextMenuContent
        :class="contentClasses"
        :side-offset="5"
      >
        <div class="flex-1 relative overflow-y-auto scroll-py-1 divide-divide divide-y">
          <AContextMenuGroup class="p-1 isolate">
            <AContextMenuLabel class="text-sm color-text-highlighted font-semibold p-1.5 flex gap-1.5 w-full items-center">
              <span class="align-middle rounded-full bg-background-elevated inline-flex shrink-0 size-5 select-none items-center justify-center">
                <img
                  src="https://github.com/praburangki.png"
                  class="rounded-inherit size-full object-cover"
                >
              </span>

              <span class="text-start flex flex-1 flex-col min-w-0">
                My account
              </span>
            </AContextMenuLabel>
          </AContextMenuGroup>

          <AContextMenuGroup class="p-1 isolate">
            <AContextMenuSub>
              <AContextMenuSubTrigger
                as="button"
                :class="itemClasses"
              >
                <span class="text-start flex flex-1 flex-col min-w-0">
                  <span class="truncate">Appearance</span>
                  <span class="color-text-muted truncate">Change the appearance of the app</span>
                </span>

                <span class="ms-auto inline-flex gap-1.5 items-center"><span class="i-lucide:chevron-right shrink-0 size-5" /></span>
              </AContextMenuSubTrigger>

              <AContextMenuPortal>
                <AContextMenuSubContent :class="contentClasses">
                  <div class="flex-1 relative overflow-y-auto scroll-py-1 divide-divide divide-y">
                    <AContextMenuGroup class="p-1 isolate">
                      <AContextMenuItem as-child>
                        <button :class="itemClasses">
                          <span
                            class="i-lucide:monitor"
                            :class="leadingIconClasses"
                          />
                          <span class="text-start flex flex-1 flex-col min-w-0"><span class="truncate">System</span></span>
                        </button>
                      </AContextMenuItem>

                      <AContextMenuItem as-child>
                        <button :class="itemClasses">
                          <span
                            class="i-lucide:sun"
                            :class="leadingIconClasses"
                          />
                          <span class="text-start flex flex-1 flex-col min-w-0"><span class="truncate">Light</span></span>
                        </button>
                      </AContextMenuItem>

                      <AContextMenuItem as-child>
                        <button :class="itemClasses">
                          <span
                            class="i-lucide:moon"
                            :class="leadingIconClasses"
                          />
                          <span class="text-start flex flex-1 flex-col min-w-0"><span class="truncate">Dark</span></span>
                        </button>
                      </AContextMenuItem>
                    </AContextMenuGroup>
                  </div>
                </AContextMenuSubContent>
              </AContextMenuPortal>
            </AContextMenuSub>
          </AContextMenuGroup>

          <AContextMenuGroup class="p-1 isolate">
            <AContextMenuItem as-child>
              <button :class="itemClasses">
                Show Sidebar
              </button>
            </AContextMenuItem>
            <AContextMenuItem as-child>
              <button :class="itemClasses">
                Show Toolbar
              </button>
            </AContextMenuItem>
            <AContextMenuItem
              as-child
              disabled
            >
              <button :class="itemClasses">
                Collapse Pinned Tabs
              </button>
            </AContextMenuItem>
          </AContextMenuGroup>
        </div>
      </AContextMenuContent>
    </AContextMenuPortal>
  </AContextMenuRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PContextMenu
      :items="items"
      v-bind="props"
    >
      <div class="text-sm border border-border-accented rounded-md border-dashed flex w-72 aspect-video items-center justify-center">
        Right click here
      </div>
    </PContextMenu>
  </BaseMatrix>
</template>
