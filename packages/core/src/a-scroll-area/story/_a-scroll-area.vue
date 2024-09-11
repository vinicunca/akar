<script lang="ts" setup>
import type { AScrollAreaRootProps } from '../a-scroll-area-root.vue';

import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaScrollbar,
  AScrollAreaThumb,
  AScrollAreaViewport,
} from '..';
import AScrollAreaCopy from './_a-scroll-area-copy.vue';

const props = defineProps<AScrollAreaRootProps>();
</script>

<template>
  <AScrollAreaRoot
    style="width: 200px; height: 200px; overflow: hidden;"
    v-bind="props"
  >
    <AScrollAreaViewport style="width: 100%; height: 100%;">
      <AScrollAreaCopy style="width: 50px;" />
      <AScrollAreaCopy style="width: 50px;" />
    </AScrollAreaViewport>

    <AScrollAreaScrollbar
      orientation="vertical"
    >
      <AScrollAreaThumb />
    </AScrollAreaScrollbar>

    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
