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
  <PTooltip
    v-model:open="open"
    text="Open on GitHub"
  >
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
    />
  </PTooltip>
</template>
