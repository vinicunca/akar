<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PIconProps, PLinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/footer-columns';

type FooterColumns = ComponentConfig<typeof theme, AppConfig, 'footerColumns'>;

export interface PFooterColumnLink extends Omit<PLinkProps, 'custom'> {
  label: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  class?: any;
  pohon?: Pick<FooterColumns['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>;
}

export interface PFooterColumn<T extends PFooterColumnLink = PFooterColumnLink> {
  label: string;
  children?: Array<T>;
}

export interface PFooterColumnsProps<T extends PFooterColumnLink = PFooterColumnLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  columns?: Array<PFooterColumn<T>>;
  pohon?: FooterColumns['slots'];
}

type SlotProps<T> = (props: { link: T; active: boolean }) => any;

export interface FooterColumnsSlots<T extends PFooterColumnLink = PFooterColumnLink> {
  'left': (props?: object) => any;
  'default': (props?: object) => any;
  'right': (props?: object) => any;
  'column-label'?: (props: { column: PFooterColumn<T> }) => any;
  'link': SlotProps<T>;
  'link-leading': SlotProps<T>;
  'link-label': SlotProps<T>;
  'link-trailing': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PFooterColumnLink">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = withDefaults(
  defineProps<PFooterColumnsProps<T>>(),
  {
    as: 'nav',
  },
);
const slots = defineSlots<FooterColumnsSlots<T>>();

const appConfig = useAppConfig() as FooterColumns['AppConfig'];

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.footerColumns || {}) })(),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div
      v-if="!!slots.left"
      :class="pohon.left({ class: props.pohon?.left })"
    >
      <slot name="left" />
    </div>

    <div
      v-if="!!slots.default || columns?.length"
      :class="pohon.center({ class: props.pohon?.center })"
    >
      <slot>
        <div
          v-for="(column, index) in columns"
          :key="index"
        >
          <h3 :class="pohon.label({ class: props.pohon?.label })">
            <slot
              name="column-label"
              :column="column"
            >
              {{ column.label }}
            </slot>
          </h3>

          <ul :class="pohon.list({ class: props.pohon?.list })">
            <li
              v-for="(link, linkIndex) in column.children"
              :key="linkIndex"
              :class="pohon.item({ class: [props.pohon?.item, link.pohon?.item] })"
            >
              <PLink
                v-slot="{ active, ...slotProps }"
                v-bind="pickLinkProps(link)"
                custom
              >
                <PLinkBase
                  v-bind="slotProps"
                  :class="pohon.link({ class: [props.pohon?.link, link.pohon?.link, link.class], active })"
                >
                  <slot
                    name="link"
                    :link="(link as T)"
                    :active="active"
                  >
                    <slot
                      name="link-leading"
                      :link="(link as T)"
                      :active="active"
                    >
                      <PIcon
                        v-if="link.icon"
                        :name="link.icon"
                        :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, link.pohon?.linkLeadingIcon], active })"
                      />
                    </slot>

                    <span
                      v-if="link.label || !!slots['link-label']"
                      :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, link.pohon?.linkLabel], active })"
                    >
                      <slot
                        name="link-label"
                        :link="(link as T)"
                        :active="active"
                      >
                        {{ (link as T).label }}
                      </slot>

                      <PIcon
                        v-if="link.target === '_blank'"
                        :name="appConfig.pohon.icons.external"
                        :class="pohon.linkLabelExternalIcon({ class: [props.pohon?.linkLabelExternalIcon, link.pohon?.linkLabelExternalIcon], active })"
                      />
                    </span>

                    <slot
                      name="link-trailing"
                      :link="(link as T)"
                      :active="active"
                    />
                  </slot>
                </PLinkBase>
              </PLink>
            </li>
          </ul>
        </div>
      </slot>
    </div>

    <div
      v-if="!!slots.right"
      :class="pohon.right({ class: props.pohon?.right })"
    >
      <slot name="right" />
    </div>
  </APrimitive>
</template>
