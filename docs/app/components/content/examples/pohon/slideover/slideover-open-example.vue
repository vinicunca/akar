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
  <PSlideover v-model:open="open">
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
    />

    <template #content>
      <CorePlaceholder class="m-4 h-full" />
    </template>
  </PSlideover>
</template>
