<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
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
  left?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  right?: (props?: {}) => Array<VNode>;
  top?: (props?: {}) => Array<VNode>;
  bottom?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PContainer from './Container.vue';

const props = withDefaults(
  defineProps<PFooterProps>(),
  {
    as: 'footer',
  },
);
const slots = defineSlots<PFooterSlots>();

const appConfig = useAppConfig() as Footer['AppConfig'];
const pohonProp = useComponentPohon('footer', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.footer || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!slots.top"
      data-slot="top"
      :class="pohon.top({ class: pohonProp?.top })"
    >
      <slot name="top" />
    </div>

    <PContainer
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        data-slot="right"
        :class="pohon.right({ class: pohonProp?.right })"
      >
        <slot name="right" />
      </div>

      <div
        data-slot="center"
        :class="pohon.center({ class: pohonProp?.center })"
      >
        <slot />
      </div>

      <div
        data-slot="left"
        :class="pohon.left({ class: pohonProp?.left })"
      >
        <slot name="left" />
      </div>
    </PContainer>

    <div
      v-if="!!slots.bottom"
      data-slot="bottom"
      :class="pohon.bottom({ class: pohonProp?.bottom })"
    >
      <slot name="bottom" />
    </div>
  </APrimitive>
</template>
