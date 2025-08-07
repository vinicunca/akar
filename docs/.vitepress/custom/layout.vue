<script lang="ts" setup>
import { toRefs, useScroll } from '@vueuse/core';
import { ATooltipProvider } from 'akar';
import { useData } from 'vitepress';
import Navbar from '../components/navbar.vue';
import Docs from './docs.vue';
import Logo from './logo.vue';

const { site, frontmatter } = useData();
const { arrivedState } = useScroll(globalThis.window);
const { top } = toRefs(arrivedState);
</script>

<template>
  <ATooltipProvider>
    <div class="flex flex-col h-full min-h-screen items-center">
      <header
        class="py-4 h-[68px] w-full transition-all-500 top-0 sticky z-20 md:h-full"
        :class="[
          top
            ? 'bg-transparent backdrop-blur-0'
            : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/90',
        ]"
      >
        <div class="mx-auto px-6 flex max-w-[1440px] items-center justify-between">
          <div class="flex gap-8 w-full items-center justify-between md:justify-normal">
            <a
              href="/"
              class="flex gap-2 items-center"
            >
              <Logo class="h-9 w-6 md:w-9" />
              <span class="text-xl font-bold md:text-2xl">{{ site.title }}</span>
            </a>

            <!-- <SearchTrigger /> -->
          </div>

          <Navbar />
        </div>
      </header>

      <div
        v-if="frontmatter.layout === 'home'"
        class="flex flex-1 flex-col size-full justify-between"
      >
        <main>
          <!-- <Home /> -->
        </main>
      </div>

      <div
        v-else-if="frontmatter.layout === 'showcase'"
        class="grow size-full max-w-[1440px]"
      >
        <!-- <Showcase /> -->
      </div>

      <div
        v-else
        class="grow size-full max-w-[1440px]"
      >
        <Docs />
      </div>
    </div>
  </ATooltipProvider>
</template>
