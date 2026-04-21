<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chat-shimmer';

type ChatShimmer = ComponentConfig<typeof theme, AppConfig, 'chatShimmer'>;

export interface ChatShimmerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any;
  /**
   * The text to display with the shimmer effect.
   */
  text: string;
  /**
   * The duration of the shimmer animation in seconds.
   * @defaultValue 2
   */
  duration?: number;
  /**
   * The spread multiplier for the shimmer highlight. The actual spread is computed as `text.length * spread` in pixels.
   * @defaultValue 2
   */
  spread?: number;
  class?: any;
  pohon?: ChatShimmer['slots'];
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<ChatShimmerProps>(), {
  as: 'span',
  duration: 2,
  spread: 2,
});

const appConfig = useAppConfig() as ChatShimmer['AppConfig'];
const pohonProp = useComponentPohon('chatShimmer', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatShimmer || {}) }));

const spread = computed(() => props.text.length * props.spread);
</script>

<template>
  <Primitive
    :as="as"
    :style="{
      '--spread': `${spread}px`,
      '--duration': `${duration}s`,
    }"
    data-slot="base"
    :class="pohon({ class: [pohonProp?.base, props.class] })"
  >
    {{ text }}
  </Primitive>
</template>
