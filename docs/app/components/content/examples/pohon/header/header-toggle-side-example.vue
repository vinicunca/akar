<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui';
import { useRoute } from '#app';
import { BaseLogo, PButton, PColorModeButton, PNavigationMenu, PTooltip } from '#components';
import { computed } from 'vue';

const route = useRoute();

const items = computed<Array<PNavigationMenuItem>>(() => [
  {
    label: 'Docs',
    to: '/docs/pohon/getting-started',
    icon: 'i-lucide:book-open',
    active: route.path.startsWith('/docs/pohon/getting-started'),
  },
  {
    label: 'Components',
    to: '/docs/pohon/components',
    icon: 'i-lucide:box',
    active: route.path.startsWith('/docs/pohon/components'),
  },
  {
    label: 'Figma',
    icon: 'i-simple-icons:figma',
    to: 'https://akar.vinicunca.dev/figma-ui',
    target: '_blank',
  },
  {
    label: 'Releases',
    icon: 'i-lucide:rocket',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank',
  },
]);
</script>

<template>
  <PHeader toggle-side="left">
    <template #title>
      <BaseLogo class="h-6 w-auto" />
    </template>

    <PNavigationMenu :items="items" />

    <template #right>
      <PColorModeButton />

      <PTooltip
        text="Open on GitHub"
        :kbds="['meta', 'G']"
      >
        <PButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons:github"
          aria-label="GitHub"
        />
      </PTooltip>
    </template>

    <template #body>
      <PNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </PHeader>
</template>
