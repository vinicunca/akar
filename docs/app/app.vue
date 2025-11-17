<script lang="ts" setup>
import { PApp } from '#components';
import {
  computed,
  provide,
  queryCollectionNavigation,
  queryCollectionSearchSections,
  useAppConfig,
  useAsyncData,
  useColorMode,
  useFaviconFromTheme,
  useHead,
  useLazyAsyncData,
  useNavigation,
  useRoute,
  useServerSeoMeta,
} from '#imports';
import LayoutHeaderSearch from './components/header/layout-header-search.vue';
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

const { data: files } = useLazyAsyncData(
  'search',
  () => queryCollectionSearchSections('docs', {
    ignoredTags: ['style'],
  }),
  {
    server: false,
  },
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

const { rootNavigation, navigationByFramework } = useNavigation(navigation);

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

    <div :class="{ root: route.path.startsWith('/docs/') }">
      <LayoutHeader v-if="!route.path.startsWith('/examples')" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <template v-if="!route.path.startsWith('/examples')">
        <LayoutFooter />

        <ClientOnly>
          <LayoutHeaderSearch
            :files="files"
            :navigation="navigationByFramework"
          />
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
