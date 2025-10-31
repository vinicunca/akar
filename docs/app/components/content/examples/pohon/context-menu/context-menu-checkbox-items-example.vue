<script setup lang="ts">
import type { PContextMenuItem } from 'pohon-ui';
import { computed, ref } from 'vue';

const showSidebar = ref(true);
const showToolbar = ref(false);

const items = computed<Array<PContextMenuItem>>(() => [{
  label: 'View',
  type: 'label' as const,
}, {
  type: 'separator' as const,
}, {
  label: 'Show Sidebar',
  type: 'checkbox' as const,
  checked: showSidebar.value,
  onUpdateChecked(checked: boolean) {
    showSidebar.value = checked;
  },
  onSelect(e: Event) {
    e.preventDefault();
  },
}, {
  label: 'Show Toolbar',
  type: 'checkbox' as const,
  checked: showToolbar.value,
  onUpdateChecked(checked: boolean) {
    showToolbar.value = checked;
  },
}, {
  label: 'Collapse Pinned Tabs',
  type: 'checkbox' as const,
  disabled: true,
}]);
</script>

<template>
  <PContextMenu
    :items="items"
    :pohon="{ content: 'w-48' }"
  >
    <div class="border-accented text-sm border rounded-md border-dashed flex w-72 aspect-video items-center justify-center">
      Right click here
    </div>
  </PContextMenu>
</template>
