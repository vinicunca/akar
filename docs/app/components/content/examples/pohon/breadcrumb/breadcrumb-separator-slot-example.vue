<script setup lang="ts">
import type { PBreadcrumbItem } from 'pohon-ui';

const items: Array<PBreadcrumbItem> = [
  {
    label: 'Docs',
    to: '/docs',
  },
  {
    label: 'Components',
    to: '/docs/components',
  },
  {
    label: 'Breadcrumb',
    to: '/docs/components/breadcrumb',
  },
];
</script>

<template>
  <PBreadcrumb :items="items">
    <template #separator>
      <span class="color-text-muted mx-2">/</span>
    </template>
  </PBreadcrumb>
</template>
