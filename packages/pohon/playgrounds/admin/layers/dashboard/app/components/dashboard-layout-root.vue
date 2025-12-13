<script lang="ts" setup>
import {
  DashboardLayoutContent,
  PDashboardLayout,
} from '#components';
import CoreLogo from '~/domains/core/components/core-logo.vue';
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
      <!-- <LayoutMenu /> -->
    </template>

    <template #content>
      <DashboardLayoutContent />
    </template>
  </PDashboardLayout>
</template>
