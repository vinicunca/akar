<script setup lang="ts">
import { useAppConfig, useRoute } from '#app';
import {
  BaseLogo,
  BaseThemeDropdown,
  PApp,
  PColorModeButton,
  PDashboardGroup,
  PDashboardPanel,
  PDashboardSidebar,
  PNavigationMenu,
  PSeparator,
} from '#components';
import { provide, useNavigation } from '#imports';

const route = useRoute();
const appConfig = useAppConfig();
const { components, items } = useNavigation();

provide('components', components);
</script>

<template>
  <PApp
    :toaster="appConfig.toaster"
    :dir="appConfig.dir"
  >
    <PDashboardGroup unit="rem">
      <PDashboardSidebar class="bg-background-elevated/25">
        <template #header>
          <NuxtLink
            to="/"
            class="color-text-highlighted"
            aria-label="Home"
          >
            <BaseLogo class="h-5 w-auto" />
          </NuxtLink>

          <div class="ms-auto flex items-center">
            <BaseThemeDropdown />

            <PColorModeButton />
          </div>
        </template>

        <!-- <UDashboardSearchButton /> -->

        <PNavigationMenu
          :items="items"
          orientation="vertical"
        />

        <PSeparator type="dashed" />

        <PNavigationMenu
          :items="components"
          orientation="vertical"
        />
      </PDashboardSidebar>

      <PDashboardPanel :pohon="{ body: ['justify-center items-center', route.path.startsWith('/components') && 'mt-16'] }">
        <template #body>
          <NuxtPage />
        </template>
      </PDashboardPanel>

      <!-- <PDashboardSearch
        :groups="groups"
        :fuse="{ resultLimit: 100 }"
      /> -->
    </PDashboardGroup>
  </PApp>

  <div class="group text-sm flex w-full select-none items-center relative focus-visible:outline-none focus:outline-none before:(rounded-md content-empty inset-x-0 inset-y-px absolute -z-1) focus-visible:before:ring-2 focus-visible:before:ring-inset" />
</template>

<style lang="postcss">
:root {
  --pohon-header-height: 4rem;
}

html {
  font-family: 'Inter';
}

body {
  @apply antialiased color-text bg-background scheme-light dark:scheme-dark;
}
</style>
