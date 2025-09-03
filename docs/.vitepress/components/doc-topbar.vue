<script setup lang="ts">
import type { DefaultTheme } from 'vitepress';
import { Icon } from '@iconify/vue';
import { useScroll } from '@vueuse/core';
import {
  ADialogContent,
  ADialogDescription,
  ADialogOverlay,
  ADialogPortal,
  ADialogRoot,
  ADialogTitle,
  ADialogTrigger,
} from 'akar';
import { useData, useRoute } from 'vitepress';
import { computed, ref, toRefs, watch } from 'vue';
import { flatten } from '../functions/flatten';
import DocSidebarItem from './doc-sidebar-item.vue';

const { path } = toRefs(useRoute());
const { page, theme } = useData();

const isSidebarOpen = ref(false);
const sidebar = computed(() => (theme.value.sidebar as Array<DefaultTheme.SidebarItem>));

const sectionTabs = computed(() =>
  sidebar.value.map(
    (val) => ({
      label: val.text,
      link: flatten(val.items ?? [], 'items').filter((i) => !!i.link)?.[0].link ?? '',
      icon: val.icon,
    }),
  ),
);

const { arrivedState } = useScroll(globalThis.window);
const { top } = toRefs(arrivedState);

watch(path, () => {
  isSidebarOpen.value = false;
});
</script>

<template>
  <div
    class="px-4 border-y border-muted-foreground/10 h-12 w-full transition-all duration-500 top-[4.25rem] sticky z-10"
    :class="[top ? 'bg-transparent backdrop-blur-0' : 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80']"
  >
    <div class="h-full hidden items-center justify-between md:flex">
      <div class="flex h-full items-center">
        <a
          v-for="tab in sectionTabs.filter(i => i.label !== 'Examples')"
          :key="tab.label"
          :href="tab.link"
          :class="{
            '!border-b-docs-primary !color-foreground': `/${page.relativePath}`.includes(tab.link.split('/').slice(0, -1).join('/')),
          }"
          class="text-sm color-muted-foreground font-semibold mx-4 py-2 border-b border-b-transparent inline-flex h-full items-center hover:text-foreground hover:border-b-muted"
        >
          <Icon
            v-if="tab.icon"
            :icon="tab.icon"
            class="text-lg mr-2"
          />
          <span>{{ tab.label }}</span>
        </a>
      </div>

      <div class="flex h-full items-center">
        <a
          v-for="tab in sectionTabs.filter(i => i.label === 'Examples')"
          :key="tab.label"
          :href="tab.link"
          :class="{ '!border-b-docs-primary !color-foreground': page.relativePath.includes(tab.label?.toLowerCase() ?? '') }"
          class="text-sm color-muted-foreground font-semibold mx-4 py-2 border-b border-b-transparent inline-flex h-full items-center hover:color-foreground hover:border-b-muted"
        >
          <Icon
            v-if="tab.icon"
            :icon="tab.icon"
            class="text-lg mr-2"
          />
          <span>{{ tab.label }}</span>
        </a>
      </div>
    </div>

    <div class="flex h-full items-center justify-between md:hidden">
      <ADialogRoot v-model:open="isSidebarOpen">
        <ADialogTrigger
          aria-label="Menu button"
          class="p-2 rounded-lg flex items-center hover:bg-muted"
        >
          <Icon
            icon=""
            class="i-lucide:menu text-lg"
          />
          <span class="text-sm ml-2">Menu</span>
        </ADialogTrigger>

        <ADialogPortal>
          <ADialogOverlay class="bg-black/80 inset-0 fixed z-50 data-[state=closed]:(animate-out fade-out) data-[state=open]:(animate-in fade-in)" />
          <ADialogContent class="pr-0 border-r border-muted bg-background gap-4 h-full w-3/4 shadow-lg transition ease-in-out inset-y-0 left-0 fixed z-50 sm:max-w-sm data-[state=closed]:(animate-out fade-out slide-out-to-left) data-[state=open]:(animate-in fade-in slide-in-left-200px)">
            <ADialogTitle class="sr-only">
              Sidebar menu
            </ADialogTitle>
            <ADialogDescription class="sr-only">
              List of navigation item
            </ADialogDescription>

            <div class="pt-8 h-full overflow-y-auto">
              <div
                v-for="group in theme.sidebar"
                :key="group.text"
                class="mb-4 px-4 pb-4 border-b border-muted"
              >
                <div class="mb-2 ml-2 flex items-center">
                  <Icon
                    v-if="group.icon"
                    :icon="group.icon"
                    class="text-lg mx-2"
                  />
                  <span class="font-bold">{{ group.text }}</span>
                </div>

                <template
                  v-for="item in group.items"
                  :key="item.text"
                >
                  <ul
                    v-if="item.items?.length"
                    class="[&:not(:last-child)]:mb-6"
                  >
                    <div class="text-sm font-bold pb-2 pl-4">
                      {{ item.text }}
                    </div>
                    <DocSidebarItem
                      v-for="subitem in item.items"
                      :key="subitem.text"
                      :item="subitem"
                    />
                  </ul>

                  <DocSidebarItem
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

      <div class="flex h-full items-center">
        <a
          href="/examples"
          :class="{ '!border-b-docs-primary !font-semibold !color-foreground': page.relativePath.includes('examples') }"
          class="text-sm color-muted-foreground font-medium mx-4 py-2 border-b border-b-transparent inline-flex gap-2 h-full items-center hover:color-foreground hover:border-b-muted"
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
