<script lang="ts" setup>
import { ATooltipProvider } from '@vinicunca/akar';
import { useScroll } from '@vueuse/core';
import { useData } from 'vitepress';
import { toRefs } from 'vue';
import LayoutNavbar from '../components/layout-navbar.vue';
import LayoutSearchTrigger from '../components/layout-search-trigger.vue';
import LayoutDocs from './layout-docs.vue';
import LayoutHome from './layout-home.vue';

const { site, theme, frontmatter } = useData();
const { arrivedState } = useScroll(globalThis.window);
const { top } = toRefs(arrivedState);
</script>

<template>
  <ATooltipProvider>
    <div class="h-full min-h-screen flex-vertical items-center">
      <header
        class="sticky top-0 z-10 h-[68px] w-full py-4 transition-all duration-500 md:h-full"
        :class="[
          top
            ? 'bg-transparent backdrop-blur-0'
            : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/90']"
      >
        <div class="mx-auto max-w-[1440px] flex items-center justify-between px-6">
          <div class="w-full flex items-center justify-between gap-8 md:justify-initial">
            <a
              href="/"
              class="flex items-center gap-2"
            >
              <img
                class="w-6 md:w-9"
                alt="Akar UI logo"
                :src="theme.logo"
              >
              <span class="text-xl font-bold md:text-2xl">{{ site.title }}</span>
            </a>

            <LayoutSearchTrigger />
          </div>

          <LayoutNavbar />
        </div>
      </header>

      <div
        v-if="frontmatter.layout === 'home'"
        class="h-full w-full flex flex-1 flex-col justify-between"
      >
        <main>
          <LayoutHome />
        </main>
      </div>

      <div
        v-else
        class="h-full max-w-[1440px] w-full grow"
      >
        <LayoutDocs />
      </div>
    </div>
  </ATooltipProvider>
</template>
