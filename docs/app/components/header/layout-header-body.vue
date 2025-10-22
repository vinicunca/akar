<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { Ref } from 'vue';
import { useRoute } from '#app';
import { PContentNavigation, PNavigationMenu, PSeparator } from '#components';
import { useHeader, useNavigation } from '#imports';
import { inject } from 'vue';

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');

const route = useRoute();
const { mobileLinks } = useHeader();
const { navigationByCategory } = useNavigation(navigation!);
</script>

<template>
  <PNavigationMenu
    orientation="vertical"
    :items="mobileLinks"
    class="-mx-2.5"
  />

  <template v-if="route.path.startsWith('/docs/')">
    <PSeparator
      type="dashed"
      class="mb-6 mt-4"
    />

    <div
      v-if="route.params.slug?.[0] === 'pohon'"
      class="mb-5.5 flex flex-col gap-2"
    >
      <!-- <FrameworkTabs /> -->
    </div>

    <PContentNavigation
      :navigation="navigationByCategory"
      highlight
      :pohon="{ linkTrailingBadge: 'font-semibold uppercase' }"
    />
  </template>
</template>
