<script setup lang="ts">
import type { PPContextMenuItem } from 'pohon-ui';
import { ref } from 'vue';

const loading = ref(true);

const items = [
  {
    label: 'Refresh the Page',
    slot: 'refresh' as const,
  },
  {
    label: 'Clear Cookies and Refresh',
  },
  {
    label: 'Clear Cache and Refresh',
  },
] satisfies Array<PPContextMenuItem>;
</script>

<template>
  <PContextMenu
    :items="items"
    :pohon="{ content: 'w-48' }"
  >
    <div class="border-border-accented text-sm border rounded-md border-dashed flex w-72 aspect-video items-center justify-center">
      Right click here
    </div>

    <template #refresh-label>
      {{ loading ? 'Refreshing...' : 'Refresh the Page' }}
    </template>

    <template #refresh-trailing>
      <PIcon
        v-if="loading"
        name="i-lucide:loader-circle"
        class="text-primary shrink-0 size-5 animate-spin"
      />
    </template>
  </PContextMenu>
</template>
