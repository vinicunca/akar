<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PAvatarProps, PIconProps, PLinkProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/breadcrumb';

type Breadcrumb = ComponentConfig<typeof theme, AppConfig, 'breadcrumb'>;

export interface PBreadcrumbItem extends Omit<PLinkProps, 'raw' | 'custom'> {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  slot?: string;
  class?: any;
  pohon?: Pick<Breadcrumb['slots'], 'item' | 'link' | 'linkLeadingIcon' | 'linkLeadingAvatar' | 'linkLabel' | 'separator' | 'separatorIcon'>;
  [key: string]: any;
}

export interface PBreadcrumbProps<T extends PBreadcrumbItem = PBreadcrumbItem> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  items?: Array<T>;
  /**
   * The icon to use as a separator.
   * @defaultValue appConfig.pohon.icons.chevronRight
   * @IconifyIcon
   */
  separatorIcon?: PIconProps['name'];
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: Breadcrumb['slots'];
}

type SlotProps<T extends PBreadcrumbItem> = (props: {
  item: T;
  index: number;
  active?: boolean;
  pohon: Breadcrumb['pohon'];
}) => any;

export type PBreadcrumbSlots<T extends PBreadcrumbItem = PBreadcrumbItem> = {
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; index: number; active?: boolean }) => any;
  'item-trailing': (props: { item: T; index: number; active?: boolean }) => any;
  'separator': (props: { pohon: Breadcrumb['pohon'] }) => any;
} & DynamicSlots<T, 'leading' | 'label' | 'trailing', { index: number; active?: boolean }>;

</script>

<script setup lang="ts" generic="T extends PBreadcrumbItem">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { getProp } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = withDefaults(
  defineProps<PBreadcrumbProps<T>>(),
  {
    as: 'nav',
    labelKey: 'label',
  },
);
const slots = defineSlots<PBreadcrumbSlots<T>>();

const { dir } = useLocale();
const appConfig = useAppConfig() as Breadcrumb['AppConfig'];
const pohonProp = useComponentPohon('breadcrumb', props);

const separatorIcon = computed(() =>
  props.separatorIcon
  || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight),
);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.breadcrumb || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    aria-label="breadcrumb"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="breadcrumb-root"
  >
    <ol
      :class="pohon.list({ class: pohonProp?.list })"
      data-pohon="breadcrumb-list"
    >
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <li
          :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item] })"
          data-pohon="breadcrumb-item"
        >
          <PLink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(item)"
            custom
          >
            <PLinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="(item.active ?? active) && (index === items!.length - 1) ? 'page' : undefined"
              :class="pohon.link({
                class: [pohonProp?.link, item.pohon?.link, item.class],
                active: item.active ?? (index === items!.length - 1),
                disabled: !!item.disabled,
                to: !!item.to,
              })"
              data-pohon="breadcrumb-link"
            >
              <slot
                :name="((item.slot || 'item') as keyof PBreadcrumbSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
                :active="item.active ?? (index === items!.length - 1)"
                :index="index"
                :pohon="pohon"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PBreadcrumbSlots<T>)"
                  :item="(item as Extract<T, { slot: string; }>)"
                  :active="item.active ?? (index === items!.length - 1)"
                  :index="index"
                  :pohon="pohon"
                >
                  <PIcon
                    v-if="item.icon"
                    :name="item.icon"
                    :class="pohon.linkLeadingIcon({
                      class: [pohonProp?.linkLeadingIcon, item.pohon?.linkLeadingIcon],
                      active: item.active ?? (index === items!.length - 1),
                    })"
                    data-pohon="breadcrumb-link-leading-icon"
                  />
                  <PAvatar
                    v-else-if="item.avatar"
                    :size="((pohonProp?.linkLeadingAvatarSize || pohon.linkLeadingAvatarSize()) as PAvatarProps['size'])"
                    v-bind="item.avatar"
                    :class="pohon.linkLeadingAvatar({
                      class: [pohonProp?.linkLeadingAvatar, item.pohon?.linkLeadingAvatar],
                      active: item.active ?? (index === items!.length - 1),
                    })"
                    data-pohon="breadcrumb-link-leading-avatar"
                  />
                </slot>

                <span
                  v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PBreadcrumbSlots<T>]"
                  :class="pohon.linkLabel({ class: [pohonProp?.linkLabel, item.pohon?.linkLabel] })"
                  data-pohon="breadcrumb-link-label"
                >
                  <slot
                    :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof DynamicSlots<T, 'label'>)"
                    :item="(item as Extract<T, { slot: string; }>)"
                    :active="item.active ?? (index === items!.length - 1)"
                    :index="index"
                  >
                    {{ getProp({ object: item, path: props.labelKey as string }) }}
                  </slot>
                </span>

                <slot
                  :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof DynamicSlots<T, 'trailing'>)"
                  :item="(item as Extract<T, { slot: string; }>)"
                  :active="item.active ?? (index === items!.length - 1)"
                  :index="index"
                />
              </slot>
            </PLinkBase>
          </PLink>
        </li>

        <li
          v-if="index < items!.length - 1"
          role="presentation"
          aria-hidden="true"
          :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator] })"
          data-pohon="breadcrumb-separator"
        >
          <slot
            name="separator"
            :pohon="pohon"
          >
            <PIcon
              :name="separatorIcon"
              :class="pohon.separatorIcon({ class: [pohonProp?.separatorIcon, item.pohon?.separatorIcon] })"
              data-pohon="breadcrumb-separator-icon"
            />
          </slot>
        </li>
      </template>
    </ol>
  </APrimitive>
</template>
