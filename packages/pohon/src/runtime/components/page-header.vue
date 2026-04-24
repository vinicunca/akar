<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PButtonProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-header';

type PageHeader = ComponentConfig<typeof theme, AppConfig, 'pageHeader'>;

export interface PPageHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  headline?: string;
  title?: string;
  description?: string;
  /**
   * Display a list of Button next to the title.
   * `{ color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  links?: Array<PButtonProps>;
  class?: any;
  pohon?: PageHeader['slots'];
}

export interface PPageHeaderSlots {
  headline?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  links?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PButton from './button.vue';

const props = defineProps<PPageHeaderProps>();
const slots = defineSlots<PPageHeaderSlots>();

const appConfig = useAppConfig() as PageHeader['AppConfig'];
const pohonProp = useComponentPohon('pageHeader', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageHeader || {}) })({
  title: !!props.title || !!slots.title,
}));
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="headline || !!slots.headline"
      data-slot="headline"
      :class="pohon.headline({ class: pohonProp?.headline })"
    >
      <slot name="headline">
        {{ headline }}
      </slot>
    </div>

    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        data-slot="wrapper"
        :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      >
        <h1
          v-if="title || !!slots.title"
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <div
          v-if="links?.length || !!slots.links"
          data-slot="links"
          :class="pohon.links({ class: pohonProp?.links })"
        >
          <slot name="links">
            <PButton
              v-for="(link, index) in links"
              :key="index"
              color="neutral"
              variant="outline"
              v-bind="link"
            />
          </slot>
        </div>
      </div>

      <div
        v-if="description || !!slots.description"
        data-slot="description"
        :class="pohon.description({ class: pohonProp?.description })"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <slot />
    </div>
  </APrimitive>
</template>
