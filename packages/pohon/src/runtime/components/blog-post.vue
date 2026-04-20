<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/blog-post'
import type { PBadgeProps, PLinkProps, PUserProps } from '../types'
import type { ImgHTMLAttributes } from '../types/html'
import type { ComponentConfig } from '../types/tv'

type BlogPost = ComponentConfig<typeof theme, AppConfig, 'blogPost'>

export interface BlogPostProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any
  title?: string
  description?: string
  /** The date of the blog post. Can be a string or a Date object. */
  date?: string | Date
  /**
   * Display a badge on the blog post.
   * Can be a string or an object.
   * `{ color: 'neutral', variant: 'subtle' }`{lang="ts-type"}
   */
  badge?: string | PBadgeProps
  /** The authors of the blog post. */
  authors?: PUserProps[]
  /** The image of the blog post. Can be a string or an object. */
  image?: string | (Partial<ImgHTMLAttributes> & { [key: string]: any })
  /**
   * The orientation of the blog post.
   * @defaultValue 'vertical'
   */
  orientation?: BlogPost['variants']['orientation']
  /**
   * @defaultValue 'outline'
   */
  variant?: BlogPost['variants']['variant']
  to?: PLinkProps['to']
  target?: PLinkProps['target']
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  pohon?: BlogPost['slots']
}

export interface BlogPostSlots {
  date?(props?: {}): VNode[]
  badge?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  authors?(props: { pohon: BlogPost['pohon'] }): VNode[]
  header?(props: { pohon: BlogPost['pohon'] }): VNode[]
  body?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, useDateFormatter } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { useComponentPohon } from '../composables/use-component-pohon'
import ImageComponent from '#build/pohon-image-component'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import PLink from './link.vue'
import PBadge from './badge.vue'
import PAvatar from './avatar.vue'
import PAvatarGroup from './avatar-group.vue'
import PUser from './user.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BlogPostProps>(), {
  as: 'article',
  orientation: 'vertical'
})
const slots = defineSlots<BlogPostSlots>()

const { locale } = useLocale()
const appConfig = useAppConfig() as BlogPost['AppConfig']
const pohonProp = useComponentPohon('blogPost', props)
const formatter = useDateFormatter(locale.value.code)

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.blogPost || {}) })({
  orientation: props.orientation,
  variant: props.variant,
  image: !!props.image,
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
  return (slotText || props.title || 'Post link').trim()
})
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="ui.root({ class: [pohonProp?.root, props.class] })" @click="onClick">
    <div v-if="image || !!slots.header" data-slot="header" :class="ui.header({ class: pohonProp?.header })">
      <slot name="header" : pohon="ui">
        <component
          :is="ImageComponent"
          v-bind="typeof image === 'string' ? { src: image, alt: title } : { alt: title, ...image }"
          data-slot="image"
          :class="ui.image({ class: pohonProp?.image, to: !!to })"
        />
      </slot>
    </div>

    <div data-slot="body" :class="ui.body({ class: pohonProp?.body })">
      <PLink
        v-if="to"
        :aria-label="ariaLabel"
        v-bind="{ to, target, ...$attrs }"
        class="focus:outline-none peer"
        raw
      >
        <span class="absolute inset-0" aria-hidden="true" />
      </PLink>

      <slot name="body">
        <div v-if="(date || !!slots.date) || (badge || !!slots.badge)" data-slot="meta" :class="ui.meta({ class: pohonProp?.meta })">
          <slot name="badge">
            <PBadge
              v-if="badge"
              color="neutral"
              variant="subtle"
              v-bind="typeof badge === 'string' ? { label: badge } : badge"
              data-slot="badge"
              :class="ui.badge({ class: pohonProp?.badge })"
            />
          </slot>

          <time v-if="date || !!slots.date" :datetime="datetime" data-slot="date" :class="ui.date({ class: pohonProp?.date })">
            <slot name="date">
              {{ date }}
            </slot>
          </time>
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

        <div v-if="authors?.length || !!slots.authors" data-slot="authors" :class="ui.authors({ class: pohonProp?.authors })">
          <slot name="authors" : pohon="ui">
            <template v-if="authors?.length">
              <PAvatarGroup v-if="authors.length > 1">
                <PLink
                  v-for="(author, index) in authors"
                  :key="index"
                  :to="author.to"
                  :target="author.target"
                  data-slot="avatar"
                  :class="ui.avatar({ class: pohonProp?.avatar, to: !!author.to })"
                  raw
                >
                  <PAvatar v-bind="author.avatar" />
                </PLink>
              </PAvatarGroup>
              <PUser v-else v-bind="authors[0]" />
            </template>
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: pohonProp?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
