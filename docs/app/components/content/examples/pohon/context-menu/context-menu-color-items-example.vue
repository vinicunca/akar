<script setup lang="ts">
import type { PContextMenuItem } from 'pohon-ui';

const items: Array<Array<PContextMenuItem>> = [
  [
    {
      label: 'View',
      icon: 'i-lucide:eye',
    },
    {
      label: 'Copy',
      icon: 'i-lucide:copy',
    },
    {
      label: 'Edit',
      icon: 'i-lucide:pencil',
    },
  ],
  [
    {
      label: 'Delete',
      color: 'error' as const,
      icon: 'i-lucide:trash',
    },
  ],
];
</script>

<template>
  <PContextMenu
    :items="items"
    :pohon="{ content: 'w-48' }"
  >
    <div class="border-border-accented text-sm border rounded-md border-dashed flex w-72 aspect-video items-center justify-center">
      Right click here
    </div>
  </PContextMenu>
</template>
