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

  <div class="data-[highlighted]:bg-background-inverted/20 data-[today]:not-[[data-selected]]:color-text-highlighted hover:not-[[data-selected]]:bg-background-inverted/10 akar:(data-[selected]:color-text data-[selected]:bg-background-elevated data-[selected]:ring data-[selected]:ring-ring-accented data-[selected]:ring-inset)" />
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
