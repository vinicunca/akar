<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { BadgeProps, LinkProps, UserProps } from '../types';
import type { ImgHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/blog-post';

type BlogPost = ComponentConfig<typeof theme, AppConfig, 'blogPost'>;

export interface BlogPostProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any;
  title?: string;
  description?: string;
  /** The date of the blog post. Can be a string or a Date object. */
  date?: string | Date;
  /**
   * Display a badge on the blog post.
   * Can be a string or an object.
   * `{ color: 'neutral', variant: 'subtle' }`{lang="ts-type"}
   */
  badge?: string | BadgeProps;
  /** The authors of the blog post. */
  authors?: Array<UserProps>;
  /** The image of the blog post. Can be a string or an object. */
  image?: string | (Partial<ImgHTMLAttributes> & { [key: string]: any });
  /**
   * The orientation of the blog post.
   * @defaultValue 'vertical'
   */
  orientation?: BlogPost['variants']['orientation'];
  /**
   * @defaultValue 'outline'
   */
  variant?: BlogPost['variants']['variant'];
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  pohon?: BlogPost['slots'];
}

export interface BlogPostSlots {
  date?: (props?: {}) => Array<VNode>;
  badge?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  authors?: (props: { pohon: BlogPost['pohon'] }) => Array<VNode>;
  header?: (props: { pohon: BlogPost['pohon'] }) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import ImageComponent from '#build/pohon-image-component';
import { useAppConfig } from '#imports';
import { Primitive, useDateFormatter } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import UAvatarGroup from './AvatarGroup.vue';
import UBadge from './Badge.vue';
import ULink from './Link.vue';
import UUser from './User.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BlogPostProps>(), {
  as: 'article',
  orientation: 'vertical',
});
const slots = defineSlots<BlogPostSlots>();

const { locale } = useLocale();
const appConfig = useAppConfig() as BlogPost['AppConfig'];
const pohonProp = useComponentPohon('blogPost', props);
const formatter = useDateFormatter(locale.value.code);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.blogPost || {}) })({
  orientation: props.orientation,
  variant: props.variant,
  image: !!props.image,
  to: !!props.to || !!props.onClick,
}));

const date = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return formatter.custom(new Date(props.date), { dateStyle: 'medium' });
  } catch {
    return props.date;
  }
});
const datetime = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return new Date(props.date)?.toISOString();
  } catch {
    return undefined;
  }
});
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Post link').trim();
});
</script>

<template>
  <Primitive
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @click="onClick"
  >
    <div
      v-if="image || !!slots.header"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot
        name="header"
        :pohon="pohon"
      >
        <component
          :is="ImageComponent"
          v-bind="typeof image === 'string' ? { src: image, alt: title } : { alt: title, ...image }"
          data-slot="image"
          :class="pohon.image({ class: pohonProp?.image, to: !!to })"
        />
      </slot>
    </div>

    <div
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <ULink
        v-if="to"
        :aria-label="ariaLabel"
        v-bind="{ to, target, ...$attrs }"
        class="peer focus:outline-none"
        raw
      >
        <span
          class="inset-0 absolute"
          aria-hidden="true"
        />
      </ULink>

      <slot name="body">
        <div
          v-if="(date || !!slots.date) || (badge || !!slots.badge)"
          data-slot="meta"
          :class="pohon.meta({ class: pohonProp?.meta })"
        >
          <slot name="badge">
            <UBadge
              v-if="badge"
              color="neutral"
              variant="subtle"
              v-bind="typeof badge === 'string' ? { label: badge } : badge"
              data-slot="badge"
              :class="pohon.badge({ class: pohonProp?.badge })"
            />
          </slot>

          <time
            v-if="date || !!slots.date"
            :datetime="datetime"
            data-slot="date"
            :class="pohon.date({ class: pohonProp?.date })"
          >
            <slot name="date">
              {{ date }}
            </slot>
          </time>
        </div>

        <h2
          v-if="title || !!slots.title"
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <div
          v-if="description || !!slots.description"
          data-slot="description"
          :class="pohon.description({ class: pohonProp?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>

        <div
          v-if="authors?.length || !!slots.authors"
          data-slot="authors"
          :class="pohon.authors({ class: pohonProp?.authors })"
        >
          <slot
            name="authors"
            :pohon="pohon"
          >
            <template v-if="authors?.length">
              <UAvatarGroup v-if="authors.length > 1">
                <ULink
                  v-for="(author, index) in authors"
                  :key="index"
                  :to="author.to"
                  :target="author.target"
                  data-slot="avatar"
                  :class="pohon.avatar({ class: pohonProp?.avatar, to: !!author.to })"
                  raw
                >
                  <PAvatar v-bind="author.avatar" />
                </ULink>
              </UAvatarGroup>
              <UUser
                v-else
                v-bind="authors[0]"
              />
            </template>
          </slot>
        </div>
      </slot>
    </div>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot name="footer" />
    </div>
  </Primitive>
</template>
