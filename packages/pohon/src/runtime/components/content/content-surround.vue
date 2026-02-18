<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { PropType } from 'vue';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-surround';

type ContentSurround = ComponentConfig<typeof theme, AppConfig, 'contentSurround'>;

export interface PContentSurroundLink extends ContentNavigationItem {
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  class?: any;
  pohon?: Pick<ContentSurround['slots'], 'link' | 'linkLeading' | 'linkLeadingIcon' | 'linkTitle' | 'linkDescription'>;
}

export interface PContentSurroundProps<T extends PContentSurroundLink = PContentSurroundLink> {
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

type SlotProps<T> = (props: { link: T; pohon: ContentSurround['pohon'] }) => any;

export interface PContentSurroundSlots<T extends PContentSurroundLink = PContentSurroundLink> {
  'link': SlotProps<T>;
  'link-leading': SlotProps<T>;
  'link-title': SlotProps<T>;
  'link-description': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PContentSurroundLink">
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import PLink from '../link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PContentSurroundProps<T>>();
defineSlots<PContentSurroundSlots<T>>();

const appConfig = useAppConfig() as ContentSurround['AppConfig'];
const pohonProp = useComponentPohon('contentSurround', props);

const [
  DefineLinkTemplate,
  ReuseLinkTemplate,
] = createReusableTemplate<{ link?: PContentSurroundLink; icon: PIconProps['name']; direction: 'left' | 'right' }>({
  props: {
    link: Object,
    icon: String,
    direction: String as PropType<'left' | 'right'>,
  },
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contentSurround || {}),
  })(),
);
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, icon, direction }">
    <PLink
      v-if="link"
      :to="link.path"
      raw
      :class="pohon.link({ class: [pohonProp?.link, link.pohon?.link, link.class], direction })"
      data-pohon="content-surround-link"
    >
      <slot
        name="link"
        :link="(link as T)"
        :pohon="pohon"
      >
        <div
          :class="pohon.linkLeading({ class: [pohonProp?.linkLeading, link.pohon?.linkLeading] })"
          data-pohon="content-surround-link-leading"
        >
          <slot
            name="link-leading"
            :link="(link as T)"
            :pohon="pohon"
          >
            <PIcon
              :name="link.icon || icon"
              :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, link.pohon?.linkLeadingIcon], direction })"
              data-pohon="content-surround-link-leading-icon"
            />
          </slot>
        </div>

        <p
          :class="pohon.linkTitle({ class: [pohonProp?.linkTitle, link.pohon?.linkTitle] })"
          data-pohon="content-surround-link-title"
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
          :class="pohon.linkDescription({ class: [pohonProp?.linkDescription, link.pohon?.linkDescription] })"
          data-pohon="content-surround-link-description"
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
    </PLink>
    <span
      v-else
      class="hidden lg:block"
    >&nbsp;</span>
  </DefineLinkTemplate>

  <APrimitive
    v-if="surround"
    :as="as"
    v-bind="$attrs"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="content-surround-root"
  >
    <ReuseLinkTemplate
      :link="surround[0]"
      :icon="prevIcon || appConfig.pohon.icons.arrowLeft"
      direction="left"
    />
    <ReuseLinkTemplate
      :link="surround[1]"
      :icon="nextIcon || appConfig.pohon.icons.arrowRight"
      direction="right"
    />
  </APrimitive>
</template>
