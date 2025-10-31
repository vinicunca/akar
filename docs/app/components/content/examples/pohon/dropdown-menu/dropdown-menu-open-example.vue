<script setup lang="ts">
import type { PDropdownMenuItem } from 'pohon-ui';
import { defineShortcuts } from '#imports';
import { ref } from 'vue';

const open = ref(false);

defineShortcuts({
  config: {
    o: () => {
      open.value = !open.value;
    },
  },
});

const items: Array<PDropdownMenuItem> = [
  {
    label: 'Profile',
    icon: 'i-lucide-user',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog',
  },
];
</script>

<template>
  <PDropdownMenu
    v-model:open="open"
    :items="items"
    :pohon="{ content: 'w-48' }"
  >
    <PButton
      label="Open"
      color="neutral"
      variant="outline"
      icon="i-lucide-menu"
    />
  </PDropdownMenu>
</template>
