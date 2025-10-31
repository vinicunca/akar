<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { Ref } from 'vue';
import { inject } from 'vue';

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');
</script>

<template>
  <PContentNavigation
    :navigation="navigation"
    highlight
  />
</template>
