<script setup lang="ts">
import { createError, useAsyncData, useRoute } from '#app';
import { queryCollection } from '#imports';

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}
</script>

<template>
  <PContentToc :links="page?.body?.toc?.links" />
</template>
