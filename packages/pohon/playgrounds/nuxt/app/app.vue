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

  <div class="data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2) data-[state=open]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2)" />
</template>

<style lang="postcss">
:root {
  --pohon-header-height: 4rem;
}

html {
  font-family: 'Rubik';
}

body {
  @apply antialiased color-text bg-background scheme-light dark:scheme-dark;
}
</style>
