<script lang="ts">
import type { TocLink } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { ACollapsibleRootEmits, ACollapsibleRootProps } from 'akar';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-toc';

type ContentToc = ComponentConfig<typeof theme, AppConfig, 'contentToc'>;

export type PContentTocLink = TocLink & {
  class?: any;
  pohon?: Pick<ContentToc['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkText'>;
};

export interface PContentTocProps<T extends PContentTocLink = PContentTocLink> extends Pick<ACollapsibleRootProps, 'defaultOpen' | 'open'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  /**
   * The icon displayed to collapse the content.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  /**
   * The title of the table of contents.
   * @defaultValue t('contentToc.title')
   */
  title?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: ContentToc['variants']['color'];
  /**
   * Display a line next to the active link.
   * @defaultValue false
   */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: ContentToc['variants']['highlightColor'];
  links?: Array<T>;
  class?: any;
  pohon?: ContentToc['slots'];
}

export type PContentTocEmits = ACollapsibleRootEmits & {
  move: [id: string];
};

type SlotProps<T> = (props: { link: T }) => any;

export interface PContentTocSlots<T extends PContentTocLink = PContentTocLink> {
  leading: (props: { open: boolean }) => any;
  default: (props: { open: boolean }) => any;
  trailing: (props: { open: boolean }) => any;
  content: (props: { links: Array<T> }) => any;
  link: SlotProps<T>;
  top: (props: { links?: Array<T> }) => any;
  bottom: (props: { links?: Array<T> }) => any;
}
</script>

<script setup lang="ts" generic="T extends PContentTocLink">
import { useAppConfig, useNuxtApp, useRouter } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  ACollapsibleContent,
  ACollapsibleRoot,
  ACollapsibleTrigger,
  useForwardPropsEmits,
} from 'akar';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import { useScrollspy } from '../../composables/use-scrollspy';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PContentTocProps<T>>(),
  {
    as: 'nav',
  },
);
const emits = defineEmits<PContentTocEmits>();
const slots = defineSlots<PContentTocSlots<T>>();

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'open', 'defaultOpen'), emits);

const { t } = useLocale();
const router = useRouter();
const appConfig = useAppConfig() as ContentToc['AppConfig'];
const { activeHeadings, updateHeadings } = useScrollspy();

const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate<{ links: Array<T>; level: number }>({
  props: {
    links: Array,
    level: Number,
  },
});
const [DefineTriggerTemplate, ReuseTriggerTemplate] = createReusableTemplate<{ open: boolean }>();

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contentToc || {}),
  })({
    color: props.color,
    highlight: props.highlight,
    highlightColor: props.highlightColor || props.color,
  }),
);

function scrollToHeading(id: string) {
  const encodedId = encodeURIComponent(id);
  router.push(`#${encodedId}`);
  emits('move', id);
}

function flattenLinks(links: Array<T>): Array<T> {
  return links.flatMap((link) => [link, ...(link.children ? flattenLinks(link.children as Array<T>) : [])]);
}

const indicatorStyle = computed(() => {
  if (!activeHeadings.value?.length) {
    return;
  }

  const flatLinks = flattenLinks(props.links || []);
  const activeIndex = flatLinks.findIndex((link) => activeHeadings.value.includes(link.id));
  const linkHeight = 28;
  const gapSize = 0;

  return {
    '--indicator-size': `${(linkHeight * activeHeadings.value.length) + (gapSize * (activeHeadings.value.length - 1))}px`,
    '--indicator-position': activeIndex >= 0 ? `${activeIndex * (linkHeight + gapSize)}px` : '0px',
  };
});

const nuxtApp = useNuxtApp();

nuxtApp.hooks.hook('page:loading:end', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'));
  updateHeadings(headings);
});
nuxtApp.hooks.hook('page:transition:finish', () => {
  const headings = Array.from(document.querySelectorAll('h2, h3'));
  updateHeadings(headings);
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <DefineListTemplate v-slot="{ links, level }">
    <ul :class="level > 0 ? pohon.listWithChildren({ class: props.pohon?.listWithChildren }) : pohon.list({ class: props.pohon?.list })">
      <li
        v-for="(link, index) in links"
        :key="index"
        :class="link.children && link.children.length > 0
          ? pohon.itemWithChildren({ class: [props.pohon?.itemWithChildren, link.pohon?.itemWithChildren] })
          : pohon.item({ class: [props.pohon?.item, link.pohon?.item] })"
      >
        <a
          :href="`#${link.id}`"
          :class="pohon.link({ class: [props.pohon?.link, link.pohon?.link, link.class], active: activeHeadings.includes(link.id) })"
          @click.prevent="scrollToHeading(link.id)"
        >
          <slot
            name="link"
            :link="link"
          >
            <span :class="pohon.linkText({ class: [props.pohon?.linkText, link.pohon?.linkText] })">
              {{ link.text }}
            </span>
          </slot>
        </a>

        <ReuseListTemplate
          v-if="link.children?.length"
          :links="(link.children as T[])"
          :level="level + 1"
        />
      </li>
    </ul>
  </DefineListTemplate>

  <DefineTriggerTemplate v-slot="{ open }">
    <slot
      name="leading"
      :open="open"
    />

    <span :class="pohon.title({ class: props.pohon?.title })">
      <slot :open="open">{{ title || t('contentToc.title') }}</slot>
    </span>

    <span :class="pohon.trailing({ class: props.pohon?.trailing })">
      <slot
        name="trailing"
        :open="open"
      >
        <PIcon
          :name="trailingIcon || appConfig.pohon.icons.chevronDown"
          :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
        />
      </slot>
    </span>
  </DefineTriggerTemplate>

  <ACollapsibleRoot
    v-slot="{ open }"
    v-bind="{ ...rootProps, ...$attrs }"
    :default-open="defaultOpen"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div :class="pohon.container({ class: props.pohon?.container })">
      <div
        v-if="!!slots.top"
        :class="pohon.top({ class: props.pohon?.top })"
      >
        <slot
          name="top"
          :links="links"
        />
      </div>

      <template v-if="links?.length">
        <ACollapsibleTrigger :class="pohon.trigger({ class: 'lg:hidden' })">
          <ReuseTriggerTemplate :open="open" />
        </ACollapsibleTrigger>

        <ACollapsibleContent :class="pohon.content({ class: [props.pohon?.content, 'lg:hidden'] })">
          <div
            v-if="highlight"
            :class="pohon.indicator({ class: props.pohon?.indicator })"
            :style="indicatorStyle"
          />

          <slot
            name="content"
            :links="links"
          >
            <ReuseListTemplate
              :links="links"
              :level="0"
            />
          </slot>
        </ACollapsibleContent>

        <p :class="pohon.trigger({ class: 'hidden lg:flex' })">
          <ReuseTriggerTemplate :open="open" />
        </p>

        <div :class="pohon.content({ class: [props.pohon?.content, 'hidden lg:flex'] })">
          <div
            v-if="highlight"
            :class="pohon.indicator({ class: props.pohon?.indicator })"
            :style="indicatorStyle"
          />

          <slot
            name="content"
            :links="links"
          >
            <ReuseListTemplate
              :links="links"
              :level="0"
            />
          </slot>
        </div>
      </template>

      <div
        v-if="!!slots.bottom"
        :class="pohon.bottom({ class: props.pohon?.bottom, body: !!slots.top || !!links?.length })"
      >
        <slot
          name="bottom"
          :links="links"
        />
      </div>
    </div>
  </ACollapsibleRoot>
</template>
