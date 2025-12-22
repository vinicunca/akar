<script lang="ts" setup>
import { PButton } from '#components';
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();

isFullscreen.value = !!(
  document.fullscreenElement
  // @ts-expect-error typing does not exists
  || document.webkitFullscreenElement
  // @ts-expect-error typing does not exists
  || document.mozFullScreenElement
  // @ts-expect-error typing does not exists
  || document.msFullscreenElement
);
</script>

<template>
  <PButton
    :icon="isFullscreen ? 'i-lucide:minimize' : 'i-lucide:maximize'"
    @click="toggle"
  />
</template>
