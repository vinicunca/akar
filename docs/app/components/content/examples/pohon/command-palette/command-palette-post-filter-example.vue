<script setup lang="ts">
const items = [
  {
    id: '/',
    label: 'Introduction',
    level: 1,
  },
  {
    id: '/docs/pohon/getting-started',
    label: 'Getting Started',
    level: 2,
  },
  {
    id: '/docs/pohon/getting-started#akar',
    label: 'Akar',
    level: 3,
  },
  {
    id: '/docs/pohon/getting-started#unocss-variants',
    label: 'UnoCSS Variants',
    level: 3,
  },
  {
    id: '/docs/pohon/getting-started/installation',
    label: 'Installation',
    level: 1,
  },
];

function postFilter(searchTerm: string, items: Array<any>) {
  // Filter only first level items if no searchTerm
  if (!searchTerm) {
    return items?.filter((item) => item.level === 1);
  }

  return items;
}
</script>

<template>
  <PCommandPalette
    :groups="[{ id: 'files', items, postFilter }]"
    class="flex-1"
  />
</template>
