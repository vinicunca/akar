<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  activePath: '/demos/features/tabs',
  hideInMenu: true,
  maxNumOfOpenTab: 3,
  title: 'pages.demos.features.tabDetail',
});
</script>

<template>
  <div>
    <h1>FeatureTabDetailDemo</h1>
    <p>Path: /demos/features/tabs/detail/:id</p>
  </div>
</template>
