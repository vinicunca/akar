<script setup lang="ts">
import { useRoute } from '#app';
import { PButton, PContentSearchButton, PHeader, PNavigationMenu, PTooltip } from '#components';
import { useHeader } from '~/composables/use-header';
import LayoutHeaderBody from './layout-header-body.vue';
import LayoutHeaderBottom from './layout-header-bottom.vue';
import LayoutHeaderLogo from './layout-header-logo.vue';
import LayoutHeaderThemePicker from './layout-header-theme-picker.vue';

const route = useRoute();
const { desktopLinks } = useHeader();
</script>

<template>
  <PHeader
    :pohon="{ left: 'min-w-0' }"
    class="flex flex-col"
  >
    <template #left>
      <LayoutHeaderLogo />
    </template>

    <PNavigationMenu
      :items="desktopLinks"
      variant="link"
    />

    <template #right>
      <LayoutHeaderThemePicker />

      <PTooltip
        text="Search"
        :kbds="['meta', 'K']"
      >
        <PContentSearchButton />
      </PTooltip>

      <PTooltip
        text="Open on GitHub"
        class="hidden lg:flex"
      >
        <PButton
          color="neutral"
          variant="ghost"
          to="https://github.com/vinicunca/akar"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </PTooltip>
    </template>

    <template #body>
      <LayoutHeaderBody />
    </template>

    <template
      v-if="route.path.startsWith('/docs/akar/') || route.path.startsWith('/docs/pohon/')"
      #bottom
    >
      <LayoutHeaderBottom />
    </template>
  </PHeader>
</template>
