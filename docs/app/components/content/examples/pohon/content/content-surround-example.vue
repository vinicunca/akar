<script setup lang="ts">
import { useAsyncData, useRoute } from '#app';
import { queryCollectionItemSurroundings } from '#imports';

const route = useRoute();

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  });
});
</script>

<template>
  <PContentSurround :surround="(surround as any)" />
</template>
