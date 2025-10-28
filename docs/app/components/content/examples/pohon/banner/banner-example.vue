<script setup lang="ts">
import type { PBannerProps } from 'pohon-ui';
import { onBeforeMount } from 'vue';

const { id = 'example' } = defineProps<{
  id?: string;
  title?: string;
  color?: PBannerProps['color'];
  closeIcon?: string;
}>();

function onClose() {
  localStorage.removeItem(`banner-${id}`);

  setTimeout(() => {
    document.querySelector('html')?.classList.remove('hide-banner');
  }, 1000);
}

onBeforeMount(() => {
  localStorage.removeItem(`banner-${id}`);
});
</script>

<template>
  <PBanner
    :id="id"
    :title="title || 'This is a closable banner'"
    :color="color"
    :close-icon="closeIcon"
    close
    @close="onClose"
  />
</template>
