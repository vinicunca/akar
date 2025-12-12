<script lang="ts" setup>
import {
  PDashboardGroup,
  PDashboardLayout,
  PDashboardPanel,
  PDashboardSidebar,
} from '#components';
import { ref } from 'vue';
import AdminLayoutContent from '~/domains/admin/components/admin-layout-content.vue';
import CoreLogo from '~/domains/core/components/core-logo.vue';
// import CoreNavigationMenu from '~/domains/core/components/core-navigation-menu.vue';

const isSidebarOpen = ref(false);
</script>

<template>
  <PDashboardLayout
    :sidebar-width="224"
    :header-height="50"
  >
    <template #logo>
      <CoreLogo />
    </template>

    <template #menu>
      <LayoutMenu />
    </template>

    <template #content>
      <AdminLayoutContent />
    </template>
  </PDashboardLayout>
</template>
