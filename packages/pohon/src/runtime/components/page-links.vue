<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/page-links'
import type { PIconProps, PLinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageLinks = ComponentConfig<typeof theme, AppConfig, 'pageLinks'>

export interface PageLink extends Omit<PLinkProps, 'custom'> {
  label: string
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  class?: any
  pohon?: Pick<PageLinks['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>
}

export interface PageLinksProps<T extends PageLink = PageLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any
  title?: string
  links?: T[]
  class?: any
  pohon?: PageLinks['slots']
}

type SlotProps<T> = (props: { link: T, active: boolean, pohon: PageLinks['pohon'] }) => VNode[]

export interface PageLinksSlots<T extends PageLink = PageLink> {
  'title'?(props?: {}): VNode[]
  'link'?: SlotProps<T>
  'link-leading'?: SlotProps<T>
  'link-label'?(props: { link: T, active: boolean }): VNode[]
  'link-trailing'?(props: { link: T, active: boolean }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends PageLink">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { pickPLinkProps } from '../utils/link'
import { tv } from '../utils/tv'
import PLink from './link.vue'
import PLinkBase from './link-base.vue'
import PIcon from './icon.vue'

const props = withDefaults(defineProps<PageLinksProps<T>>(), {
  as: 'nav'
})
const slots = defineSlots<PageLinksSlots<T>>()

const appConfig = useAppConfig() as PageLinks['AppConfig']
const pohonProp = useComponentPohon('pageLinks', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.pageLinks || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })">
    <p v-if="title || !!slots.title" data-slot="title" :class="ui.title({ class: pohonProp?.title })">
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <ul data-slot="list" :class="ui.list({ class: pohonProp?.list })">
      <li v-for="(link, index) in links" :key="index" data-slot="item" :class="ui.item({ class: [pohonProp?.item, link.ui?.item] })">
        <PLink v-slot="{ active, ...slotProps }" v-bind="pickPLinkProps(link)" custom>
          <PLinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [pohonProp?.link, link.ui?.link, link.class], active })">
            <slot name="link" :link="link" :active="active" : pohon="ui">
              <slot name="link-leading" :link="link" :active="active" : pohon="ui">
                <PIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
              </slot>

              <span v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="ui.linkLabel({ class: [pohonProp?.linkLabel, link.ui?.linkLabel], active })">
                <slot name="link-label" :link="link" :active="active">
                  {{ link.label }}
                </slot>

                <PIcon v-if="link.target === '_blank'" :name="appConfig.pohon.icons.external" data-slot="linkLabelExternalIcon" :class="ui.linkLabelExternalIcon({ class: [pohonProp?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })" />
              </span>

              <slot name="link-trailing" :link="link" :active="active" />
            </slot>
          </PLinkBase>
        </PLink>
      </li>
    </ul>
  </Primitive>
</template>
