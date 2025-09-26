<script setup lang="ts">
import { PHeader } from '#components';
import { useHeader, useRoute } from '#imports';

const route = useRoute();
const { desktopLinks } = useHeader();
</script>

<template>
  <PHeader
    :ui="{ left: 'min-w-0' }"
    class="flex-vertical"
  >
    <template #left>
      <HeaderLogo />
    </template>

    <UNavigationMenu
      :items="desktopLinks"
      variant="link"
    />

    <template #right>
      <ThemePicker />

      <UTooltip
        text="Search"
        :kbds="['meta', 'K']"
      >
        <UContentSearchButton />
      </UTooltip>

      <UTooltip
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
      </UTooltip>
    </template>

    <template #body>
      <HeaderBody />
    </template>

    <template
      v-if="route.path.startsWith('/docs/')"
      #bottom
    >
      <HeaderBottom />
    </template>
  </PHeader>
</template>
