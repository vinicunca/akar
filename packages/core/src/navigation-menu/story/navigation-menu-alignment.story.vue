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
import ANavigationMenuListItem from './_navigation-menu-list-item.vue';

const currentTrigger = ref('');
</script>

<template>
  <Story
    title="Navigation Menu/Alignment"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Default">
      <div class="h-[600px] w-full">
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
                Learn
                <Icon
                  icon="radix-icons:caret-down"
                  class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 w-full sm:w-auto"
              >
                <ul
                  class="one grid m-0 list-none gap-x-[10px] p-[22px] sm:w-[200px]"
                >
                  <li class="grid row-span-3">
                    <ANavigationMenuLink
                      href="/"
                      target="_blank"
                      class="h-full w-full flex flex-col select-none justify-end rounded-[6px] from-green9 to-teal9 bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      @select.prevent
                    >
                      <svg
                        aria-hidden="true"
                        width="38"
                        height="38"
                        viewBox="0 0 25 25"
                        fill="white"
                      >
                        <path
                          d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
                        />
                        <path d="M12 0H4V8H12V0Z" />
                        <path
                          d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
                        />
                      </svg>
                      <div
                        class="mb-[7px] mt-4 text-[18px] text-white font-medium leading-[1.2]"
                      >
                        akar UI
                      </div>
                      <p class="text-[14px] text-mauve4 leading-[1.3]">
                        Unstyled, accessible components for Vue.
                      </p>
                    </ANavigationMenuLink>
                  </li>
                </ul>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
              >
                Overview 2
                <Icon
                  icon="radix-icons:caret-down"
                  class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="absolute left-0 top-0 w-full sm:w-auto"
              >
                <ul
                  class="grid m-0 list-none gap-x-[10px] p-[22px] sm:grid-flow-col sm:grid-rows-3 sm:w-[300px]"
                >
                  <ANavigationMenuListItem
                    title="Introduction"
                    href="/docs/primitives/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Getting started"
                    href="/docs/primitives/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Styling"
                    href="/docs/primitives/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ANavigationMenuListItem>
                </ul>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
              >
                Overview
                <Icon
                  icon="radix-icons:caret-down"
                  class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="absolute left-0 top-0 w-full sm:w-auto"
              >
                <ul
                  class="grid m-0 list-none gap-x-[10px] p-[22px] sm:grid-flow-col sm:grid-rows-3 sm:w-[600px]"
                >
                  <ANavigationMenuListItem
                    title="Introduction"
                    href="/docs/primitives/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Getting started"
                    href="/docs/primitives/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Styling"
                    href="/docs/primitives/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Animation"
                    href="/docs/primitives/guides/animation"
                  >
                    Use CSS keyframes or any animation library of your choice.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Accessibility"
                    href="/docs/primitives/overview/accessibility"
                  >
                    Tested in a range of browsers and assistive technologies.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    title="Releases"
                    href="/docs/primitives/overview/releases"
                  >
                    akar UI releases and their changelogs.
                  </ANavigationMenuListItem>
                </ul>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuLink
                class="block select-none rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none no-underline outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                href="https://github.com/unovue"
              >
                Github
              </ANavigationMenuLink>
            </ANavigationMenuItem>

            <ANavigationMenuIndicator
              class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] absolute top-full z-[100] mt-[1px] h-[10px] w-[--akar-navigation-menu-indicator-size] flex translate-x-[--akar-navigation-menu-indicator-position] items-end justify-center overflow-hidden duration-200 data-[state=hidden]:opacity-0"
            >
              <div
                class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"
              />
            </ANavigationMenuIndicator>
          </ANavigationMenuList>

          <div
            class="absolute left-0 top-full mt-[10px] w-full flex perspective-[2000px]"
          >
            <div class="relative w-full">
              <ANavigationMenuViewport
                class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut transition-[width,_height,_left] absolute left-[var(--akar-navigation-menu-viewport-left)] top-0 h-[var(--akar-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white duration-300 sm:w-[var(--akar-navigation-menu-viewport-width)]"
              />
            </div>
          </div>
        </ANavigationMenuRoot>
      </div>
    </Variant>
  </Story>
</template>
