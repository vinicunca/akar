<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-logos'
import type { MarqueeProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageLogos = ComponentConfig<typeof theme, AppConfig, 'pageLogos'>

type PageLogosItem = {
  src: string
  alt: string
} | string

export interface PageLogosProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  title?: string
  items?: PageLogosItem[]
  marquee?: boolean | MarqueeProps
  class?: any
  pohon?: PageLogos['slots']
}

export interface PageLogosSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { tv } from '../utils/tv'
import PMarquee from './marquee.vue'
import PAvatar from './avatar.vue'
import PIcon from './icon.vue'

defineOptions({ inheritAttrs: false })

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate()

const props = withDefaults(defineProps<PageLogosProps>(), {
  marquee: false
})
const slots = defineSlots<PageLogosSlots>()

const appConfig = useAppConfig() as PageLogos['AppConfig']
const pohonProp = useComponentPohon('pageLogos', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageLogos || {}) })())
</script>

<template>
  <DefineCreateItemTemplate>
    <slot v-if="!!slots.default" />
    <template v-else-if="items?.length">
      <template v-for="(item, index) in items" :key="index">
        <PAvatar
          v-if="typeof item === 'object'"
          :src="item.src"
          :alt="item.alt"
          data-slot="logo"
          :class="ui.logo({ class: pohonProp?.logo })"
        />
        <PIcon
          v-else
          :name="item"
          data-slot="logo"
          :class="ui.logo({ class: pohonProp?.logo })"
        />
      </template>
    </template>
  </DefineCreateItemTemplate>

  <Primitive :as="as" v-bind="$attrs" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <h2 v-if="title" data-slot="title" :class="ui.title({ class: pohonProp?.title })">
      {{ title }}
    </h2>

    <PMarquee
      v-if="marquee"
      v-bind="typeof marquee === 'object' ? marquee : {}"
      data-slot="logos"
      :class="ui.logos({ class: pohonProp?.logos, marquee: true })"
    >
      <ReuseCreateItemTemplate :items="items" />
    </PMarquee>
    <div v-else data-slot="logos" :class="ui.logos({ class: pohonProp?.logos })">
      <ReuseCreateItemTemplate :items="items" />
    </div>
  </Primitive>
</template>
