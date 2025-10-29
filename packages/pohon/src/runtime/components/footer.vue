<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/footer';

type Footer = ComponentConfig<typeof theme, AppConfig, 'footer'>;

export interface PFooterProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'footer'
   */
  as?: any;
  class?: any;
  pohon?: Footer['slots'];
}

export interface PFooterSlots {
  left: (props?: object) => any;
  default: (props?: object) => any;
  right: (props?: object) => any;
  top: (props?: object) => any;
  bottom: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';
import PContainer from './container.vue';

const props = withDefaults(
  defineProps<PFooterProps>(),
  {
    as: 'footer',
  },
);
const slots = defineSlots<PFooterSlots>();

const appConfig = useAppConfig() as Footer['AppConfig'];

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.footer || {}) })(),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="footer-root"
  >
    <div
      v-if="!!slots.top"
      :class="pohon.top({ class: props.pohon?.top })"
      data-pohon="footer-top"
    >
      <slot name="top" />
    </div>

    <PContainer
      :class="pohon.container({ class: props.pohon?.container })"
      data-pohon="footer-container"
    >
      <div
        :class="pohon.right({ class: props.pohon?.right })"
        data-pohon="footer-right"
      >
        <slot name="right" />
      </div>

      <div
        :class="pohon.center({ class: props.pohon?.center })"
        data-pohon="footer-center"
      >
        <slot />
      </div>

      <div
        :class="pohon.left({ class: props.pohon?.left })"
        data-pohon="footer-left"
      >
        <slot name="left" />
      </div>
    </PContainer>

    <div
      v-if="!!slots.bottom"
      :class="pohon.bottom({ class: props.pohon?.bottom })"
      data-pohon="footer-bottom"
    >
      <slot name="bottom" />
    </div>
  </APrimitive>
</template>
