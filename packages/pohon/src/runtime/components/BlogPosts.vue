<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PBlogPostProps, PBlogPostSlots } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/blog-posts';

type BlogPosts = ComponentConfig<typeof theme, AppConfig, 'blogPosts'>;

export interface PBlogPostsProps<T extends PBlogPostProps = PBlogPostProps> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  posts?: Array<T>;
  /**
   * The orientation of the blog posts.
   * @defaultValue 'horizontal'
   */
  orientation?: BlogPosts['variants']['orientation'];
  class?: any;
  pohon?: { base?: any };
}

type ExtendSlotWithPost<T extends PBlogPostProps, K extends keyof PBlogPostSlots>
  = Required<PBlogPostSlots>[K] extends (props: infer P) => Array<VNode>
    ? (props: P & { post: T }) => Array<VNode>
    : Required<PBlogPostSlots>[K];

export type PBlogPostsSlots<T extends PBlogPostProps = PBlogPostProps> = {
  [K in keyof PBlogPostSlots]?: ExtendSlotWithPost<T, K>
} & {
  default?: (props?: {}) => Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends PBlogPostProps">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PBlogPost from './BlogPost.vue';

const props = withDefaults(defineProps<PBlogPostsProps>(), {
  orientation: 'horizontal',
});
const slots = defineSlots<PBlogPostsSlots<T>>();

const getProxySlots = () => omit(slots, ['default']);

const appConfig = useAppConfig() as BlogPosts['AppConfig'];
const pohonProp = useComponentPohon('blogPosts', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.blogPosts || {}) }));
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon({ orientation, class: [pohonProp?.base, props.class] })"
  >
    <slot>
      <PBlogPost
        v-for="(post, index) in posts"
        :key="index"
        :orientation="orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="post"
      >
        <template
          v-for="(_, name) in getProxySlots()"
          #[name]="slotData"
        >
          <slot
            :name="name"
            v-bind="(slotData as any)"
            :post="post"
          />
        </template>
      </PBlogPost>
    </slot>
  </APrimitive>
</template>
