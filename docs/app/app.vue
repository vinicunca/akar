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
  useServerSeoMeta,
} from '#imports';
import LayoutHeader from './components/header/layout-header.vue';

const appConfig = useAppConfig();
const colorMode = useColorMode();

const { data: navigation } = useAsyncData(
  'navigation',
  () => queryCollectionNavigation('akar', [
    'framework',
    'category',
    'description',
  ]),
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

    <div class="data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg data-[state=closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2" />

    <div
      class="root"
    >
      <LayoutHeader />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
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
