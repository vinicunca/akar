<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { LinkProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-links';

type PageLinks = ComponentConfig<typeof theme, AppConfig, 'pageLinks'>;

export interface PageLink extends Omit<LinkProps, 'custom'> {
  label: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  class?: any;
  pohon?: Pick<PageLinks['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>;
}

export interface PageLinksProps<T extends PageLink = PageLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  title?: string;
  links?: Array<T>;
  class?: any;
  pohon?: PageLinks['slots'];
}

type SlotProps<T> = (props: { link: T; active: boolean; pohon: PageLinks['pohon'] }) => Array<VNode>;

export interface PageLinksSlots<T extends PageLink = PageLink> {
  'title'?: (props?: {}) => Array<VNode>;
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-label'?: (props: { link: T; active: boolean }) => Array<VNode>;
  'link-trailing'?: (props: { link: T; active: boolean }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends PageLink">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';
import ULink from './Link.vue';
import ULinkBase from './LinkBase.vue';

const props = withDefaults(defineProps<PageLinksProps<T>>(), {
  as: 'nav',
});
const slots = defineSlots<PageLinksSlots<T>>();

const appConfig = useAppConfig() as PageLinks['AppConfig'];
const pohonProp = useComponentPohon('pageLinks', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageLinks || {}) })());
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <p
      v-if="title || !!slots.title"
      data-slot="title"
      :class="pohon.title({ class: pohonProp?.title })"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <ul
      data-slot="list"
      :class="pohon.list({ class: pohonProp?.list })"
    >
      <li
        v-for="(link, index) in links"
        :key="index"
        data-slot="item"
        :class="pohon.item({ class: [pohonProp?.item, link.pohon?.item] })"
      >
        <ULink
          v-slot="{ active, ...slotProps }"
          v-bind="pickLinkProps(link)"
          custom
        >
          <ULinkBase
            v-bind="slotProps"
            data-slot="link"
            :class="pohon.link({ class: [pohonProp?.link, link.pohon?.link, link.class], active })"
          >
            <slot
              name="link"
              :link="link"
              :active="active"
              :pohon="pohon"
            >
              <slot
                name="link-leading"
                :link="link"
                :active="active"
                :pohon="pohon"
              >
                <PIcon
                  v-if="link.icon"
                  :name="link.icon"
                  data-slot="linkLeadingIcon"
                  :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, link.pohon?.linkLeadingIcon], active })"
                />
              </slot>

              <span
                v-if="link.label || !!slots['link-label']"
                data-slot="linkLabel"
                :class="pohon.linkLabel({ class: [pohonProp?.linkLabel, link.pohon?.linkLabel], active })"
              >
                <slot
                  name="link-label"
                  :link="link"
                  :active="active"
                >
                  {{ link.label }}
                </slot>

                <PIcon
                  v-if="link.target === '_blank'"
                  :name="appConfig.pohon.icons.external"
                  data-slot="linkLabelExternalIcon"
                  :class="pohon.linkLabelExternalIcon({ class: [pohonProp?.linkLabelExternalIcon, link.pohon?.linkLabelExternalIcon], active })"
                />
              </span>

              <slot
                name="link-trailing"
                :link="link"
                :active="active"
              />
            </slot>
          </ULinkBase>
        </ULink>
      </li>
    </ul>
  </Primitive>
</template>
