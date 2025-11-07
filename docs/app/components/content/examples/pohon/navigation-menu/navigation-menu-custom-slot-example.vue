<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui';

const items = [
  {
    label: 'Guide',
    icon: 'i-lucide:book-open',
  },
  {
    label: 'Composables',
    icon: 'i-lucide:database',
  },
  {
    label: 'Components',
    icon: 'i-lucide:box',
    slot: 'components' as const,
  },
] satisfies Array<PNavigationMenuItem>;
</script>

<template>
  <PNavigationMenu
    :items="items"
    class="w-full akar:justify-center"
  >
    <template #components-trailing>
      <PBadge
        label="44"
        variant="subtle"
        size="sm"
      />
    </template>
  </PNavigationMenu>
</template>
