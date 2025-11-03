<script setup lang="ts">
import { defineShortcuts } from '#imports';
import { ref } from 'vue';

const open = ref(false);

defineShortcuts({
  o: () => {
    open.value = !open.value;
  },
});
</script>

<template>
  <PPopover v-model:open="open">
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
    />

    <template #content>
      <CorePlaceholder class="m-4 inline-flex size-48" />
    </template>
  </PPopover>
</template>
