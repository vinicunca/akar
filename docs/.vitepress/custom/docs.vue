<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress';
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from 'akar';
import { Content, useData, useRoute } from 'vitepress';
import { computed, toRefs } from 'vue';
import DocFooter from '../components/doc-footer.vue';
import DocOutline from '../components/doc-outline.vue';
import DocSidebar from '../components/doc-sidebar.vue';
import DocTopbar from '../components/doc-topbar.vue';
import { flatten } from '../functions/flatten';
import { coreSidebarItems, pohonSidebarItems } from '../theme/sidebar';

const { theme } = useData();
const { path } = toRefs(useRoute());

const isPohonPage = computed(() => path.value.includes('pohon'));
const isCorePage = computed(() => path.value.includes('core'));

const sidebar = computed(() => theme.value.sidebar as Array<DefaultTheme.SidebarItem>);
const activeSection = computed(() => {
  let navItems: Array<DefaultTheme.SidebarItem> = [];

  if (isCorePage.value) {
    navItems = coreSidebarItems.items ?? [];
  } else if (isPohonPage.value) {
    navItems = pohonSidebarItems.items ?? [];
  } else {
    navItems = sidebar.value ?? [];
  }

  return navItems.find(
    (section) => flatten(section.items ?? [], 'items')
      ?.find((item) => item.link === path.value.replace('.html', '')),
  );
});

const isExamplePage = computed(() => path.value.includes('examples'));
</script>

<template>
  <div class="w-full">
    <DocTopbar />

    <main class="flex">
      <aside class="py-4 pl-4 pr-4 flex-shrink-0 h-full max-h-[calc(100vh-7.25rem)] w-[17rem] hidden top-[7.25rem] sticky overflow-y-auto md:block">
        <div
          v-if="activeSection"
          class="h-full"
        >
          <DocSidebar :items="activeSection.items ?? []" />
        </div>

        <div class="h-6 w-full" />
      </aside>

      <div class="px-6 py-6 flex-1 overflow-x-hidden md:px-24 md:py-12">
        <ACollapsibleRoot
          :key="path"
          class="mb-4 block xl:hidden"
        >
          <ACollapsibleTrigger class="text-sm mb-2 px-4 py-2 border border-muted rounded-lg bg-card data-[state=open]:bg-muted">
            On this page
          </ACollapsibleTrigger>

          <ACollapsibleContent class="ml-4 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <DocOutline collapsible />
          </ACollapsibleContent>
        </ACollapsibleRoot>

        <div class="text-sm color-primary font-bold mb-2">
          {{ activeSection?.text }}
        </div>

        <article class="max-w-none w-full prose prose-stone dark:prose-invert">
          <Content />
        </article>

        <DocFooter v-if="!isExamplePage" />
      </div>

      <div
        v-if="!isExamplePage"
        class="no-scrollbar py-12 pl-2 flex-shrink-0 flex-col h-[calc(100vh-7.25rem)] w-64 hidden top-[7.25rem] sticky overflow-y-auto space-y-6 xl:flex md:overflow-x-hidden"
      >
        <DocOutline />
        <!-- <DocCommunity /> -->
        <div class="grow" />

        <div class="h-12 w-64 bottom-0 fixed z-10 from-transparent to-background bg-gradient-to-b" />
      </div>
    </main>
  </div>
</template>
