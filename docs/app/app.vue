<script lang="ts" setup>
import { PApp } from '#components';
import { useAppConfig } from '#imports';

const appConfig = useAppConfig();
</script>

<template>
  <PApp>
    <div class="">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </PApp>
</template>
