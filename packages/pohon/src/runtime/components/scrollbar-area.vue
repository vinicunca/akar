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
import { reactiveOmit } from '@vueuse/core';
import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaViewport,
  useForwardProps,
} from 'akar';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PScrollbarBar from './scrollbar-bar.vue';

const props = withDefaults(
  defineProps<PScrollbarAreaProps>(),
  {
    onScroll: () => {},
  },
);

const rootProps = useForwardProps(
  reactiveOmit(props, 'class'),
);

const appConfig = useAppConfig() as ScrollbarArea['AppConfig'];
const pohonProp = useComponentPohon('scrollbarArea', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.scrollbarArea || {}),
  })(),
);
</script>

<template>
  <AScrollAreaRoot
    v-bind="rootProps"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="scrollbar-area-root"
  >
    <AScrollAreaViewport
      as-child
      :class="pohon.viewport({ class: pohonProp?.viewport })"
      data-pohon="scrollbar-area-viewport"
      @scroll="onScroll"
    >
      <slot />
    </AScrollAreaViewport>

    <PScrollbarBar />

    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
