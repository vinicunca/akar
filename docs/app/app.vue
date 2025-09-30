<script lang="ts" setup>
import { PApp } from '#components';
import {
  computed,
  provide,
  queryCollectionNavigation,
  useAppConfig,
  useAsyncData,
  useColorMode,
  useFaviconFromTheme,
  useHead,
  useNavigation,
  useRoute,
  useServerSeoMeta,
} from '#imports';
import LayoutHeader from './components/header/layout-header.vue';

const route = useRoute();
const appConfig = useAppConfig();
const colorMode = useColorMode();

const { data: navigation } = await useAsyncData(
  'navigation',
  () => queryCollectionNavigation('docs', ['framework', 'category', 'description']),
);

const color = computed(() => colorMode.value === 'dark' ? 'black' : 'white');
const radius = computed(() => `:root { --pohon-radius: ${appConfig.theme.radius}rem; }`);

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  style: [
    { innerHTML: radius, id: 'pohon-radius', tagPriority: -2 },
  ],
  htmlAttrs: {
    lang: 'en',
  },
});

useServerSeoMeta({
  ogSiteName: 'Akar',
  twitterCard: 'summary_large_image',
});

useFaviconFromTheme();

const { rootNavigation } = useNavigation(navigation);

provide('navigation', rootNavigation);
</script>

<template>
  <PApp :toaster="appConfig.toaster">
    <NuxtLoadingIndicator
      color="var(--akar-brand-primary)"
      :height="2"
    />

    <div
      :class="{
        root: route.path.startsWith('/docs/'),
      }"
    >
      <template v-if="!route.path.startsWith('/examples')">
        <!-- <Banner /> -->

        <LayoutHeader />
      </template>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <template v-if="!route.path.startsWith('/examples')">
        <!-- <Footer /> -->

        <ClientOnly>
          <!-- <LazyUContentSearch
            :links="links"
            :files="files"
            :groups="[{
              id: 'framework',
              label: 'Framework',
              items: frameworks,
            }]"
            :navigation="navigationByFramework"
            :fuse="{ resultLimit: 120 }"
          /> -->
        </ClientOnly>
      </template>
    </div>
  </PApp>
</template>

<style lang="postcss">
@media (min-width: 1024px) {
  .root {
    --pohon-header-height: 112px;
  }
}
</style>
