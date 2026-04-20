<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-section'
import type { PButtonProps, PIconProps } from '../types'
import type { PageFeatureProps } from './page-feature.vue'
import type { ComponentConfig } from '../types/tv'

type PageSection = ComponentConfig<typeof theme, AppConfig, 'pageSection'>

export interface PageSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'section'
   */
  as?: any
  /**
   * The headline displayed above the title.
   */
  headline?: string
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  title?: string
  description?: string
  /**
   * Display a list of Button under the description.
   * `{ size: 'lg' }`{lang="ts-type"}
   */
  links?: PButtonProps[]
  /**
   * Display a list of PageFeature under the description.
   */
  features?: PageFeatureProps[]
  /**
   * The orientation of the section.
   * @defaultValue 'vertical'
   */
  orientation?: PageSection['variants']['orientation']
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean
  class?: any
  pohon?: PageSection['slots']
}

export interface PageSectionSlots {
  top?(props?: {}): VNode[]
  header?(props?: {}): VNode[]
  leading?(props: { pohon: PageSection['pohon'] }): VNode[]
  headline?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  body?(props?: {}): VNode[]
  features?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
  links?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  bottom?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { tv } from '../utils/tv'
import PPageFeature from './page-feature.vue'
import PContainer from './container.vue'
import PIcon from './icon.vue'
import PButton from './button.vue'

const props = withDefaults(defineProps<PageSectionProps>(), {
  as: 'section',
  orientation: 'vertical'
})
const slots = defineSlots<PageSectionSlots>()

const appConfig = useAppConfig() as PageSection['AppConfig']
const pohonProp = useComponentPohon('pageSection', props)

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageSection || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features)
}))
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <slot name="top" />

    <PContainer data-slot="container" :class="ui.container({ class: pohonProp?.container })">
      <div v-if="!!slots.header || (icon || !!slots.leading) || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description) || !!slots.body || (features?.length || !!slots.features) || !!slots.footer || (links?.length || !!slots.links)" data-slot="wrapper" :class="ui.wrapper({ class: pohonProp?.wrapper })">
        <div v-if="!!slots.header || (icon || !!slots.leading) || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description)" data-slot="header" :class="ui.header({ class: pohonProp?.header })">
          <slot name="header">
            <div v-if="icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: pohonProp?.leading })">
              <slot name="leading" : pohon="ui">
                <PIcon v-if="icon" :name="icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: pohonProp?.leadingIcon })" />
              </slot>
            </div>

            <div v-if="headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: pohonProp?.headline, headline: !slots.headline })">
              <slot name="headline">
                {{ headline }}
              </slot>
            </div>

            <h2 v-if="title || !!slots.title" data-slot="title" :class="ui.title({ class: pohonProp?.title })">
              <slot name="title">
                {{ title }}
              </slot>
            </h2>

            <div v-if="description || !!slots.description" data-slot="description" :class="ui.description({ class: pohonProp?.description })">
              <slot name="description">
                {{ description }}
              </slot>
            </div>
          </slot>
        </div>

        <div v-if="!!slots.body || (features?.length || !!slots.features)" data-slot="body" :class="ui.body({ class: pohonProp?.body })">
          <slot name="body">
            <ul v-if="features?.length || !!slots.features" data-slot="features" :class="ui.features({ class: pohonProp?.features })">
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

        <div v-if="!!slots.footer || (links?.length || !!slots.links)" data-slot="footer" :class="ui.footer({ class: pohonProp?.footer })">
          <slot name="footer">
            <div v-if="links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: pohonProp?.links })">
              <slot name="links">
                <PButton v-for="(link, index) in links" :key="index" size="lg" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="orientation === 'horizontal'" class="hidden lg:block" />
    </PContainer>

    <slot name="bottom" />
  </Primitive>
</template>
