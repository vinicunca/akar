<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-header'
import type { PButtonProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageHeader = ComponentConfig<typeof theme, AppConfig, 'pageHeader'>

export interface PageHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  headline?: string
  title?: string
  description?: string
  /**
   * Display a list of Button next to the title.
   * `{ color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  links?: PButtonProps[]
  class?: any
  pohon?: PageHeader['slots']
}

export interface PageHeaderSlots {
  headline?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  links?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { tv } from '../utils/tv'
import PButton from './button.vue'

const props = defineProps<PageHeaderProps>()
const slots = defineSlots<PageHeaderSlots>()

const appConfig = useAppConfig() as PageHeader['AppConfig']
const pohonProp = useComponentPohon('pageHeader', props)

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageHeader || {}) })({
  title: !!props.title || !!slots.title
}))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <div v-if="headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: pohonProp?.headline })">
      <slot name="headline">
        {{ headline }}
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: pohonProp?.container })">
      <div data-slot="wrapper" :class="ui.wrapper({ class: pohonProp?.wrapper })">
        <h1 v-if="title || !!slots.title" data-slot="title" :class="ui.title({ class: pohonProp?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <div v-if="links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: pohonProp?.links })">
          <slot name="links">
            <PButton v-for="(link, index) in links" :key="index" color="neutral" variant="outline" v-bind="link" />
          </slot>
        </div>
      </div>

      <div v-if="description || !!slots.description" data-slot="description" :class="ui.description({ class: pohonProp?.description })">
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <slot />
    </div>
  </Primitive>
</template>
