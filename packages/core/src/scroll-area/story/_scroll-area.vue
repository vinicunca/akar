<script setup lang="ts">
import type { AScrollAreaRootProps } from '../scroll-area-root.vue';
import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaScrollbar,
  AScrollAreaThumb,
  AScrollAreaViewport,
} from '..';
import ScrollAreaCopy from './_scroll-area-copy.vue';

const props = defineProps<AScrollAreaRootProps>();
</script>

<template>
  <AScrollAreaRoot
    style="width: 200px; height: 200px; overflow: hidden;"
    v-bind="props"
  >
    <AScrollAreaViewport style="width: 100%; height: 100%;">
      <ScrollAreaCopy style="width: 50px;" />
      <ScrollAreaCopy style="width: 50px;" />
    </AScrollAreaViewport>
    <AScrollAreaScrollbar
      orientation="vertical"
    >
      <AScrollAreaThumb />
    </AScrollAreaScrollbar>

    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
