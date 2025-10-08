<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/marquee';

type Marquee = ComponentConfig<typeof theme, AppConfig, 'marquee'>;

export interface PMarqueeProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  pauseOnHover?: boolean;
  reverse?: boolean;
  orientation?: Marquee['variants']['orientation'];
  repeat?: number;
  overlay?: boolean;
  class?: any;
  pohon?: Marquee['slots'];
}

export interface PMarqueeSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
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

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.marquee || {}) })({
    pauseOnHover: props.pauseOnHover,
    orientation: props.orientation,
    reverse: props.reverse,
    overlay: props.overlay,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div
      v-for="i in repeat"
      :key="i"
      :class="pohon.content({ class: [props.pohon?.content] })"
    >
      <slot />
    </div>
  </APrimitive>
</template>

<style>
@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  to {
    transform: translate3d(calc(-100% - var(--gap)), 0, 0);
    will-change: transform;
  }
}

@keyframes marquee-rtl {
  from {
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  to {
    transform: translate3d(calc(100% + var(--gap)), 0, 0);
    will-change: transform;
  }
}

@keyframes marquee-vertical {
  from {
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  to {
    transform: translate3d(0, calc(-100% - var(--gap)), 0);
    will-change: transform;
  }
}

@keyframes marquee-vertical-rtl {
  from {
    transform: translate3d(0, calc(-100% - var(--gap)), 0);
    will-change: transform;
  }
  to {
    transform: translate3d(0, calc(-100% * var(--gap)), 0);
    will-change: transform;
  }
}
</style>
