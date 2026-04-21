<script lang="ts">
import type { TocLink } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-toc';

type ContentToc = ComponentConfig<typeof theme, AppConfig, 'contentToc'>;

export type ContentTocLink = TocLink & {
  class?: any;
  pohon?: Pick<ContentToc['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkText'>;
};

export interface ContentTocProps<T extends ContentTocLink = ContentTocLink> extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open'> {
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
  /**
   * The variant of the highlight indicator.
   * @defaultValue 'straight'
   */
  highlightVariant?: ContentToc['variants']['highlightVariant'];
  links?: Array<T>;
  class?: any;
  pohon?: ContentToc['slots'];
}

export type ContentTocEmits = CollapsibleRootEmits & {
  move: [id: string];
};

type SlotProps<T> = (props: { link: T }) => Array<VNode>;

export interface ContentTocSlots<T extends ContentTocLink = ContentTocLink> {
  leading?: (props: { open: boolean; pohon: ContentToc['pohon'] }) => Array<VNode>;
  default?: (props: { open: boolean }) => Array<VNode>;
  trailing?: (props: { open: boolean; pohon: ContentToc['pohon'] }) => Array<VNode>;
  content?: (props: { links: Array<T> }) => Array<VNode>;
  link?: SlotProps<T>;
  top?: (props: { links?: Array<T> }) => Array<VNode>;
  bottom?: (props: { links?: Array<T> }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends ContentTocLink">
import { useAppConfig, useNuxtApp, useRouter } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from 'akar';
import { computed, onUnmounted } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useLocale } from '../../composables/use-locale';
import { useResolvedVariants } from '../../composables/useResolvedVariants';
import { useScrollspy } from '../../composables/useScrollspy';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ContentTocProps<T>>(), {
  as: 'nav',
});
const emits = defineEmits<ContentTocEmits>();
const slots = defineSlots<ContentTocSlots<T>>();

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'open', 'defaultOpen'), emits);

const { t } = useLocale();
const router = useRouter();
const appConfig = useAppConfig() as ContentToc['AppConfig'];
const pohonProp = useComponentPohon('contentToc', props);
const { highlightVariant } = useResolvedVariants('contentToc', props, theme, ['highlightVariant']);
const { activeHeadings, updateHeadings } = useScrollspy();

const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate<{ links: Array<T>; level: number }>({
  props: {
    links: Array,
    level: Number,
  },
});
const [DefineTriggerTemplate, ReuseTriggerTemplate] = createReusableTemplate<{ open: boolean }>();
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.contentToc || {}) })({
  color: props.color,
  highlight: props.highlight,
  highlightVariant: highlightVariant.value,
  highlightColor: props.highlightColor || props.color,
}));

function scrollToHeading(id: string) {
  const encodedId = encodeURIComponent(id);
  router.push(`#${encodedId}`);
  emits('move', id);
}

function flattenLinks(links: Array<T>): Array<T> {
  return links.flatMap((link) => [link, ...(link.children ? flattenLinks(link.children as Array<T>) : [])]);
}

function flattenLinksWithLevel(links: Array<T>, level = 0): Array<{ link: T; level: number }> {
  return links.flatMap((link) => [
    { link, level },
    ...(link.children ? flattenLinksWithLevel(link.children as Array<T>, level + 1) : []),
  ]);
}

const linkHeight = 1.75; // rem — text-sm line-height (1.25rem) + py-1 (0.5rem)

const indicatorStyle = computed(() => {
  if (!activeHeadings.value?.length) {
    return;
  }

  const flatLinks = flattenLinks(props.links || []);
  const activeIndex = flatLinks.findIndex((link) => activeHeadings.value.includes(link.id));

  return {
    '--indicator-size': `${linkHeight * activeHeadings.value.length}rem`,
    '--indicator-position': activeIndex >= 0 ? `${activeIndex * linkHeight}rem` : '0rem',
  };
});

// Generate SVG path for the circuit line structure
const circuitMaskStyle = computed(() => {
  if (!props.highlight || highlightVariant.value !== 'circuit' || !props.links?.length) {
    return;
  }

  const flatLinks = flattenLinksWithLevel(props.links);
  const svgUnit = 16; // SVG viewBox units per rem
  const svgLinkHeight = linkHeight * svgUnit;
  const svgHeight = flatLinks.length * svgLinkHeight;
  const x0 = 0.5;
  const x1 = 10.5;

  let path = '';
  let currentX = x0;
  let y = 0;

  flatLinks.forEach((item, index) => {
    const targetX = item.level > 0 ? x1 : x0;
    const nextY = y + svgLinkHeight;

    if (index === 0) {
      path += `M${targetX} ${y}`;
      currentX = targetX;
    }

    if (targetX !== currentX) {
      path += ` L${targetX} ${y + 6}`;
      currentX = targetX;
    }

    path += ` L${currentX} ${nextY - (index < flatLinks.length - 1 && flatLinks[index + 1]?.level !== item.level ? 6 : 0)}`;
    y = nextY;
  });

  const svgPath = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 ${svgHeight}'><path d='${path}' stroke='black' stroke-width='1' fill='none'/></svg>`);

  return {
    width: '0.75rem',
    height: `${flatLinks.length * linkHeight}rem`,
    maskImage: `url("data:image/svg+xml,${svgPath}")`,
  };
});

const nuxtApp = useNuxtApp();

function refreshHeadings() {
  const flatLinks = flattenLinks(props.links || []);
  if (!flatLinks.length) {
    updateHeadings([]);
    return;
  }
  const selector = flatLinks.map((l) => `#${CSS.escape(l.id)}`).join(', ');
  const headings = Array.from(document.querySelectorAll(selector));
  updateHeadings(headings);
}

const offLoadingEnd = nuxtApp.hooks.hook('page:loading:end', refreshHeadings);
const offTransitionFinish = nuxtApp.hooks.hook('page:transition:finish', refreshHeadings);

onUnmounted(() => {
  offLoadingEnd();
  offTransitionFinish();
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <DefineListTemplate v-slot="{ links, level }">
    <ul :class="level > 0 ? pohon.listWithChildren({ class: pohonProp?.listWithChildren }) : pohon.list({ class: pohonProp?.list })">
      <li
        v-for="(link, index) in links"
        :key="index"
        :class="link.children && link.children.length > 0 ? pohon.itemWithChildren({ class: [pohonProp?.itemWithChildren, link.pohon?.itemWithChildren] }) : pohon.item({ class: [pohonProp?.item, link.pohon?.item] })"
      >
        <a
          :href="`#${link.id}`"
          data-slot="link"
          :class="pohon.link({ class: [pohonProp?.link, link.pohon?.link, link.class], active: activeHeadings.includes(link.id) })"
          @click.prevent="scrollToHeading(link.id)"
        >
          <slot
            name="link"
            :link="link"
          >
            <span
              data-slot="linkText"
              :class="pohon.linkText({ class: [pohonProp?.linkText, link.pohon?.linkText] })"
            >
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
      :pohon="pohon"
    />

    <span
      data-slot="title"
      :class="pohon.title({ class: pohonProp?.title })"
    >
      <slot :open="open">{{ title || t('contentToc.title') }}</slot>
    </span>

    <span
      data-slot="trailing"
      :class="pohon.trailing({ class: pohonProp?.trailing })"
    >
      <slot
        name="trailing"
        :open="open"
        :pohon="pohon"
      >
        <PIcon
          :name="trailingIcon || appConfig.pohon.icons.chevronDown"
          data-slot="trailingIcon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
        />
      </slot>
    </span>
  </DefineTriggerTemplate>

  <DefineContentTemplate>
    <div
      v-if="highlight"
      data-slot="indicator"
      :class="pohon.indicator({ class: pohonProp?.indicator })"
      :style="{ ...indicatorStyle, ...(circuitMaskStyle || {}) }"
    >
      <div
        data-slot="indicatorLine"
        :class="pohon.indicatorLine({ class: pohonProp?.indicatorLine })"
      />
      <div
        v-if="indicatorStyle"
        data-slot="indicatorActive"
        :class="pohon.indicatorActive({ class: pohonProp?.indicatorActive })"
      />
    </div>

    <slot
      name="content"
      :links="links!"
    >
      <ReuseListTemplate
        :links="links!"
        :level="0"
      />
    </slot>
  </DefineContentTemplate>

  <CollapsibleRoot
    v-slot="{ open }"
    v-bind="{ ...rootProps, ...$attrs }"
    :default-open="defaultOpen"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        v-if="!!slots.top"
        data-slot="top"
        :class="pohon.top({ class: pohonProp?.top })"
      >
        <slot
          name="top"
          :links="links"
        />
      </div>

      <template v-if="links?.length">
        <CollapsibleTrigger
          data-slot="trigger"
          :class="pohon.trigger({ class: 'lg:hidden' })"
        >
          <ReuseTriggerTemplate :open="open" />
        </CollapsibleTrigger>

        <CollapsibleContent
          data-slot="content"
          :class="pohon.content({ class: [pohonProp?.content, 'lg:hidden'] })"
        >
          <ReuseContentTemplate />
        </CollapsibleContent>

        <p
          data-slot="trigger"
          :class="pohon.trigger({ class: 'hidden lg:flex' })"
        >
          <ReuseTriggerTemplate :open="open" />
        </p>

        <div
          data-slot="content"
          :class="pohon.content({ class: [pohonProp?.content, 'hidden lg:flex'] })"
        >
          <ReuseContentTemplate />
        </div>
      </template>

      <div
        v-if="!!slots.bottom"
        data-slot="bottom"
        :class="pohon.bottom({ class: pohonProp?.bottom, body: !!slots.top || !!links?.length })"
      >
        <slot
          name="bottom"
          :links="links"
        />
      </div>
    </div>
  </CollapsibleRoot>
</template>
