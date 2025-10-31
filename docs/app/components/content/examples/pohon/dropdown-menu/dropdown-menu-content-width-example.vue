<script setup lang="ts">
import type { PDropdownMenuItem } from 'pohon-ui';

const items: Array<Array<PDropdownMenuItem>> = [
  [
    {
      label: 'View',
      icon: 'i-lucide-eye',
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy',
    },
    {
      label: 'Edit',
      icon: 'i-lucide-pencil',
    },
  ],
  [
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash',
    },
  ],
];
</script>

<template>
  <PDropdownMenu
    :items="items"
    :pohon="{ content: 'w-(--akar-dropdown-menu-trigger-width)' }"
  >
    <PButton
      label="Open"
      class="w-46"
      color="neutral"
      variant="outline"
      block
      trailing-icon="i-lucide-chevron-down"
    />
  </PDropdownMenu>
</template>
