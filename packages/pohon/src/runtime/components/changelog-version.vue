<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PBadgeProps, PLinkProps, PUserProps } from '../types';
import type { ImgHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/changelog-version';

type ChangelogVersion = ComponentConfig<typeof theme, AppConfig, 'changelogVersion'>;

export interface PChangelogVersionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any;
  title?: string;
  description?: string;
  /** The date of the changelog version. Can be a string or a Date object. */
  date?: string | Date;
  /**
   * Display a badge on the changelog version.
   * Can be a string or an object.
   * `{ color: 'neutral', variant: 'solid' }`{lang="ts-type"}
   */
  badge?: string | PBadgeProps;
  /** The authors of the changelog version. */
  authors?: Array<PUserProps>;
  /** The image of the changelog version. Can be a string or an object. */
  image?: string | (Partial<ImgHTMLAttributes> & { [key: string]: any });
  /**
   * Display an indicator dot on the left.
   * @defaultValue true
   */
  indicator?: boolean;
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  pohon?: ChangelogVersion['slots'];
}

export interface PChangelogVersionSlots {
  header?: (props?: {}) => Array<VNode>;
  badge?: (props: { pohon: ChangelogVersion['pohon'] }) => Array<VNode>;
  date?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  image?: (props: { pohon: ChangelogVersion['pohon'] }) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
  authors?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  indicator?: (props: { pohon: ChangelogVersion['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import ImageComponent from '#build/pohon-image-component';
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive, useDateFormatter } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PBadge from './badge.vue';
import PLink from './link.vue';
import PUser from './user.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PChangelogVersionProps>(), {
  as: 'article',
  indicator: true,
});
const slots = defineSlots<PChangelogVersionSlots>();

const { locale } = useLocale();
const appConfig = useAppConfig() as ChangelogVersion['AppConfig'];
const pohonProp = useComponentPohon('changelogVersion', props);
const formatter = useDateFormatter(locale.value.code);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
const [DefineDateTemplate, ReuseDateTemplate] = createReusableTemplate<{ hidden?: boolean }>({
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.changelogVersion || {}) })({
  to: !!props.to || !!props.onClick,
}));

const date = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return formatter.custom({
      date: new Date(props.date),
      options: { dateStyle: 'medium' },
    });
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
  return (slotText || props.title || 'Version link').trim();
});
</script>

<template>
  <DefineLinkTemplate>
    <PLink
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
    </PLink>
  </DefineLinkTemplate>

  <DefineDateTemplate v-slot="{ hidden }">
    <time
      v-if="date"
      :datetime="datetime"
      data-slot="date"
      :class="pohon.date({ class: pohonProp?.date, hidden })"
    >
      <slot name="date">
        {{ date }}
      </slot>
    </time>
  </DefineDateTemplate>

  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @click="onClick"
  >
    <div
      v-if="!!props.indicator || !!slots.indicator"
      data-slot="indicator"
      :class="pohon.indicator({ class: pohonProp?.indicator })"
    >
      <slot
        name="indicator"
        :pohon="pohon"
      >
        <ReuseDateTemplate />

        <div
          data-slot="dot"
          :class="pohon.dot({ class: pohonProp?.dot })"
        >
          <div
            data-slot="dotInner"
            :class="pohon.dotInner({ class: pohonProp?.dotInner })"
          />
        </div>
      </slot>
    </div>

    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        v-if="!!slots.header || (date || !!slots.date) || (badge || !!slots.badge) || (title || !!slots.title) || (description || !!slots.description) || (image || !!slots.image)"
        data-slot="header"
        :class="pohon.header({ class: pohonProp?.header })"
      >
        <slot name="header">
          <div
            v-if="(date || !!slots.date) || (badge || !!slots.badge)"
            data-slot="meta"
            :class="pohon.meta({ class: pohonProp?.meta, badge: (!!badge || !!slots.badge) || !props.indicator })"
          >
            <slot
              name="badge"
              :pohon="pohon"
            >
              <PBadge
                v-if="badge"
                color="neutral"
                variant="solid"
                v-bind="isString(badge) ? { label: badge } : badge"
                data-slot="badge"
                :class="pohon.badge({ class: pohonProp?.badge })"
              />
            </slot>

            <ReuseDateTemplate :hidden="!!props.indicator" />
          </div>

          <h2
            v-if="title || !!slots.title"
            data-slot="title"
            :class="pohon.title({ class: pohonProp?.title })"
          >
            <ReuseLinkTemplate />

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
            v-if="image || !!slots.image"
            data-slot="imageWrapper"
            :class="pohon.imageWrapper({ class: pohonProp?.imageWrapper })"
          >
            <slot
              name="image"
              :pohon="pohon"
            >
              <component
                :is="ImageComponent"
                v-if="image"
                v-bind="isString(image) ? { src: image, alt: title } : { alt: title, ...image }"
                data-slot="image"
                :class="pohon.image({ class: pohonProp?.image, to: !!to })"
              />
            </slot>

            <ReuseLinkTemplate />
          </div>
        </slot>
      </div>

      <slot name="body" />

      <div
        v-if="!!slots.footer || (authors?.length || !!slots.authors) || !!slots.actions"
        data-slot="footer"
        :class="pohon.footer({ class: pohonProp?.footer, body: !!slots.body })"
      >
        <slot name="footer">
          <div
            v-if="authors?.length || !!slots.authors"
            data-slot="authors"
            :class="pohon.authors({ class: pohonProp?.authors })"
          >
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
  </APrimitive>
</template>
