<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui';
import { defineShortcuts } from '#imports';
import { ref } from 'vue';

const items: Array<PNavigationMenuItem> = [{
  label: 'Home',
  icon: 'i-lucide-house',
  active: true,
}, {
  label: 'Inbox',
  icon: 'i-lucide-inbox',
}, {
  label: 'Contacts',
  icon: 'i-lucide-users',
}];

const open = ref(true);

defineShortcuts({
  config: {
    o: () => {
      open.value = !open.value;
    },
  },
});
</script>

<template>
  <PDashboardSidebar v-model:open="open">
    <template #header="{ collapsed }">
      <Logo
        v-if="!collapsed"
        class="h-5 w-auto"
      />
      <PIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="text-primary mx-auto size-5"
      />
    </template>

    <PNavigationMenu
      :items="items"
      orientation="vertical"
    />
  </PDashboardSidebar>
</template>
