<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AScrollAreaRootProps } from 'akar';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/scrollbar-area';

type ScrollbarArea = ComponentConfig<typeof theme, AppConfig, 'scrollbarArea'>;

export interface PScrollbarAreaProps extends AScrollAreaRootProps {
  onScroll?: (event: Event) => void;
  viewportProps?: { onScroll: (event: Event) => void };
  class?: any;
  pohon?: ScrollbarArea['slots'];
}
</script>

<script setup lang="ts">
import { computed, useAppConfig } from '#imports';
import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaViewport,
} from 'akar';
import { uv } from '../utils/uv';

import PScrollbarBar from './scrollbar-bar.vue';

const props = withDefaults(
  defineProps<PScrollbarAreaProps>(),
  {
    onScroll: () => {},
  },
);

const appConfig = useAppConfig() as ScrollbarArea['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.scrollbarArea || {}),
  })(),
);
</script>

<template>
  <AScrollAreaRoot
    v-bind="props"
    :class="pohon.root({ class: [props.class, props.pohon?.root] })"
  >
    <AScrollAreaViewport
      as-child
      :class="pohon.viewport({ class: props.pohon?.viewport })"
      @scroll="onScroll"
    >
      <slot />
    </AScrollAreaViewport>

    <PScrollbarBar />

    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
