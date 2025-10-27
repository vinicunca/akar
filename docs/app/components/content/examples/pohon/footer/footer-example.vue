<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui';
import { PButton, PFooter, PNavigationMenu } from '#components';

const items: Array<PNavigationMenuItem> = [{
  label: 'Figma Kit',
  to: 'https://akar.vinicunca.dev/figma-ui',
  target: '_blank',
}, {
  label: 'Playground',
  to: 'https://stackblitz.com/edit/pohon-ui',
  target: '_blank',
}, {
  label: 'Releases',
  to: 'https://github.com/vinicunca/akar/releases',
  target: '_blank',
}];
</script>

<template>
  <PFooter class="w-full">
    <template #left>
      <p class="text-sm color-text-muted">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <PNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <PButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://akar.vinicunca.dev/discord"
        target="_blank"
        aria-label="Discord"
      />
      <PButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://akar.vinicunca.dev/x"
        target="_blank"
        aria-label="X"
      />
      <PButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </PFooter>
</template>
