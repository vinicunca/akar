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
                class="absolute left-0 top-10 w-full rounded-xl bg-white sm:w-auto"
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
                class="absolute left-0 top-10 w-full rounded-xl bg-white sm:w-auto"
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
                class="absolute left-0 top-10 w-full rounded-xl bg-white sm:w-auto"
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
              class="absolute bottom-0 left-0 h-[2px] w-[--akar-navigation-menu-indicator-size] translate-x-[--akar-navigation-menu-indicator-position] rounded-full bg-green10 transition-[width,transform] duration-300"
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
