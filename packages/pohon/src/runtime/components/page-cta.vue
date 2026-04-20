<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-cta'
import type { PButtonProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageCTA = ComponentConfig<typeof theme, AppConfig, 'pageCTA'>

export interface PageCTAProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  title?: string
  description?: string
  /**
   * The orientation of the page cta.
   * @defaultValue 'vertical'
   */
  orientation?: PageCTA['variants']['orientation']
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean
  /**
   * @defaultValue 'outline'
   */
  variant?: PageCTA['variants']['variant']
  /**
   * Display a list of Button under the description.
   * `{ size: 'lg' }`{lang="ts-type"}
   */
  links?: PButtonProps[]
  pohon?: PageCTA['slots']
}

export interface PageCTASlots {
  top?(props?: {}): VNode[]
  header?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  body?(props?: {}): VNode[]
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
import PButton from './button.vue'
import PContainer from './container.vue'

const props = withDefaults(defineProps<PageCTAProps>(), {
  orientation: 'vertical',
  reverse: false
})
const slots = defineSlots<PageCTASlots>()

const appConfig = useAppConfig() as PageCTA['AppConfig']
const pohonProp = useComponentPohon('pageCTA', props)

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageCTA || {}) })({
  variant: props.variant,
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title
}))
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <slot name="top" />

    <PContainer data-slot="container" :class="ui.container({ class: pohonProp?.container })">
      <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || !!slots.body || !!slots.footer || (links?.length || !!slots.links)" data-slot="wrapper" :class="ui.wrapper({ class: pohonProp?.wrapper })">
        <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)" data-slot="header" :class="ui.header({ class: pohonProp?.header })">
          <slot name="header">
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

        <div v-if="!!slots.body" data-slot="body" :class="ui.body({ class: pohonProp?.body })">
          <slot name="body" />
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
