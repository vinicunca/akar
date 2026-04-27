<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PButtonProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-hero';

type PageHero = ComponentConfig<typeof theme, AppConfig, 'pageHero'>;

export interface PPageHeroProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  headline?: string;
  title?: string;
  description?: string;
  /**
   * Display a list of Button under the description.
   * `{ size: 'xl' }`{lang="ts-type"}
   */
  links?: Array<PButtonProps>;
  /**
   * The orientation of the page hero.
   * @defaultValue 'vertical'
   */
  orientation?: PageHero['variants']['orientation'];
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean;
  class?: any;
  pohon?: PageHero['slots'];
}

export interface PPageHeroSlots {
  top?: (props?: {}) => Array<VNode>;
  header?: (props?: {}) => Array<VNode>;
  headline?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
  links?: (props?: {}) => Array<VNode>;
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
import PButton from './Button.vue';
import PContainer from './Container.vue';

const props = withDefaults(defineProps<PPageHeroProps>(), {
  orientation: 'vertical',
});
const slots = defineSlots<PPageHeroSlots>();

const appConfig = useAppConfig() as PageHero['AppConfig'];
const pohonProp = useComponentPohon('pageHero', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageHero || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
}));
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <slot name="top" />

    <PContainer
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        v-if="!!slots.header || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description) || !!slots.body || !!slots.footer || (links?.length || !!slots.links)"
        data-slot="wrapper"
        :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      >
        <div
          v-if="!!slots.header || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description)"
          data-slot="header"
          :class="pohon.header({ class: pohonProp?.header })"
        >
          <slot name="header">
            <div
              v-if="headline || !!slots.headline"
              data-slot="headline"
              :class="pohon.headline({ class: pohonProp?.headline, headline: !slots.headline })"
            >
              <slot name="headline">
                {{ headline }}
              </slot>
            </div>

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
              v-if="description || !!slots.description"
              data-slot="description"
              :class="pohon.description({ class: pohonProp?.description })"
            >
              <slot name="description">
                {{ description }}
              </slot>
            </div>
          </slot>
        </div>

        <div
          v-if="!!slots.body"
          data-slot="body"
          :class="pohon.body({ class: pohonProp?.body })"
        >
          <slot name="body" />
        </div>

        <div
          v-if="!!slots.footer || (links?.length || !!slots.links)"
          data-slot="footer"
          :class="pohon.footer({ class: pohonProp?.footer })"
        >
          <slot name="footer">
            <div
              v-if="links?.length || !!slots.links"
              data-slot="links"
              :class="pohon.links({ class: pohonProp?.links })"
            >
              <slot name="links">
                <PButton
                  v-for="(link, index) in links"
                  :key="index"
                  size="xl"
                  v-bind="link"
                />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div
        v-else-if="orientation === 'horizontal'"
        class="hidden lg:block"
      />
    </PContainer>

    <slot name="bottom" />
  </APrimitive>
</template>
