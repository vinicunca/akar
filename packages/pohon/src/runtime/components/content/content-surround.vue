<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
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

type SlotProps<T> = (props: { link: T }) => any;

export interface PContentSurroundSlots<T extends PContentSurroundLink = PContentSurroundLink> {
  'link': SlotProps<T>;
  'link-leading': SlotProps<T>;
  'link-title': SlotProps<T>;
  'link-description': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PContentSurroundLink">
import type { PropType } from 'vue';
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import PLink from '../link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PContentSurroundProps<T>>();
defineSlots<PContentSurroundSlots<T>>();

const appConfig = useAppConfig() as ContentSurround['AppConfig'];

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
      :class="pohon.link({ class: [props.pohon?.link, link.pohon?.link, link.class], direction })"
    >
      <slot
        name="link"
        :link="(link as T)"
      >
        <div :class="pohon.linkLeading({ class: [props.pohon?.linkLeading, link.pohon?.linkLeading] })">
          <slot
            name="link-leading"
            :link="(link as T)"
          >
            <PIcon
              :name="link.icon || icon"
              :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, link.pohon?.linkLeadingIcon], direction })"
            />
          </slot>
        </div>

        <p :class="pohon.linkTitle({ class: [props.pohon?.linkTitle, link.pohon?.linkTitle] })">
          <slot
            name="link-title"
            :link="(link as T)"
          >
            {{ link.title }}
          </slot>
        </p>

        <p :class="pohon.linkDescription({ class: [props.pohon?.linkDescription, link.pohon?.linkDescription] })">
          <slot
            name="link-description"
            :link="(link as T)"
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
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
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
