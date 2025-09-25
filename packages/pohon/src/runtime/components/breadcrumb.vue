<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps } from 'akar';
import type { IconProps, PLinkProps, PAvatarProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/breadcrumb';

type Breadcrumb = ComponentConfig<typeof theme, AppConfig, 'breadcrumb'>;

export interface PBreadcrumbItem extends Omit<PLinkProps, 'raw' | 'custom'> {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
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
  as?: APrimitiveProps['as'];
  items?: Array<T>;
  /**
   * The icon to use as a separator.
   * @defaultValue appConfig.pohon.icons.chevronRight
   * @IconifyIcon
   */
  separatorIcon?: IconProps['name'];
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: Breadcrumb['slots'];
}

type SlotProps<T extends PBreadcrumbItem> = (props: { item: T; index: number; active?: boolean }) => any;

export type PBreadcrumbSlots<T extends PBreadcrumbItem = PBreadcrumbItem> = {
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': SlotProps<T>;
  'item-trailing': SlotProps<T>;
  'separator': any;
} & DynamicSlots<T, 'leading' | 'label' | 'trailing', { index: number; active?: boolean }>;

</script>

<script setup lang="ts" generic="T extends PBreadcrumbItem">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
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
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <ol :class="pohon.list({ class: props.pohon?.list })">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <li :class="pohon.item({ class: [props.pohon?.item, item.pohon?.item] })">
          <PLink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(item)"
            custom
          >
            <PLinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="active && (index === items!.length - 1) ? 'page' : undefined"
              :class="pohon.link({
                class: [props.pohon?.link, item.pohon?.link, item.class],
                active: index === items!.length - 1,
                disabled: !!item.disabled,
                to: !!item.to,
              })"
            >
              <slot
                :name="((item.slot || 'item') as keyof PBreadcrumbSlots<T>)"
                :item="item"
                :index="index"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PBreadcrumbSlots<T>)"
                  :item="item"
                  :active="index === items!.length - 1"
                  :index="index"
                >
                  <PIcon
                    v-if="item.icon"
                    :name="item.icon"
                    :class="pohon.linkLeadingIcon({
                      class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon],
                      active: index === items!.length - 1,
                    })"
                  />
                  <PAvatar
                    v-else-if="item.avatar"
                    :size="((props.pohon?.linkLeadingAvatarSize || pohon.linkLeadingAvatarSize()) as PAvatarProps['size'])"
                    v-bind="item.avatar"
                    :class="pohon.linkLeadingAvatar({
                      class: [props.pohon?.linkLeadingAvatar, item.pohon?.linkLeadingAvatar],
                      active: index === items!.length - 1,
                    })"
                  />
                </slot>

                <span
                  v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PBreadcrumbSlots<T>]"
                  :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.pohon?.linkLabel] })"
                >
                  <slot
                    :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PBreadcrumbSlots<T>)"
                    :item="item"
                    :active="index === items!.length - 1"
                    :index="index"
                  >
                    {{ getProp({ object: item, path: props.labelKey as string }) }}
                  </slot>
                </span>

                <slot
                  :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PBreadcrumbSlots<T>)"
                  :item="item"
                  :active="index === items!.length - 1"
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
          :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator] })"
        >
          <slot name="separator">
            <PIcon
              :name="separatorIcon"
              :class="pohon.separatorIcon({ class: [props.pohon?.separatorIcon, item.pohon?.separatorIcon] })"
            />
          </slot>
        </li>
      </template>
    </ol>
  </APrimitive>
</template>
