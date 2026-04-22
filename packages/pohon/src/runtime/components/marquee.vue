<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/marquee';

type Marquee = ComponentConfig<typeof theme, AppConfig, 'marquee'>;

export interface PMarqueeProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * Pause the marquee on hover.
   * @defaultValue false
   */
  pauseOnHover?: boolean;
  /**
   * Reverse the direction of the marquee.
   * @defaultValue false
   */
  reverse?: boolean;
  /**
   * The orientation of the marquee.
   * @defaultValue 'horizontal'
   */
  orientation?: Marquee['variants']['orientation'];
  /**
   * The number of times the marquee should repeat.
   * @defaultValue 4
   */
  repeat?: number;
  /**
   * Display an overlay on the marquee.
   * @defaultValue true
   */
  overlay?: boolean;
  class?: any;
  pohon?: Marquee['slots'];
}

export interface PMarqueeSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PMarqueeProps>(),
  {
    orientation: 'horizontal',
    repeat: 4,
    overlay: true,
  },
);
defineSlots<PMarqueeSlots>();

const appConfig = useAppConfig() as Marquee['AppConfig'];
const pohonProp = useComponentPohon('marquee', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.marquee || {}) })({
  pauseOnHover: props.pauseOnHover,
  orientation: props.orientation,
  reverse: props.reverse,
  overlay: props.overlay,
}));
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-for="i in repeat"
      :key="i"
      data-slot="content"
      :class="pohon.content({ class: [pohonProp?.content] })"
    >
      <slot />
    </div>
  </APrimitive>
</template>
