<script setup lang="ts">
import { CorePlaceholder, PButton, PCollapsible } from '#components';
import { defineShortcuts } from '#imports';
import { ref } from 'vue';

const open = ref(true);

defineShortcuts({
  o: () => {
    open.value = !open.value;
  },
});
</script>

<template>
  <PCollapsible
    v-model:open="open"
    class="p-4 rounded-md bg-background flex flex-col gap-2 w-48"
  >
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide:chevron-down"
      block
    />

    <template #content>
      <CorePlaceholder class="h-48" />
    </template>
  </PCollapsible>
</template>
