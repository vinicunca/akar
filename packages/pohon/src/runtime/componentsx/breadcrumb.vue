<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { AvatarProps, LinkProps, PIconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/breadcrumb';

type Breadcrumb = ComponentConfig<typeof theme, AppConfig, 'breadcrumb'>;

export interface BreadcrumbItem extends Omit<LinkProps, 'raw' | 'custom'> {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: AvatarProps;
  slot?: string;
  class?: any;
  pohon?: Pick<Breadcrumb['slots'], 'item' | 'link' | 'linkLeadingIcon' | 'linkLeadingAvatar' | 'linkLabel' | 'separator' | 'separatorIcon'>;
  [key: string]: any;
}

export interface BreadcrumbProps<T extends BreadcrumbItem = BreadcrumbItem> {
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

type SlotProps<T extends BreadcrumbItem> = (props: { item: T; index: number; active: boolean; pohon: Breadcrumb['pohon'] }) => Array<VNode>;

export type BreadcrumbSlots<T extends BreadcrumbItem = BreadcrumbItem> = {
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; index: number; active: boolean }) => Array<VNode>;
  'item-trailing'?: (props: { item: T; index: number; active: boolean }) => Array<VNode>;
  'separator'?: (props: { pohon: Breadcrumb['pohon'] }) => Array<VNode>;
}
& DynamicSlots<T, 'leading', { index: number; active: boolean; pohon: Breadcrumb['pohon'] }>
& DynamicSlots<T, 'label' | 'trailing', { index: number; active: boolean }>;

</script>

<script setup lang="ts" generic="T extends BreadcrumbItem">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { get } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';
import ULink from './Link.vue';
import ULinkBase from './LinkBase.vue';

const props = withDefaults(defineProps<BreadcrumbProps<T>>(), {
  as: 'nav',
  labelKey: 'label',
});
const slots = defineSlots<BreadcrumbSlots<T>>();

const { dir } = useLocale();
const appConfig = useAppConfig() as Breadcrumb['AppConfig'];
const pohonProp = useComponentPohon('breadcrumb', props);

const separatorIcon = computed(() => props.separatorIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.breadcrumb || {}) })());
</script>

<template>
  <Primitive
    :as="as"
    aria-label="breadcrumb"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <ol
      data-slot="list"
      :class="pohon.list({ class: pohonProp?.list })"
    >
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <li
          data-slot="item"
          :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item] })"
        >
          <ULink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(item)"
            custom
          >
            <ULinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="(item.active ?? active) && (index === items!.length - 1) ? 'page' : undefined"
              data-slot="link"
              :class="pohon.link({ class: [pohonProp?.link, item.pohon?.link, item.class], active: item.active ?? (index === items!.length - 1), disabled: !!item.disabled, to: !!item.to })"
            >
              <slot
                :name="((item.slot || 'item') as keyof BreadcrumbSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
                :active="item.active ?? (index === items!.length - 1)"
                :index="index"
                :pohon="pohon"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof BreadcrumbSlots<T>)"
                  :item="(item as Extract<T, { slot: string; }>)"
                  :active="item.active ?? (index === items!.length - 1)"
                  :index="index"
                  :pohon="pohon"
                >
                  <PIcon
                    v-if="item.icon"
                    :name="item.icon"
                    data-slot="linkLeadingIcon"
                    :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, item.pohon?.linkLeadingIcon], active: item.active ?? (index === items!.length - 1) })"
                  />
                  <PAvatar
                    v-else-if="item.avatar"
                    :size="((pohonProp?.linkLeadingAvatarSize || pohon.linkLeadingAvatarSize()) as AvatarProps['size'])"
                    v-bind="item.avatar"
                    data-slot="linkLeadingAvatar"
                    :class="pohon.linkLeadingAvatar({ class: [pohonProp?.linkLeadingAvatar, item.pohon?.linkLeadingAvatar], active: item.active ?? (index === items!.length - 1) })"
                  />
                </slot>

                <span
                  v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof BreadcrumbSlots<T>]"
                  data-slot="linkLabel"
                  :class="pohon.linkLabel({ class: [pohonProp?.linkLabel, item.pohon?.linkLabel] })"
                >
                  <slot
                    :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof DynamicSlots<T, 'label'>)"
                    :item="(item as Extract<T, { slot: string; }>)"
                    :active="item.active ?? (index === items!.length - 1)"
                    :index="index"
                  >
                    {{ get(item, props.labelKey as string) }}
                  </slot>
                </span>

                <slot
                  :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof DynamicSlots<T, 'trailing'>)"
                  :item="(item as Extract<T, { slot: string; }>)"
                  :active="item.active ?? (index === items!.length - 1)"
                  :index="index"
                />
              </slot>
            </ULinkBase>
          </ULink>
        </li>

        <li
          v-if="index < items!.length - 1"
          role="presentation"
          aria-hidden="true"
          data-slot="separator"
          :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator] })"
        >
          <slot
            name="separator"
            :pohon="pohon"
          >
            <PIcon
              :name="separatorIcon"
              data-slot="separatorIcon"
              :class="pohon.separatorIcon({ class: [pohonProp?.separatorIcon, item.pohon?.separatorIcon] })"
            />
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
