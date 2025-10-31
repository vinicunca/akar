<script setup lang="ts">
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
</script>

<template>
  <PDrawer v-model:open="open">
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-up"
    />

    <template #content>
      <CorePlaceholder class="m-4 h-48" />
    </template>
  </PDrawer>
</template>
