<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content';
import type { Ref } from 'vue';
import { useRoute } from '#app';
import { PSeparator } from '#components';
import { mapContentNavigation } from 'pohon-ui/utils/content';
import { computed, inject } from 'vue';

const route = useRoute();

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');
console.log('🚀 ~ navigation:', navigation);

const items = computed(() => {
  // const parent = route.params.slug?.[0] as string;
  // console.log('🚀 ~ route:', route);

  return mapContentNavigation(
    navigation?.value.map((item) => ({ ...item, children: undefined })) ?? [],
  )?.map((item) => ({
    ...item,
    active: route.path.startsWith(item.to as string),
  }));
});
</script>

<template>
  <PSeparator class="hidden lg:flex" />

  <PContainer class="hidden items-center justify-between lg:flex">
    {{ items }}
    <!-- <UNavigationMenu :items="items" variant="pill" highlight class="-mx-2.5 -mb-px" /> -->

    <!-- <FrameworkTabs class="w-40" /> -->
  </PContainer>
</template>
