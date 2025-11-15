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
          class="flex w-full justify-center relative z-1"
        >
          <ANavigationMenuList
            class="center shadow-blackA7 m-0 p-1 list-none rounded-[6px] bg-white flex shadow-[0_2px_10px]"
          >
            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Learn
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight w-full left-0 top-0 absolute sm:w-auto"
              >
                <ul
                  class="one m-0 p-[22px] list-none gap-x-[10px] grid sm:w-[200px]"
                >
                  <li class="grid row-span-3">
                    <ANavigationMenuLink
                      href="/"
                      target="_blank"
                      class="from-green9 to-teal9 focus:shadow-green7 p-[25px] outline-none rounded-[6px] no-underline flex flex-col h-full w-full select-none justify-end bg-gradient-to-b focus:shadow-[0_0_0_2px]"
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
                        class="text-[18px] text-white leading-[1.2] font-medium mb-[7px] mt-4"
                      >
                        akar UI
                      </div>
                      <p class="text-mauve4 text-[14px] leading-[1.3]">
                        Unstyled, accessible components for Vue.
                      </p>
                    </ANavigationMenuLink>
                  </li>
                </ul>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Overview 2
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="w-full left-0 top-0 absolute sm:w-auto"
              >
                <ul
                  class="m-0 p-[22px] list-none gap-x-[10px] grid sm:grid-flow-col sm:grid-rows-3 sm:w-[300px]"
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
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Overview
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="w-full left-0 top-0 absolute sm:w-auto"
              >
                <ul
                  class="m-0 p-[22px] list-none gap-x-[10px] grid sm:grid-flow-col sm:grid-rows-3 sm:w-[600px]"
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
                class="text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] no-underline block select-none focus:shadow-[0_0_0_2px]"
                href="https://github.com/vinicunca"
              >
                Github
              </ANavigationMenuLink>
            </ANavigationMenuItem>

            <ANavigationMenuIndicator
              class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] mt-[1px] flex h-[10px] w-[--akar-navigation-menu-indicator-size] translate-x-[--akar-navigation-menu-indicator-position] duration-280 items-end top-full justify-center absolute z-[100] overflow-hidden data-[state=hidden]:opacity-0"
            >
              <div
                class="rounded-tl-[2px] bg-white h-[10px] w-[10px] rotate-[45deg] top-[70%] relative"
              />
            </ANavigationMenuIndicator>
          </ANavigationMenuList>

          <div
            class="mt-[10px] flex w-full perspective-[2000px] left-0 top-full absolute"
          >
            <div class="w-full relative">
              <ANavigationMenuViewport
                class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut transition-[width,_height,_left] rounded-[6px] bg-white h-[var(--akar-navigation-menu-viewport-height)] w-full origin-[top_center] duration-300 left-[var(--akar-navigation-menu-viewport-left)] top-0 absolute overflow-hidden sm:w-[var(--akar-navigation-menu-viewport-width)]"
              />
            </div>
          </div>
        </ANavigationMenuRoot>
      </div>
    </Variant>
  </Story>
</template>
