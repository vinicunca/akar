<script lang="ts" setup>
import { PApp } from '#components';
import { useAppConfig } from '#imports';

const appConfig = useAppConfig();
</script>

<template>
  <PApp>
    <div class="font-sans flex-vertical">
      {{ appConfig }}
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </PApp>
</template>
