<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);

const users = [
  {
    label: 'praburangki',
    suffix: 'praburangki',
    to: 'https://github.com/praburangki',
    target: '_blank',
    avatar: {
      src: 'https://github.com/praburangki.png',
    },
  },
  {
    label: 'Wahyu Ivan',
    suffix: 'wahyu-ivan',
    to: 'https://github.com/wahyu-ivan',
    target: '_blank',
    avatar: {
      src: 'https://github.com/wahyu-ivan.png',
    },
  },
  {
    label: 'Sébastien Chopin',
    suffix: 'atinux',
    to: 'https://github.com/atinux',
    target: '_blank',
    avatar: {
      src: 'https://github.com/atinux.png',
    },
  },
  {
    label: 'Hugo Richard',
    suffix: 'HugoRCD',
    to: 'https://github.com/HugoRCD',
    target: '_blank',
    avatar: {
      src: 'https://github.com/HugoRCD.png',
    },
  },
  {
    label: 'Sandro Circi',
    suffix: 'sandros94',
    to: 'https://github.com/sandros94',
    target: '_blank',
    avatar: {
      src: 'https://github.com/sandros94.png',
    },
  },
  {
    label: 'Daniel Roe',
    suffix: 'danielroe',
    to: 'https://github.com/danielroe',
    target: '_blank',
    avatar: {
      src: 'https://github.com/danielroe.png',
    },
  },
  {
    label: 'Jakub Michálek',
    suffix: 'J-Michalek',
    to: 'https://github.com/J-Michalek',
    target: '_blank',
    avatar: {
      src: 'https://github.com/J-Michalek.png',
    },
  },
  {
    label: 'Eugen Istoc',
    suffix: 'genu',
    to: 'https://github.com/genu',
    target: '_blank',
    avatar: {
      src: 'https://github.com/genu.png',
    },
  },
];
</script>

<template>
  <PDialog v-model:open="open">
    <PButton
      label="Search users..."
      color="neutral"
      variant="subtle"
      icon="i-lucide-search"
    />

    <template #content>
      <PCommandPalette
        close
        :groups="[{ id: 'users', items: users }]"
        @update:open="open = $event"
      />
    </template>
  </PDialog>
</template>
