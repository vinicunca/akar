<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <PPopover
    v-model:open="open"
    :dismissible="false"
    :pohon="{ content: 'p-4' }"
  >
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
    />

    <template #content>
      <div class="mb-4 flex gap-4 items-center">
        <h2 class="text-highlighted font-semibold">
          Popover non-dismissible
        </h2>

        <PButton
          color="neutral"
          variant="ghost"
          icon="i-lucide:x"
          @click="open = false"
        />
      </div>

      <CorePlaceholder class="size-full min-h-48" />
    </template>
  </PPopover>
</template>
