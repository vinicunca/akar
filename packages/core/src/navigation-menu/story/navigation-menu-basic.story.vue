<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import {
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
} from '..';
import LinkGroup from './_link-group.vue';
import StoryFrame from './_story-frame.vue';

const currentTrigger = ref('');
const state = reactive({
  delayDuration: 600,
  skipDelayDuration: 1000,
});
</script>

<template>
  <Story title="Navigation Menu/Basic">
    <Variant title="Default">
      <StoryFrame>
        <ANavigationMenuRoot
          v-model="currentTrigger"
          :delay-duration="state.delayDuration"
          :skip-delay-duration="state.skipDelayDuration"
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
                class="rounded-xl bg-white w-full left-0 top-10 absolute sm:w-auto"
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
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Company
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="rounded-xl bg-white w-full left-0 top-10 absolute sm:w-auto"
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
                class="group text-grass11 hover:bg-green3 focus:shadow-green7 text-[15px] leading-none font-medium px-3 py-2 outline-none rounded-[4px] flex gap-[2px] select-none items-center justify-between focus:shadow-[0_0_0_2px]"
              >
                Developers
                <Icon
                  icon="radix-icons:caret-down"
                  class="color-green10 transition-transform duration-250 ease-in top-[1px] relative group-data-[state=open]:-rotate-180"
                />
              </ANavigationMenuTrigger>
              <ANavigationMenuContent
                class="rounded-xl bg-white w-full left-0 top-10 absolute sm:w-auto"
              >
                <LinkGroup :items="['Aliquam porttitor', 'Pellentesque']" />
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
              class="bg-green10 rounded-full h-[2px] w-[--akar-navigation-menu-indicator-size] translate-x-[--akar-navigation-menu-indicator-position] transition-[width,transform] duration-300 bottom-0 left-0 absolute"
            />
          </ANavigationMenuList>
        </ANavigationMenuRoot>
      </StoryFrame>

      <template #controls>
        <HstNumber
          v-model="state.delayDuration"
          title="Delay Duration"
        />
        <HstNumber
          v-model="state.skipDelayDuration"
          title="Skip Delay Duration"
        />
      </template>
    </Variant>
  </Story>
</template>
