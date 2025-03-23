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
                <ANavigationMenuSub
                  default-value="extensibility"
                  class="grid max-w-[800px] w-full justify-center gap-4"
                >
                  <ANavigationMenuList
                    class="center m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px] shadow-blackA7"
                  >
                    <ANavigationMenuItem value="extensibility">
                      <ANavigationMenuTrigger
                        class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      >
                        Extensibility
                        <Icon
                          icon="radix-icons:caret-down"
                          class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>

                      <ANavigationMenuContent
                        class="absolute left-0 top-10 contents w-full rounded-xl bg-white sm:w-auto"
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
                        class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      >
                        Security
                        <Icon
                          icon="radix-icons:caret-down"
                          class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="absolute left-0 top-10 contents w-full rounded-xl bg-white sm:w-auto"
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
                        class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      >
                        Authentication
                        <Icon
                          icon="radix-icons:caret-down"
                          class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="absolute left-0 top-10 contents w-full rounded-xl bg-white sm:w-auto"
                      >
                        <LinkGroup
                          :items="['Aliquam porttitor', 'Pellentesque']"
                        />
                      </ANavigationMenuContent>
                    </ANavigationMenuItem>

                    <ANavigationMenuIndicator
                      class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] absolute top-full z-[100] mt-[1px] h-[10px] w-[--akar-navigation-menu-indicator-size] flex translate-x-[--akar-navigation-menu-indicator-position] items-end justify-center overflow-hidden duration-200 data-[state=hidden]:opacity-0"
                    >
                      <div
                        class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"
                      />
                    </ANavigationMenuIndicator>
                  </ANavigationMenuList>

                  <ANavigationMenuViewport class="w-full" />
                </ANavigationMenuSub>
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
                <ANavigationMenuSub
                  default-value="customers"
                  orientation="vertical"
                  class="grid max-w-[800px] w-full gap-4"
                  :style="{ 'grid-template-columns': '0.3fr 1fr' }"
                >
                  <ANavigationMenuList
                    class="center m-0 h-full flex flex-col list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px] shadow-blackA7"
                  >
                    <ANavigationMenuItem value="customers">
                      <ANavigationMenuTrigger
                        class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      >
                        Customers
                        <Icon
                          icon="radix-icons:caret-down"
                          class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>

                      <ANavigationMenuContent
                        class="absolute left-0 top-10 contents w-full rounded-xl bg-white sm:w-auto"
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
                        class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      >
                        Security
                        <Icon
                          icon="radix-icons:caret-down"
                          class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="absolute left-0 top-10 contents w-full rounded-xl bg-white sm:w-auto"
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
                        class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
                      >
                        Authentication
                        <Icon
                          icon="radix-icons:caret-down"
                          class="relative top-[1px] text-green10 transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
                        />
                      </ANavigationMenuTrigger>
                      <ANavigationMenuContent
                        class="absolute left-0 top-10 contents w-full rounded-xl bg-white sm:w-auto"
                      >
                        <LinkGroup
                          :items="['Aliquam porttitor', 'Pellentesque']"
                        />
                      </ANavigationMenuContent>
                    </ANavigationMenuItem>

                    <ANavigationMenuIndicator
                      class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] absolute top-full z-[100] mt-[1px] h-[10px] w-[--akar-navigation-menu-indicator-size] flex translate-x-[--akar-navigation-menu-indicator-position] items-end justify-center overflow-hidden duration-200 data-[state=hidden]:opacity-0"
                    >
                      <div
                        class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"
                      />
                    </ANavigationMenuIndicator>
                  </ANavigationMenuList>

                  <ANavigationMenuViewport class="w-full" />
                </ANavigationMenuSub>
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
              class="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut transition-[all,transform_250ms_ease] absolute top-full z-[100] mt-[1px] h-[10px] w-[--akar-navigation-menu-indicator-size] flex translate-x-[--akar-navigation-menu-indicator-position] items-end justify-center overflow-hidden duration-200 data-[state=hidden]:opacity-0"
            >
              <div
                class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white"
              />
            </ANavigationMenuIndicator>
          </ANavigationMenuList>

          <ANavigationMenuViewport
            class="absolute top-full mt-[10px] h-[var(--akar-navigation-menu-viewport-height)] w-[var(--akar-navigation-menu-viewport-width)] origin-[top_center] overflow-hidden border-t bg-white shadow-xl transition-[height]"
          />
        </ANavigationMenuRoot>
      </StoryFrame>
    </Variant>
  </Story>
</template>
