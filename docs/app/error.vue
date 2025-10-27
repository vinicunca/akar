<script lang="ts" setup>
import type { NuxtError } from '#app';
import { useAppConfig, useAsyncData, useHead, useRoute, useSeoMeta } from '#app';
import { computed, provide, queryCollectionNavigation, useColorMode, useFaviconFromTheme, useNavigation } from '#imports';
import LayoutHeader from './components/header/layout-header.vue';

const props = defineProps<{
  error: NuxtError;
}>();

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

useSeoMeta({
  titleTemplate: '%s - Akar',
  title: String(props.error.statusCode),
});

useFaviconFromTheme();

const { rootNavigation } = useNavigation(navigation);

provide('navigation', rootNavigation);
</script>

<template>
  <PApp>
    <NuxtLoadingIndicator
      color="var(--akar-primary)"
      :height="2"
    />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <LayoutHeader />

      <PError :error="error" />

      <LayoutFooter />
    </div>
  </PApp>
</template>
