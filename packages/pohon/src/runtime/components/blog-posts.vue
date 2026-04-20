<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/blog-posts'
import type { BlogPostProps, BlogPostSlots } from './blog-post.vue'
import type { ComponentConfig } from '../types/tv'

type BlogPosts = ComponentConfig<typeof theme, AppConfig, 'blogPosts'>

export interface BlogPostsProps<T extends BlogPostProps = BlogPostProps> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  posts?: T[]
  /**
   * The orientation of the blog posts.
   * @defaultValue 'horizontal'
   */
  orientation?: BlogPosts['variants']['orientation']
  class?: any
  pohon?: { base?: any }
}

type ExtendSlotWithPost<T extends BlogPostProps, K extends keyof BlogPostSlots>
  = Required<BlogPostSlots>[K] extends (props: infer P) => VNode[]
    ? (props: P & { post: T }) => VNode[]
    : Required<BlogPostSlots>[K]

export type BlogPostsSlots<T extends BlogPostProps = BlogPostProps> = {
  [K in keyof BlogPostSlots]?: ExtendSlotWithPost<T, K>
} & {
  default?(props?: {}): VNode[]
}

</script>

<script setup lang="ts" generic="T extends BlogPostProps">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { omit } from '../utils'
import { tv } from '../utils/tv'
import { useComponentPohon } from '../composables/use-component-pohon'
import PBlogPost from './blog-post.vue'

const props = withDefaults(defineProps<BlogPostsProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<BlogPostsSlots<T>>()

const getProxySlots = () => omit(slots, ['default'])

const appConfig = useAppConfig() as BlogPosts['AppConfig']
const pohonProp = useComponentPohon('blogPosts', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.blogPosts || {}) }))
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" :class="ui({ orientation, class: [pohonProp?.base, props.class] })">
    <slot>
      <PBlogPost
        v-for="(post, index) in posts"
        :key="index"
        :orientation="orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="post"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
          <slot :name="name" v-bind="(slotData as any)" :post="post" />
        </template>
      </PBlogPost>
    </slot>
  </Primitive>
</template>
