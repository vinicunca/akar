<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/footer-columns'
import type { IconProps, LinkProps } from '../types'
import type { ComponentConfig } from '../types/uv'

type FooterColumns = ComponentConfig<typeof theme, AppConfig, 'footerColumns'>

export interface FooterColumnLink extends Omit<LinkProps, 'custom'> {
  label: string
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name']
  class?: any
  pohon?: Pick<FooterColumns['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>
}

export interface FooterColumn<T extends FooterColumnLink = FooterColumnLink> {
  label: string
  children?: T[]
}

export interface FooterColumnsProps<T extends FooterColumnLink = FooterColumnLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  class?: any
  columns?: FooterColumn<T>[]
  pohon?: FooterColumns['slots']
}

type SlotProps<T> = (props: { link: T, active: boolean }) => any

export interface FooterColumnsSlots<T extends FooterColumnLink = FooterColumnLink> {
  'left'(props?: object): any
  'default'(props?: object): any
  'right'(props?: object): any
  'column-label'?: (props: { column: FooterColumn<T> }) => any
  'link': SlotProps<T>
  'link-leading': SlotProps<T>
  'link-label': SlotProps<T>
  'link-trailing': SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends FooterColumnLink">
import { computed } from 'vue'
import { APrimitive } from 'akar'
import { useAppConfig } from '#imports'
import { pickLinkProps } from '../utils/link'
import { uv } from '../utils/uv'
import PLink from './link.vue'
import PLinkBase from './link-base.vue'
import PIcon from './icon.vue'

const props = withDefaults(defineProps<FooterColumnsProps<T>>(), {
  as: 'nav'
})
const slots = defineSlots<FooterColumnsSlots<T>>()

const appConfig = useAppConfig() as FooterColumns['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.footerColumns || {}) })())
</script>

<template>
  <APrimitive :as="as" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <div v-if="!!slots.left" :class="pohon.left({ class: props.pohon?.left })">
      <slot name="left" />
    </div>

    <div v-if="!!slots.default || columns?.length" :class="pohon.center({ class: props.pohon?.center })">
      <slot>
        <div v-for="(column, index) in columns" :key="index">
          <h3 :class="pohon.label({ class: props.pohon?.label })">
            <slot name="column-label" :column="column">
              {{ column.label }}
            </slot>
          </h3>

          <ul :class="pohon.list({ class: props.pohon?.list })">
            <li v-for="(link, linkIndex) in column.children" :key="linkIndex" :class="pohon.item({ class: [props.pohon?.item, link.ui?.item] })">
              <PLink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
                <PLinkBase v-bind="slotProps" :class="pohon.link({ class: [props.pohon?.link, link.ui?.link, link.class], active })">
                  <slot name="link" :link="(link as T)" :active="active">
                    <slot name="link-leading" :link="(link as T)" :active="active">
                      <PIcon v-if="link.icon" :name="link.icon" :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
                    </slot>

                    <span v-if="link.label || !!slots['link-label']" :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, link.ui?.linkLabel], active })">
                      <slot name="link-label" :link="(link as T)" :active="active">
                        {{ (link as T).label }}
                      </slot>

                      <PIcon v-if="link.target === '_blank'" :name="appConfig.pohon.icons.external" :class="pohon.linkLabelExternalIcon({ class: [props.pohon?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })" />
                    </span>

                    <slot name="link-trailing" :link="(link as T)" :active="active" />
                  </slot>
                </PLinkBase>
              </PLink>
            </li>
          </ul>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.right" :class="pohon.right({ class: props.pohon?.right })">
      <slot name="right" />
    </div>
  </APrimitive>
</template>
