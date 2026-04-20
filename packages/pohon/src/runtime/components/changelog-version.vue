<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/changelog-version'
import type { PBadgeProps, PLinkProps, PUserProps } from '../types'
import type { ImgHTMLAttributes } from '../types/html'
import type { ComponentConfig } from '../types/tv'

type ChangelogVersion = ComponentConfig<typeof theme, AppConfig, 'changelogVersion'>

export interface ChangelogVersionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any
  title?: string
  description?: string
  /** The date of the changelog version. Can be a string or a Date object. */
  date?: string | Date
  /**
   * Display a badge on the changelog version.
   * Can be a string or an object.
   * `{ color: 'neutral', variant: 'solid' }`{lang="ts-type"}
   */
  badge?: string | PBadgeProps
  /** The authors of the changelog version. */
  authors?: PUserProps[]
  /** The image of the changelog version. Can be a string or an object. */
  image?: string | (Partial<ImgHTMLAttributes> & { [key: string]: any })
  /**
   * Display an indicator dot on the left.
   * @defaultValue true
   */
  indicator?: boolean
  to?: PLinkProps['to']
  target?: PLinkProps['target']
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  pohon?: ChangelogVersion['slots']
}

export interface ChangelogVersionSlots {
  header?(props?: {}): VNode[]
  badge?(props: { pohon: ChangelogVersion['pohon'] }): VNode[]
  date?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  image?(props: { pohon: ChangelogVersion['pohon'] }): VNode[]
  body?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
  authors?(props?: {}): VNode[]
  actions?(props?: {}): VNode[]
  indicator?(props: { pohon: ChangelogVersion['pohon'] }): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, useDateFormatter } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { useComponentPohon } from '../composables/use-component-pohon'
import ImageComponent from '#build/pohon-image-component'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import PLink from './link.vue'
import PBadge from './badge.vue'
import PUser from './user.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChangelogVersionProps>(), {
  as: 'article',
  indicator: true
})
const slots = defineSlots<ChangelogVersionSlots>()

const { locale } = useLocale()
const appConfig = useAppConfig() as ChangelogVersion['AppConfig']
const pohonProp = useComponentPohon('changelogVersion', props)
const formatter = useDateFormatter(locale.value.code)

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate()
const [DefineDateTemplate, ReuseDateTemplate] = createReusableTemplate<{ hidden?: boolean }>({
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  }
})

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.changelogVersion || {}) })({
  to: !!props.to || !!props.onClick
}))

const date = computed(() => {
  if (!props.date) {
    return
  }

  try {
    return formatter.custom(new Date(props.date), { dateStyle: 'medium' })
  } catch {
    return props.date
  }
})
const datetime = computed(() => {
  if (!props.date) {
    return
  }

  try {
    return new Date(props.date)?.toISOString()
  } catch {
    return undefined
  }
})
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title())
  return (slotText || props.title || 'Version link').trim()
})
</script>

<template>
  <DefineLinkTemplate>
    <PLink
      v-if="to"
      :aria-label="ariaLabel"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none peer"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </PLink>
  </DefineLinkTemplate>

  <DefineDateTemplate v-slot="{ hidden }">
    <time v-if="date" :datetime="datetime" data-slot="date" :class="ui.date({ class: pohonProp?.date, hidden })">
      <slot name="date">
        {{ date }}
      </slot>
    </time>
  </DefineDateTemplate>

  <Primitive :as="as" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })" @click="onClick">
    <div v-if="!!props.indicator || !!slots.indicator" data-slot="indicator" :class="ui.indicator({ class: pohonProp?.indicator })">
      <slot name="indicator" : pohon="ui">
        <ReuseDateTemplate />

        <div data-slot="dot" :class="ui.dot({ class: pohonProp?.dot })">
          <div data-slot="dotInner" :class="ui.dotInner({ class: pohonProp?.dotInner })" />
        </div>
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: pohonProp?.container })">
      <div v-if="!!slots.header || (date || !!slots.date) || (badge || !!slots.badge) || (title || !!slots.title) || (description || !!slots.description) || (image || !!slots.image)" data-slot="header" :class="ui.header({ class: pohonProp?.header })">
        <slot name="header">
          <div v-if="(date || !!slots.date) || (badge || !!slots.badge)" data-slot="meta" :class="ui.meta({ class: pohonProp?.meta, badge: (!!badge || !!slots.badge) || !props.indicator })">
            <slot name="badge" : pohon="ui">
              <PBadge
                v-if="badge"
                color="neutral"
                variant="solid"
                v-bind="typeof badge === 'string' ? { label: badge } : badge"
                data-slot="badge"
                :class="ui.badge({ class: pohonProp?.badge })"
              />
            </slot>

            <ReuseDateTemplate :hidden="!!props.indicator" />
          </div>

          <h2 v-if="title || !!slots.title" data-slot="title" :class="ui.title({ class: pohonProp?.title })">
            <ReuseLinkTemplate />

            <slot name="title">
              {{ title }}
            </slot>
          </h2>

          <div v-if="description || !!slots.description" data-slot="description" :class="ui.description({ class: pohonProp?.description })">
            <slot name="description">
              {{ description }}
            </slot>
          </div>

          <div v-if="image || !!slots.image" data-slot="imageWrapper" :class="ui.imageWrapper({ class: pohonProp?.imageWrapper })">
            <slot name="image" : pohon="ui">
              <component
                :is="ImageComponent"
                v-if="image"
                v-bind="typeof image === 'string' ? { src: image, alt: title } : { alt: title, ...image }"
                data-slot="image"
                :class="ui.image({ class: pohonProp?.image, to: !!to })"
              />
            </slot>

            <ReuseLinkTemplate />
          </div>
        </slot>
      </div>

      <slot name="body" />

      <div v-if="!!slots.footer || (authors?.length || !!slots.authors) || !!slots.actions" data-slot="footer" :class="ui.footer({ class: pohonProp?.footer, body: !!slots.body })">
        <slot name="footer">
          <div v-if="authors?.length || !!slots.authors" data-slot="authors" :class="ui.authors({ class: pohonProp?.authors })">
            <slot name="authors">
              <PUser
                v-for="(author, index) in authors"
                :key="index"
                v-bind="author"
              />
            </slot>
          </div>

          <slot name="actions" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>
