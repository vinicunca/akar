<script lang="ts" setup>
import {
  PDashboardGroup,
  PDashboardLayout,
  PDashboardPanel,
  PDashboardSidebar,
} from '#components';
import { ref } from 'vue';
import CoreLogo from '~/domains/core/components/core-logo.vue';
import CoreNavigationMenu from '~/domains/core/components/core-navigation-menu.vue';

const isSidebarOpen = ref(false);
</script>

<template>
  <PDashboardLayout
    :sidebar-width="224"
    :header-height="50"
  >
    <!--  -->
  </PDashboardLayout>
</template>
