<script setup lang="ts">
import { useAppConfig } from '#app';

const appConfig = useAppConfig();
</script>

<template>
  <PApp
    :toaster="appConfig.toaster"
    :tooltip="{
      delayDuration: 300,
    }"
  >
    <NuxtLoadingIndicator
      color="var(--akar-primary)"
      :height="2"
    />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </PApp>
</template>
