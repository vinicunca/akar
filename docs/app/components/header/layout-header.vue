<script setup lang="ts">
import { PHeader, PNavigationMenu } from '#components';
import { useHeader } from '~/composables/use-header';
import LayoutHeaderLogo from './layout-header-logo.vue';

const { desktopLinks } = useHeader();
</script>

<template>
  <PHeader
    :pohon="{ left: 'min-w-0' }"
    class="flex-vertical"
  >
    <template #left>
      <LayoutHeaderLogo />
    </template>

    <PNavigationMenu
      :items="desktopLinks"
      variant="link"
    />

    <template #right>
      <!-- <ThemePicker /> -->

      <!-- <UTooltip
        text="Search"
        :kbds="['meta', 'K']"
      >
        <UContentSearchButton />
      </UTooltip> -->

      <!-- <UTooltip
        text="Open on GitHub"
        class="hidden lg:flex"
      >
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip> -->
    </template>

    <template #body>
      <!-- <HeaderBody /> -->
    </template>

    <template
      #bottom
    >
      <!-- <HeaderBottom /> -->
    </template>
  </PHeader>
</template>
