<script setup lang="ts">
import { useAppConfig, useRoute } from '#app';
import { computed, useColorMode } from '#imports';

const route = useRoute();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const name = route.params.slug?.[0];

if (route.query.theme) {
  colorMode.preference = route.query.theme === 'light' ? 'light' : 'dark';
}

if (route.query.neutral) {
  appConfig.pohon.colors.neutral = route.query.neutral as string;
}

if (route.query.primary) {
  appConfig.pohon.colors.primary = route.query.primary as string;
}

const width = computed(() =>
  route.query.width
  && Number.parseInt(route.query.width as string) > 0
    ? `${Number.parseInt(route.query.width as string) - 2}px`
    : '864px',
);
</script>

<template>
  <div class="example flex flex-col h-screen items-center">
    <component
      :is="name"
      v-bind="route.query"
    />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .example {
    --pohon-container: v-bind(width);
  }
}
</style>
