<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from '..';
import LinkGroup from './_link-group.vue';
import StoryFrame from './_story-frame.vue';

const currentTrigger = ref('');
</script>

<template>
  <Story title="Navigation Menu/Viewport">
    <Variant title="Default">
      <StoryFrame>
        <ANavigationMenuRoot
          v-model="currentTrigger"
          class="relative z-[1] w-full flex justify-center"
        >
          <ANavigationMenuList
            class="center m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px] shadow-blackA7"
          >
            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
              >
                Products
                <Icon
                  icon="radix-icons:caret-down"
                  class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>

              <ANavigationMenuContent
                class="absolute left-0 top-0 w-full rounded-xl bg-white sm:w-auto"
              >
                <LinkGroup
                  :items="[
                    'Fusce pellentesque',
                    'Aliquam porttitor',
                    'Pellentesque',
                    'Fusce pellentesque',
                    'Aliquam porttitor',
                    'Pellentesque',
                  ]"
                />
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
              >
                Company
                <Icon
                  icon="radix-icons:caret-down"
                  class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="absolute left-0 top-0 w-full rounded-xl bg-white sm:w-auto"
              >
                <LinkGroup
                  :items="[
                    'Fusce pellentesque',
                    'Aliquam porttitor',
                    'Pellentesque',
                  ]"
                />
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
              >
                Developers
                <Icon
                  icon="radix-icons:caret-down"
                  class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="absolute left-0 top-0 w-full rounded-xl bg-white sm:w-auto"
              >
                <LinkGroup :items="['Aliquam porttitor', 'Pellentesque']" />
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuLink
                class="block select-none rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none no-underline outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                href="https://github.com/unovue"
              >
                Link
              </ANavigationMenuLink>
            </ANavigationMenuItem>

            <ANavigationMenuIndicator
              class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] top-full z-[1] h-[10px] flex items-end justify-center overflow-hidden duration-200 data-[state=hidden]:opacity-0"
            >
              <div
                class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"
              />
            </ANavigationMenuIndicator>
          </ANavigationMenuList>

          <div
            class="absolute left-0 top-full w-full flex perspective-[2000px] justify-center"
          >
            <ANavigationMenuViewport
              class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut transition-[width,_height] relative mt-[10px] h-[var(--akar-navigation-menu-viewport-height)] min-w-[400px] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white duration-300 sm:w-[var(--akar-navigation-menu-viewport-width)]"
            />
          </div>
        </ANavigationMenuRoot>
      </StoryFrame>
    </Variant>
  </Story>
</template>
