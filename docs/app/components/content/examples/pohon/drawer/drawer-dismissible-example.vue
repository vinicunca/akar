<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <PDrawer
    v-model:open="open"
    :dismissible="false"
    :handle="false"
    :pohon="{ header: 'flex items-center justify-between' }"
  >
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-up"
    />

    <template #header>
      <h2 class="text-highlighted font-semibold">
        Drawer non-dismissible
      </h2>

      <PButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-x"
        @click="open = false"
      />
    </template>

    <template #body>
      <CorePlaceholder class="h-48" />
    </template>
  </PDrawer>
</template>
