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
import LayoutFooter from './components/layout-footer.vue';

const route = useRoute();
const appConfig = useAppConfig();
const colorMode = useColorMode();

const { data: navigation } = useAsyncData(
  'navigation',
  () => queryCollectionNavigation('docs', [
    'framework',
    'category',
    'description',
  ]),
);

const color = computed(() => colorMode.value === 'dark' ? 'black' : 'white');
const radius = computed(() => `:root { --pohon-ui-radius: ${appConfig.theme.radius}rem; }`);
const blackAsPrimary = computed(() => appConfig.theme.blackAsPrimary ? ':root { --akar-primary: black; } .dark { --akar-primary: white; }' : ':root {}');

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  style: [
    { innerHTML: radius, id: 'pohon-ui-radius', tagPriority: -2 },
    { innerHTML: blackAsPrimary, id: 'pohon-ui-black-as-primary', tagPriority: -2 },
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
  <PApp
    :toaster="appConfig.toaster"
    :tooltip="{
      delayDuration: 300,
    }"
  >
    <NuxtLoadingIndicator
      color="var(--akar-primary)"
      :height="2"
    />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <LayoutHeader />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <LayoutFooter />
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
