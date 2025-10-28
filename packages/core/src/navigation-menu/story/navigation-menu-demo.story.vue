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
    title="Navigation Menu/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Default">
      <div class="h-[600px] w-full">
        <ANavigationMenuRoot
          v-model="currentTrigger"
          class="flex w-full justify-center relative z-1"
        >
          <ANavigationMenuList class="center m-0 p-1 list-none border rounded-lg bg-white flex shadow-sm">
            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-sm leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Learn
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-[150ms] ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight w-full left-0 top-0 absolute sm:w-auto"
              >
                <ul class="one m-0 p-[22px] list-none gap-x-[10px] grid sm:grid-cols-[0.75fr_1fr] sm:w-[500px]">
                  <li class="grid row-span-3">
                    <ANavigationMenuLink as-child>
                      <a
                        class="focus:shadow-green7 p-[25px] outline-none rounded-lg bg-stone-900 no-underline flex flex-col h-full w-full select-none justify-end focus:shadow-[0_0_0_2px]"
                        href="/"
                      >
                        <img
                          class="w-16"
                          src="https://akar-ui.com/logo.svg"
                        >
                        <div class="text-[18px] text-white leading-[1.2] font-medium mb-[7px] mt-4">akar UI</div>
                        <p class="text-mauve4 text-[14px] leading-[1.3]">Unstyled, accessible components for Vue.</p>
                      </a>
                    </ANavigationMenuLink>
                  </li>

                  <ANavigationMenuListItem
                    href="https://stitches.dev/"
                    title="Stitches"
                  >
                    CSS-in-JS with best-in-class developer experience.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    href="/colors"
                    title="Colors"
                  >
                    Beautiful, thought-out palettes with auto dark mode.
                  </ANavigationMenuListItem>
                  <ANavigationMenuListItem
                    href="https://lucide.dev/icons/"
                    title="Icons"
                  >
                    A crisp set of 15x15 icons, balanced and consistent.
                  </ANavigationMenuListItem>
                </ul>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-sm leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Overview
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-[150ms] ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight w-full left-0 top-0 absolute sm:w-auto">
                <ul class="m-0 p-[22px] list-none gap-x-[10px] grid sm:grid-flow-col sm:grid-rows-3 sm:w-[600px]">
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
                    A quick tutorial to get you up and running with akar UI.
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
                class="text-grass11 hover:bg-green3 focus:shadow-green7 text-sm leading-none font-medium px-3 py-2 outline-none rounded-[4px] no-underline block select-none focus:shadow-[0_0_0_2px]"
                href="https://github.com/unovue/radix-vue"
              >
                GitHub
              </ANavigationMenuLink>
            </ANavigationMenuItem>

            <ANavigationMenuIndicator
              class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] mt-[1px] flex h-[10px] w-[--akar-navigation-menu-indicator-size] translate-x-[--akar-navigation-menu-indicator-position] duration-200 items-end top-full justify-center absolute z-[100] overflow-hidden data-[state=hidden]:opacity-0"
            >
              <div class="border bg-white h-[12px] w-[12px] rotate-[45deg] top-[70%] relative" />
            </ANavigationMenuIndicator>
          </ANavigationMenuList>

          <div class="flex w-full perspective-[2000px] left-0 top-full justify-center absolute">
            <ANavigationMenuViewport
              class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut transition-[width,_height] mt-[10px] border rounded-xl bg-white h-[var(--akar-navigation-menu-viewport-height)] w-full shadow-sm origin-[top_center] duration-300 relative overflow-hidden sm:w-[var(--akar-navigation-menu-viewport-width)]"
            />
          </div>
        </ANavigationMenuRoot>
      </div>
    </Variant>
  </Story>
</template>
