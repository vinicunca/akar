<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PButtonProps, PIconProps, PPageFeatureProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-section';

type PageSection = ComponentConfig<typeof theme, AppConfig, 'pageSection'>;

export interface PPageSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'section'
   */
  as?: any;
  /**
   * The headline displayed above the title.
   */
  headline?: string;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  title?: string;
  description?: string;
  /**
   * Display a list of Button under the description.
   * `{ size: 'lg' }`{lang="ts-type"}
   */
  links?: Array<PButtonProps>;
  /**
   * Display a list of PageFeature under the description.
   */
  features?: Array<PPageFeatureProps>;
  /**
   * The orientation of the section.
   * @defaultValue 'vertical'
   */
  orientation?: PageSection['variants']['orientation'];
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean;
  class?: any;
  pohon?: PageSection['slots'];
}

export interface PageSectionSlots {
  top?: (props?: {}) => Array<VNode>;
  header?: (props?: {}) => Array<VNode>;
  leading?: (props: { pohon: PageSection['pohon'] }) => Array<VNode>;
  headline?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  features?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
  links?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  bottom?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PContainer from './container.vue';
import PIcon from './icon.vue';
import PPageFeature from './page-feature.vue';

const props = withDefaults(defineProps<PPageSectionProps>(), {
  as: 'section',
  orientation: 'vertical',
});
const slots = defineSlots<PageSectionSlots>();

const appConfig = useAppConfig() as PageSection['AppConfig'];
const pohonProp = useComponentPohon('pageSection', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageSection || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features),
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
        v-if="!!slots.header || (icon || !!slots.leading) || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description) || !!slots.body || (features?.length || !!slots.features) || !!slots.footer || (links?.length || !!slots.links)"
        data-slot="wrapper"
        :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      >
        <div
          v-if="!!slots.header || (icon || !!slots.leading) || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description)"
          data-slot="header"
          :class="pohon.header({ class: pohonProp?.header })"
        >
          <slot name="header">
            <div
              v-if="icon || !!slots.leading"
              data-slot="leading"
              :class="pohon.leading({ class: pohonProp?.leading })"
            >
              <slot
                name="leading"
                :pohon="pohon"
              >
                <PIcon
                  v-if="icon"
                  :name="icon"
                  data-slot="leadingIcon"
                  :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
                />
              </slot>
            </div>

            <div
              v-if="headline || !!slots.headline"
              data-slot="headline"
              :class="pohon.headline({ class: pohonProp?.headline, headline: !slots.headline })"
            >
              <slot name="headline">
                {{ headline }}
              </slot>
            </div>

            <h2
              v-if="title || !!slots.title"
              data-slot="title"
              :class="pohon.title({ class: pohonProp?.title })"
            >
              <slot name="title">
                {{ title }}
              </slot>
            </h2>

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
          v-if="!!slots.body || (features?.length || !!slots.features)"
          data-slot="body"
          :class="pohon.body({ class: pohonProp?.body })"
        >
          <slot name="body">
            <ul
              v-if="features?.length || !!slots.features"
              data-slot="features"
              :class="pohon.features({ class: pohonProp?.features })"
            >
              <slot name="features">
                <PPageFeature
                  v-for="(feature, index) in features"
                  :key="index"
                  as="li"
                  v-bind="feature"
                />
              </slot>
            </ul>
          </slot>
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
                  size="lg"
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
