<script setup lang="ts">
import type { PNavigationMenuItem } from 'pohon-ui';

defineProps<{
  mode: 'drawer' | 'slideover' | 'dialog';
}>();

const items: Array<PNavigationMenuItem> = [{
  label: 'Home',
  icon: 'i-lucide:house',
  active: true,
}, {
  label: 'Inbox',
  icon: 'i-lucide:inbox',
}, {
  label: 'Contacts',
  icon: 'i-lucide:users',
}];
</script>

<template>
  <PDashboardGroup>
    <PDashboardSidebar :mode="mode">
      <template #header="{ collapsed }">
        <BaseLogo
          v-if="!collapsed"
          class="h-5 w-auto"
        />
        <PIcon
          v-else
          name="i-simple-icons:nuxtdotjs"
          class="text-primary mx-auto size-5"
        />
      </template>

      <PNavigationMenu
        :items="items"
        orientation="vertical"
      />
    </PDashboardSidebar>

    <PDashboardPanel>
      <template #header>
        <PDashboardNavbar title="Dashboard" />
      </template>
    </PDashboardPanel>
  </PDashboardGroup>
</template>
