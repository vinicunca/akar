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
  ANavigationMenuSub,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from '..';
import LinkGroup from './_link-group.vue';
import StoryFrame from './_story-frame.vue';

const currentTrigger = ref('');
</script>

<template>
  <Story title="Navigation Menu/Submenus">
    <Variant title="Default">
      <StoryFrame>
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
                Products
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>

              <ANavigationMenuContent
                class="rounded-xl bg-white w-full left-0 top-0 absolute sm:w-auto"
              >
                <ANavigationMenuSub
                  default-value="extensibility"
                  class="gap-4 grid max-w-[800px] w-full justify-center"
                >
                  <ANavigationMenuList
                    class="center shadow-blackA7 m-0 p-1 list-none rounded-[6px] bg-white flex shadow-[0_2px_10px]"
                  >
                    <ANavigationMenuItem value="extensibility">
                      <ANavigationMenuTrigger
                        class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
                      >
                        Extensibility
                        <Icon
                          icon="radix-icons:caret-down"
                          class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>

                      <ANavigationMenuContent
                        class="rounded-xl bg-white w-full contents left-0 top-10 absolute sm:w-auto"
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

                    <ANavigationMenuItem value="security">
                      <ANavigationMenuTrigger
                        class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
                      >
                        Security
                        <Icon
                          icon="radix-icons:caret-down"
                          class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="rounded-xl bg-white w-full contents left-0 top-10 absolute sm:w-auto"
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

                    <ANavigationMenuItem value="authentication">
                      <ANavigationMenuTrigger
                        class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
                      >
                        Authentication
                        <Icon
                          icon="radix-icons:caret-down"
                          class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="rounded-xl bg-white w-full contents left-0 top-10 absolute sm:w-auto"
                      >
                        <LinkGroup
                          :items="['Aliquam porttitor', 'Pellentesque']"
                        />
                      </ANavigationMenuContent>
                    </ANavigationMenuItem>

                    <ANavigationMenuIndicator
                      class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] mt-[1px] flex h-[10px] w-[--akar-navigation-menu-indicator-size] translate-x-[--akar-navigation-menu-indicator-position] duration-280 items-end top-full justify-center absolute z-[100] overflow-hidden data-[state=hidden]:opacity-0"
                    >
                      <div
                        class="rounded-tl-[2px] bg-white h-[10px] w-[10px] rotate-[45deg] top-[70%] relative"
                      />
                    </ANavigationMenuIndicator>
                  </ANavigationMenuList>

                  <ANavigationMenuViewport class="w-full" />
                </ANavigationMenuSub>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuTrigger
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Company
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="rounded-xl bg-white w-full left-0 top-0 absolute sm:w-auto"
              >
                <ANavigationMenuSub
                  default-value="customers"
                  orientation="vertical"
                  class="gap-4 grid max-w-[800px] w-full"
                  :style="{ 'grid-template-columns': '0.3fr 1fr' }"
                >
                  <ANavigationMenuList
                    class="center shadow-blackA7 m-0 p-1 list-none rounded-[6px] bg-white flex flex-col h-full shadow-[0_2px_10px]"
                  >
                    <ANavigationMenuItem value="customers">
                      <ANavigationMenuTrigger
                        class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
                      >
                        Customers
                        <Icon
                          icon="radix-icons:caret-down"
                          class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>

                      <ANavigationMenuContent
                        class="rounded-xl bg-white w-full contents left-0 top-10 absolute sm:w-auto"
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

                    <ANavigationMenuItem value="security">
                      <ANavigationMenuTrigger
                        class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
                      >
                        Security
                        <Icon
                          icon="radix-icons:caret-down"
                          class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="rounded-xl bg-white w-full contents left-0 top-10 absolute sm:w-auto"
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

                    <ANavigationMenuItem value="authentication">
                      <ANavigationMenuTrigger
                        class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
                      >
                        Authentication
                        <Icon
                          icon="radix-icons:caret-down"
                          class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="rounded-xl bg-white w-full contents left-0 top-10 absolute sm:w-auto"
                      >
                        <LinkGroup
                          :items="['Aliquam porttitor', 'Pellentesque']"
                        />
                      </ANavigationMenuContent>
                    </ANavigationMenuItem>

                    <ANavigationMenuIndicator
                      class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] mt-[1px] flex h-[10px] w-[--akar-navigation-menu-indicator-size] translate-x-[--akar-navigation-menu-indicator-position] duration-280 items-end top-full justify-center absolute z-[100] overflow-hidden data-[state=hidden]:opacity-0"
                    >
                      <div
                        class="rounded-tl-[2px] bg-white h-[10px] w-[10px] rotate-[45deg] top-[70%] relative"
                      />
                    </ANavigationMenuIndicator>
                  </ANavigationMenuList>

                  <ANavigationMenuViewport class="w-full" />
                </ANavigationMenuSub>
              </ANavigationMenuContent>
            </ANavigationMenuItem>

            <ANavigationMenuItem>
              <ANavigationMenuLink
                class="text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] no-underline block select-none focus:shadow-[0_0_0_2px]"
                href="https://github.com/unovue"
              >
                Link
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

          <ANavigationMenuViewport
            class="mt-[10px] border-t bg-white h-[var(--akar-navigation-menu-viewport-height)] w-[var(--akar-navigation-menu-viewport-width)] shadow-xl origin-[top_center] transition-[height] top-full absolute overflow-hidden"
          />
        </ANavigationMenuRoot>
      </StoryFrame>
    </Variant>
  </Story>
</template>
