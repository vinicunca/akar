<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AScrollAreaScrollbarProps } from 'akar';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/scrollbar-bar';

type ScrollbarBar = ComponentConfig<typeof theme, AppConfig, 'scrollbarBar'>;

export interface PScrollbarBarProps extends AScrollAreaScrollbarProps {
  class?: any;
  pohon?: ScrollbarBar['slots'];
}
</script>

<script setup lang="ts">
import { computed, useAppConfig } from '#imports';
import { AScrollAreaScrollbar, AScrollAreaThumb } from 'akar';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PScrollbarBarProps>(),
  {
    orientation: 'vertical',
  },
);

const appConfig = useAppConfig() as ScrollbarBar['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.scrollbarBar || {}),
  })({
    orientation: props.orientation,
  }),
);
</script>

<template>
  <AScrollAreaScrollbar
    v-bind="props"
    :class="pohon.root({ class: [props.class, props.pohon?.root] })"
  >
    <AScrollAreaThumb :class="pohon.thumb({ class: props.pohon?.thumb })" />
  </AScrollAreaScrollbar>
</template>
