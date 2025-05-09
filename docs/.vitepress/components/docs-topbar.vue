<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress';
import { Icon } from '@iconify/vue';
import {
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
} from '@vinicunca/akar';
import { useScroll } from '@vueuse/core';
import { useData } from 'vitepress';
import { computed, ref, toRefs } from 'vue';
import { flatten } from '../functions/flatten';
import DocsSidebarItem from './docs-sidebar-item.vue';

const { arrivedState } = useScroll(globalThis.window);
const { top } = toRefs(arrivedState);

const { page, theme } = useData();

const sidebar = computed<Array<DefaultTheme.SidebarItem>>(() => theme.value.sidebar);
const sectionTabs = computed(() =>
  sidebar.value.map((val) => ({
    label: val.text,
    link: flatten(val.items ?? [], 'items').filter((item) => !!item.link)?.[0].link,
    icon: val.icon,
  })),
);

const isSidebarOpen = ref(false);
</script>

<template>
  <div
    class="sticky top-[4.25rem] z-10 h-12 w-full border-y border-muted-foreground/10 px-4 transition-500"
    :class="[
      top
        ? 'bg-transparent backdrop-blur-0'
        : 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80']"
  >
    <div class="hidden h-full items-center justify-between md:flex">
      <div class="h-full flex items-center">
        <a
          v-for="tab in sectionTabs.filter(i => i.label !== 'Examples')"
          :key="tab.label"
          :href="tab.link"
          :class="{
            '!border-b-primary !text-foreground': `/${page.relativePath}`.includes(tab.link.split('/').slice(0, -1).join('/')),
          }"
          class="mx-4 h-full inline-flex items-center border-b border-b-transparent py-2 text-sm text-muted-foreground font-semibold hover:(border-b-muted text-foreground)"
        >
          <Icon
            v-if="tab.icon"
            :icon="tab.icon"
            class="mr-2 text-lg"
          />
          <span>{{ tab.label }}</span>
        </a>
      </div>

      <div class="h-full flex items-center">
        <a
          v-for="tab in sectionTabs.filter(i => i.label === 'Examples')"
          :key="tab.label"
          :href="tab.link"
          :class="{ '!border-b-primary !text-foreground': page.relativePath.includes(tab.label?.toLowerCase() ?? '') }"
          class="mx-4 h-full inline-flex items-center border-b border-b-transparent py-2 text-sm text-muted-foreground font-semibold hover:border-b-muted hover:text-foreground"
        >
          <Icon
            v-if="tab.icon"
            :icon="tab.icon"
            class="mr-2 text-lg"
          />
          <span>{{ tab.label }}</span>
        </a>
      </div>
    </div>

    <div class="h-full flex items-center justify-between md:hidden">
      <ADialogRoot v-model:open="isSidebarOpen">
        <ADialogTrigger
          aria-label="Menu button"
          class="flex items-center rounded-lg p-2 hover:bg-muted"
        >
          <Icon
            icon="lucide:menu"
            class="text-lg"
          />
          <span class="ml-2 text-sm">Menu</span>
        </ADialogTrigger>

        <ADialogPortal>
          <ADialogOverlay class="data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut fixed inset-0 z-50 bg-black/80" />
          <ADialogContent class="data-[state=open]:animate-enterFromLeft data-[state=closed]:animate-exitToLeft fixed inset-y-0 left-0 z-50 h-full w-3/4 gap-4 border-r border-muted bg-background pr-0 shadow-lg transition ease-in-out sm:max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left">
            <ADialogTitle class="sr-only">
              Sidebar menu
            </ADialogTitle>
            <ADialogDescription class="sr-only">
              List of navigation item
            </ADialogDescription>

            <div class="h-full overflow-y-auto px-4 pt-8">
              <div
                v-for="group in theme.sidebar"
                :key="group.text"
                class="mb-4"
              >
                <div class="mb-2 flex items-center">
                  <Icon
                    v-if="group.icon"
                    :icon="group.icon"
                    class="mx-2 text-lg"
                  />
                  <span class="font-semibold">{{ group.text }}</span>
                </div>

                <template
                  v-for="item in group.items"
                  :key="item.text"
                >
                  <ul
                    v-if="item.items?.length"
                    class="mb-6"
                  >
                    <div class="pb-2 pl-4 text-sm font-bold">
                      {{ item.text }}
                    </div>
                    <DocsSidebarItem
                      v-for="subitem in item.items"
                      :key="subitem.text"
                      :item="subitem"
                    />
                  </ul>

                  <DocsSidebarItem
                    v-else
                    :item="item"
                  />
                </template>
              </div>
              <div class="h-12 w-full" />
            </div>
          </ADialogContent>
        </ADialogPortal>
      </ADialogRoot>

      <div class="h-full flex items-center">
        <a
          href="/examples"
          :class="{ '!border-b-primary !font-semibold !text-foreground': page.relativePath.includes('examples') }"
          class="mx-4 h-full inline-flex items-center gap-2 border-b border-b-transparent py-2 text-sm text-muted-foreground font-medium hover:border-b-muted hover:text-foreground"
        >
          <Icon
            icon="lucide:square-dashed-mouse-pointer"
            class="text-lg"
          />
          Examples
        </a>
      </div>
    </div>
  </div>
</template>
