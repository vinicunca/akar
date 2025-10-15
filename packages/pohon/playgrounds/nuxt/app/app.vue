<script setup lang="ts">
import { useAppConfig, useRoute } from '#app';
import { BaseLogo, BaseThemeDropdown, PApp, PDashboardGroup, PDashboardPanel, PDashboardSidebar } from '#components';

const route = useRoute();
const appConfig = useAppConfig();
// const { components, groups, items } = useNavigation()

// provide('components', components)
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

            <!-- <UColorModeButton /> -->
          </div>
        </template>

        <!-- <UDashboardSearchButton /> -->

        <!-- <UNavigationMenu
          :items="items"
          orientation="vertical"
        /> -->

        <!-- <USeparator type="dashed" /> -->

        <!-- <UNavigationMenu
          :items="components"
          orientation="vertical"
        /> -->
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

  <div class="color-text-inverted bg-background-inverted focus-visible:(outline-2 outline-outline-inverted outline-offset-2) active:bg-background-inverted/90 aria-disabled:bg-background-inverted disabled:bg-background-inverted hover:bg-background-inverted/90" />
</template>

<style lang="postcss">
:root {
  --pohon-header-height: 4rem;
}

body {
  @apply antialiased color-text bg-background scheme-light dark:scheme-dark;
}
</style>
