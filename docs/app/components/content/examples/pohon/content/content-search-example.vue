<script setup lang="ts">
import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import { useLazyAsyncData } from '#app';
import { inject, queryCollectionSearchSections, ref } from '#imports';

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
});

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');

const searchTerm = ref('');
</script>

<template>
  <ClientOnly>
    <LazyPContentSearch
      v-model:search-term="searchTerm"
      open
      :autofocus="false"
      :files="files"
      :navigation="navigation"
      :fuse="{ resultLimit: 42 }"
    />
  </ClientOnly>
</template>
