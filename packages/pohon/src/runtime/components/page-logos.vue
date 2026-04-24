<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PMarqueeProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-logos';

type PageLogos = ComponentConfig<typeof theme, AppConfig, 'pageLogos'>;

type PageLogosItem = {
  src: string;
  alt: string;
} | string;

export interface PageLogosProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  title?: string;
  items?: Array<PageLogosItem>;
  marquee?: boolean | PMarqueeProps;
  class?: any;
  pohon?: PageLogos['slots'];
}

export interface PageLogosSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { isObjectType } from '@vinicunca/perkakas';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';
import PMarquee from './marquee.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PageLogosProps>(), {
  marquee: false,
});

const slots = defineSlots<PageLogosSlots>();

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();

const appConfig = useAppConfig() as PageLogos['AppConfig'];
const pohonProp = useComponentPohon('pageLogos', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageLogos || {}) })());
</script>

<template>
  <DefineCreateItemTemplate>
    <slot v-if="!!slots.default" />
    <template v-else-if="items?.length">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <PAvatar
          v-if="isObjectType(item)"
          :src="item.src"
          :alt="item.alt"
          data-slot="logo"
          :class="pohon.logo({ class: pohonProp?.logo })"
        />
        <PIcon
          v-else
          :name="item"
          data-slot="logo"
          :class="pohon.logo({ class: pohonProp?.logo })"
        />
      </template>
    </template>
  </DefineCreateItemTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <h2
      v-if="title"
      data-slot="title"
      :class="pohon.title({ class: pohonProp?.title })"
    >
      {{ title }}
    </h2>

    <PMarquee
      v-if="marquee"
      v-bind="isObjectType(marquee) ? marquee : {}"
      data-slot="logos"
      :class="pohon.logos({ class: pohonProp?.logos, marquee: true })"
    >
      <ReuseCreateItemTemplate :items="items" />
    </PMarquee>
    <div
      v-else
      data-slot="logos"
      :class="pohon.logos({ class: pohonProp?.logos })"
    >
      <ReuseCreateItemTemplate :items="items" />
    </div>
  </APrimitive>
</template>
