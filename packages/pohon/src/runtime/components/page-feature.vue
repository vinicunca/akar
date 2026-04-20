<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-feature'
import type { PIconProps, PLinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageFeature = ComponentConfig<typeof theme, AppConfig, 'pageFeature'>

export interface PageFeatureProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon displayed next to the title when `orientation` is `horizontal` and above the title when `orientation` is `vertical`.
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  title?: string
  description?: string
  /**
   * The orientation of the page feature.
   * @defaultValue 'horizontal'
   */
  orientation?: PageFeature['variants']['orientation']
  to?: PLinkProps['to']
  target?: PLinkProps['target']
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  pohon?: PageFeature['slots']
}

export interface PageFeatureSlots {
  leading?(props: { pohon: PageFeature['pohon'] }): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import PLink from './link.vue'
import PIcon from './icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PageFeatureProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<PageFeatureSlots>()

const appConfig = useAppConfig() as PageFeature['AppConfig']
const pohonProp = useComponentPohon('pageFeature', props)

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageFeature || {}) })({
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
  to: !!props.to || !!props.onClick
}))

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title())
  return (slotText || props.title || 'Feature link').trim()
})
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })" @click="onClick">
    <div v-if="icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: pohonProp?.leading })">
      <slot name="leading" : pohon="ui">
        <PIcon v-if="icon" :name="icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: pohonProp?.leadingIcon })" />
      </slot>
    </div>

    <div data-slot="wrapper" :class="ui.wrapper({ class: pohonProp?.wrapper })">
      <PLink
        v-if="to"
        :aria-label="ariaLabel"
        v-bind="{ to, target, ...$attrs }"
        class="focus:outline-none peer"
        raw
      >
        <span class="absolute inset-0" aria-hidden="true" />
      </PLink>

      <slot>
        <div v-if="title || !!slots.title" data-slot="title" :class="ui.title({ class: pohonProp?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div v-if="description || !!slots.description" data-slot="description" :class="ui.description({ class: pohonProp?.description })">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>
  </Primitive>
</template>
