<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PIconProps, PLinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-anchors';

type PageAnchors = ComponentConfig<typeof theme, AppConfig, 'pageAnchors'>;

export interface PPageAnchor extends Omit<PLinkProps, 'custom'> {
  label: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  class?: any;
  pohon?: Pick<PageAnchors['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeading' | 'linkLeadingIcon'>;
}

export interface PPageAnchorsProps<T extends PPageAnchor = PPageAnchor> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  links?: Array<T>;
  class?: any;
  pohon?: PageAnchors['slots'];
}

type SlotProps<T> = (props: { link: T; active: boolean; pohon: PageAnchors['pohon'] }) => Array<VNode>;

export interface PPageAnchorsSlots<T extends PPageAnchor = PPageAnchor> {
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-label'?: (props: { link: T; active: boolean }) => Array<VNode>;
  'link-trailing'?: (props: { link: T; active: boolean }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends PPageAnchor">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PIcon from './Icon.vue';
import PLink from './Link.vue';
import PLinkBase from './LinkBase.vue';

const props = withDefaults(defineProps<PPageAnchorsProps<T>>(), {
  as: 'nav',
});
const slots = defineSlots<PPageAnchorsSlots<T>>();

const appConfig = useAppConfig() as PageAnchors['AppConfig'];
const pohonProp = useComponentPohon('pageAnchors', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageAnchors || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
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
        <PLink
          v-slot="{ active, ...slotProps }"
          v-bind="pickLinkProps(link)"
          custom
        >
          <PLinkBase
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
              <div
                v-if="link.icon || !!slots['link-leading']"
                data-slot="linkLeading"
                :class="pohon.linkLeading({ class: [pohonProp?.linkLeading, link.pohon?.linkLeading], active })"
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
              </div>

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
          </PLinkBase>
        </PLink>
      </li>
    </ul>
  </APrimitive>
</template>
