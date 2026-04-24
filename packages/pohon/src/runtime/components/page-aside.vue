<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-aside';

type PageAside = ComponentConfig<typeof theme, AppConfig, 'pageAside'>;

export interface PPageAsideProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'aside'
   */
  as?: any;
  class?: any;
  pohon?: PageAside['slots'];
}

export interface PPageAsideSlots {
  top?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  bottom?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = withDefaults(defineProps<PPageAsideProps>(), {
  as: 'aside',
});
const slots = defineSlots<PPageAsideSlots>();

const appConfig = useAppConfig() as PageAside['AppConfig'];
const pohonProp = useComponentPohon('pageAside', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageAside || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        v-if="!!slots.top"
        data-slot="top"
        :class="pohon.top({ class: pohonProp?.top })"
      >
        <div
          data-slot="topHeader"
          :class="pohon.topHeader({ class: pohonProp?.topHeader })"
        />
        <div
          data-slot="topBody"
          :class="pohon.topBody({ class: pohonProp?.topBody })"
        >
          <slot name="top" />
        </div>
        <div
          data-slot="topFooter"
          :class="pohon.topFooter({ class: pohonProp?.topFooter })"
        />
      </div>

      <slot />

      <slot name="bottom" />
    </div>
  </APrimitive>
</template>
