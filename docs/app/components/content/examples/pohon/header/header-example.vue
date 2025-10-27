<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui';
import { useRoute } from '#app';
import { BaseLogo, PColorModeButton, PNavigationMenu } from '#components';
import { computed } from 'vue';

const route = useRoute();

const items = computed<Array<PNavigationMenuItem>>(() => [
  {
    label: 'Docs',
    to: '/docs/pohon/getting-started',
    active: route.path.startsWith('/docs/pohon/getting-started'),
  },
  {
    label: 'Components',
    to: '/docs/pohon/components',
    active: route.path.startsWith('/docs/pohon/components'),
  },
  {
    label: 'Figma',
    to: 'https://akar.vinicunca.dev/figma-ui',
    target: '_blank',
  },
  {
    label: 'Releases',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank',
  },
]);
</script>

<template>
  <PHeader>
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
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </PTooltip>
    </template>
  </PHeader>
</template>
