<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { PropType, VNode } from 'vue';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-surround';

type ContentSurround = ComponentConfig<typeof theme, AppConfig, 'contentSurround'>;

export interface ContentSurroundLink extends ContentNavigationItem {
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  class?: any;
  pohon?: Pick<ContentSurround['slots'], 'link' | 'linkLeading' | 'linkLeadingIcon' | 'linkTitle' | 'linkDescription'>;
}

export interface ContentSurroundProps<T extends ContentSurroundLink = ContentSurroundLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed in the prev link.
   * @defaultValue appConfig.pohon.icons.arrowLeft
   * @IconifyIcon
   */
  prevIcon?: PIconProps['name'];
  /**
   * The icon displayed in the next link.
   * @defaultValue appConfig.pohon.icons.arrowRight
   * @IconifyIcon
   */
  nextIcon?: PIconProps['name'];
  surround?: Array<T>;
  class?: any;
  pohon?: ContentSurround['slots'];
}

type SlotProps<T> = (props: { link: T; pohon: ContentSurround['pohon'] }) => Array<VNode>;

export interface ContentSurroundSlots<T extends ContentSurroundLink = ContentSurroundLink> {
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-title'?: SlotProps<T>;
  'link-description'?: SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends ContentSurroundLink">
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useLocale } from '../../composables/use-locale';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import ULink from '../Link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ContentSurroundProps<T>>();
defineSlots<ContentSurroundSlots<T>>();

const { dir } = useLocale();
const appConfig = useAppConfig() as ContentSurround['AppConfig'];
const pohonProp = useComponentPohon('contentSurround', props);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ link?: ContentSurroundLink; icon: PIconProps['name']; direction: 'left' | 'right' }>({
  props: {
    link: Object,
    icon: String,
    direction: String as PropType<'left' | 'right'>,
  },
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.contentSurround || {}) })());

const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.arrowRight : appConfig.pohon.icons.arrowLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.arrowLeft : appConfig.pohon.icons.arrowRight));
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, icon, direction }">
    <ULink
      v-if="link"
      :to="link.path"
      raw
      data-slot="link"
      :class="pohon.link({ class: [pohonProp?.link, link.pohon?.link, link.class], direction })"
    >
      <slot
        name="link"
        :link="(link as T)"
        :pohon="pohon"
      >
        <div
          data-slot="linkLeading"
          :class="pohon.linkLeading({ class: [pohonProp?.linkLeading, link.pohon?.linkLeading] })"
        >
          <slot
            name="link-leading"
            :link="(link as T)"
            :pohon="pohon"
          >
            <PIcon
              :name="link.icon || icon"
              data-slot="linkLeadingIcon"
              :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, link.pohon?.linkLeadingIcon], direction })"
            />
          </slot>
        </div>

        <p
          data-slot="linkTitle"
          :class="pohon.linkTitle({ class: [pohonProp?.linkTitle, link.pohon?.linkTitle] })"
        >
          <slot
            name="link-title"
            :link="(link as T)"
            :pohon="pohon"
          >
            {{ link.title }}
          </slot>
        </p>

        <p
          data-slot="linkDescription"
          :class="pohon.linkDescription({ class: [pohonProp?.linkDescription, link.pohon?.linkDescription] })"
        >
          <slot
            name="link-description"
            :link="(link as T)"
            :pohon="pohon"
          >
            {{ link.description }}
          </slot>
        </p>
      </slot>
    </ULink>
    <span
      v-else
      class="hidden sm:block"
    >&nbsp;</span>
  </DefineLinkTemplate>

  <Primitive
    v-if="surround"
    :as="as"
    v-bind="$attrs"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <ReuseLinkTemplate
      :link="surround[0]"
      :icon="prevIcon"
      direction="left"
    />
    <ReuseLinkTemplate
      :link="surround[1]"
      :icon="nextIcon"
      direction="right"
    />
  </Primitive>
</template>
