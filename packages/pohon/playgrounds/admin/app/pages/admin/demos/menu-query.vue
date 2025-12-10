<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  icon: 'i-lucide:curly-braces',
  query: {
    id: 1,
  },
  title: 'pages.demos.features.menuWithQuery',
});
</script>

<template>
  <div>
    <h1>MenuQueryDemo</h1>
    <p>Path: /demos/menu-query</p>
  </div>
</template>
