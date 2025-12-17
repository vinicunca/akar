<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootProps, ANavigationMenuRootProps } from 'akar';
import type {
  PAvatarProps,
  PBadgeProps,
  PDropdownMenuItem,
  PDropdownMenuProps,
  PIconProps,
  PLinkProps,
  PTooltipProps,
} from '../types';
import type { ArrayOrNested, DynamicSlots, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-menu';

type DashboardMenu = ComponentConfig<typeof theme, AppConfig, 'dashboardMenu'>;

export interface PDashboardMenuChildItem extends Omit<PDashboardMenuItem, 'type'> {
}

export interface PDashboardMenuItem extends Omit<PLinkProps, 'type' | 'raw' | 'custom'> {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  badge?: string | number | PBadgeProps;
  /**
   * Display a tooltip on the item when the menu is collapsed with the label of the item.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | PTooltipProps;
  /**
   * Display a dropdown on the item when the menu is collapsed with the children list.
   * This has priority over the global `dropdown` prop.
   */
  dropdown?: boolean | PDropdownMenuProps;
  color?: PDropdownMenuItem['color'];
  /**
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  /**
   * The type of the item.
   * The `label` type is only displayed in `vertical` orientation.
   * The `trigger` type is used to force the item to be collapsible when its a link in `vertical` orientation.
   * @defaultValue 'link'
   */
  type?: 'label' | 'trigger' | 'link';
  slot?: string;
  /**
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with akar.
   * @defaultValue `item-${index}`
   */
  value?: string;
  children?: Array<PDashboardMenuChildItem>;
  defaultOpen?: boolean;
  open?: boolean;
  onSelect?: (event: Event) => void;
  class?: any;
  pohon?: Pick<DashboardMenu['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>;
  [key: string]: any;
}

type SingleOrMultipleType = 'single' | 'multiple';

type DashboardMenuModelValue<
  K extends SingleOrMultipleType = SingleOrMultipleType,
> = K extends 'single' ? string : K extends 'multiple' ? Array<string> : string | Array<string>;

export interface PDashboardMenuProps<
  T extends ArrayOrNested<PDashboardMenuItem> = ArrayOrNested<PDashboardMenuItem>,
  K extends SingleOrMultipleType = SingleOrMultipleType,
> extends Pick<ANavigationMenuRootProps, 'unmountOnHide'>, Pick<AAccordionRootProps, 'disabled' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   * @defaultValue 'multiple'
   */
  type?: K;
  /**
   * The controlled value of the active item(s).
   * - In horizontal orientation: always `string`
   * - In vertical orientation with `type="single"`: `string`
   * - In vertical orientation with `type="multiple"`: `string[]`
   *
   * Use this when you need to control the state of the items. Can be binded with `v-model`
   */
  modelValue?: DashboardMenuModelValue<K>;
  /**
   * The default active value of the item(s).
   * - In horizontal orientation: always `string`
   * - In vertical orientation with `type="single"`: `string`
   * - In vertical orientation with `type="multiple"`: `string[]`
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: DashboardMenuModelValue<K>;
  /**
   * The icon displayed to open the menu.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @defaultValue appConfig.pohon.icons.external
   * @IconifyIcon
   */
  externalIcon?: boolean | PIconProps['name'];
  items?: T;
  /**
   * @defaultValue 'primary'
   */
  color?: DashboardMenu['variants']['color'];
  /**
   * @defaultValue 'pill'
   */
  variant?: DashboardMenu['variants']['variant'];
  /**
   * Collapse the navigation menu to only show icons.
   * @defaultValue false
   */
  collapsed?: boolean;
  /**
   * Display a tooltip on the items when the menu is collapsed with the label of the item.
   * `{ delayDuration: 0, content: { side: 'right' } }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | PTooltipProps;
  /**
   * Display a dropdown on the items when the menu is collapsed with the children list.
   * `{ content: { side: 'right', align: 'start', alignOffset: 2 } }`{lang="ts-type"}
   * @defaultValue false
   */
  dropdown?: boolean | PDropdownMenuProps;
  /** Display a line next to the active item. */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: DashboardMenu['variants']['highlightColor'];
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: DashboardMenu['slots'];
}

export type PDashboardMenuEmits<
  K extends SingleOrMultipleType = SingleOrMultipleType,
> = {
  /**
   * Event handler called when the value changes.
   * - With `type="single"`: emits `string | undefined`
   * - With `type="multiple"`: emits `string[] | undefined`
   */
  'update:modelValue': [value: DashboardMenuModelValue<K> | undefined];
};

type SlotProps<T extends PDashboardMenuItem> = (props: { item: T; index: number; active?: boolean; pohon: DashboardMenu['pohon'] }) => any;

export type PDashboardMenuSlots<
  A extends ArrayOrNested<PDashboardMenuItem> = ArrayOrNested<PDashboardMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; index: number; active?: boolean }) => any;
  'item-trailing': SlotProps<T>;
  'item-content': SlotProps<T> & { close?: () => void };
  'list-leading': (props?: object) => any;
  'list-trailing': (props?: object) => any;
}
& DynamicSlots<MergeTypes<T>, 'label', { index: number; active?: boolean; pohon: DashboardMenu['pohon'] }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing' | 'content', { index: number; active?: boolean; pohon: DashboardMenu['pohon'] }>;
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PDashboardMenuItem>, K extends SingleOrMultipleType = SingleOrMultipleType">
import { useAppConfig, useRoute } from '#imports';
import { isBoolean, isNumber, isString, reduce } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  AAccordionContent,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuRoot,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { getProp, isArrayOfArray } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PBadge from './badge.vue';
import PDropdownMenu from './dropdown-menu.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';
import PTooltip from './tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PDashboardMenuProps<T, K>>(),
  {
    externalIcon: true,
    type: 'multiple' as never,
    collapsible: true,
    unmountOnHide: true,
    labelKey: 'label',
    tooltip: true,
    dropdown: true,
  },
);

const emits = defineEmits<PDashboardMenuEmits<K>>();
const slots = defineSlots<PDashboardMenuSlots<T>>();

const appConfig = useAppConfig() as DashboardMenu['AppConfig'];

const rootProps = useForwardPropsEmits(
  computed(() => ({
    as: props.as,
    unmountOnHide: props.unmountOnHide,
  })),
  emits,
);
const accordionProps = useForwardPropsEmits(
  reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'),
  emits,
);

const tooltipProps = toRef(() => defu(
  isBoolean(props.tooltip)
    ? {}
    : props.tooltip,
  { delayDuration: 0, content: { side: 'right' } },
) as PTooltipProps);

const dropdownProps = toRef(() => defu(
  isBoolean(props.dropdown)
    ? {}
    : props.dropdown,
  { content: { side: 'right', align: 'start', alignOffset: 2 } },
) as PDropdownMenuProps);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardMenu || {}),
  })({
    collapsed: props.collapsed,
    color: props.color,
    variant: props.variant,
    highlight: props.highlight,
    highlightColor: props.highlightColor || props.color,
  }),
);

const lists = computed<Array<Array<PDashboardMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

const route = useRoute();

function getAccordionDefaultValue(list: Array<PDashboardMenuItem>, level = 0) {
  const indexes = reduce<PDashboardMenuItem, Array<string>>(
    list,
    (acc, item, index) => {
      if (isRouteInTree(item, route.path)) {
        acc.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`));
      }

      return acc;
    },
    [],
  );

  return props.type === 'single' ? indexes[0] : indexes;
}

function isRouteInTree(item: PDashboardMenuItem, routePath: string): boolean {
  if (item.children?.length) {
    return item.children.some((child) => isRouteInTree(child, routePath));
  }
  return routePath === item.to;
}

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{
  item: PDashboardMenuItem;
  index: number;
  active?: boolean;
}>();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{
  item: PDashboardMenuItem;
  index: number;
  level?: number;
}>({
  props: {
    item: Object,
    index: Number,
    level: Number,
  },
});
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof PDashboardMenuSlots<T>)"
      :item="item"
      :index="index"
      :active="active"
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PDashboardMenuSlots<T>)"
        :item="item"
        :active="active"
        :index="index"
        :pohon="pohon"
      >
        <PAvatar
          v-if="item.avatar"
          :size="((item.pohon?.linkLeadingAvatarSize || props.pohon?.linkLeadingAvatarSize || pohon.linkLeadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="item.avatar"
          :class="pohon.linkLeadingAvatar({
            class: [props.pohon?.linkLeadingAvatar, item.pohon?.linkLeadingAvatar],
            active,
            disabled: !!item.disabled,
          })"
          data-pohon="dashboard-menu-link-leading-avatar"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          :class="pohon.linkLeadingIcon({
            class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon],
            active,
            disabled: !!item.disabled,
          })"
          data-pohon="dashboard-menu-link-leading-icon"
        />
      </slot>

      <span
        v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PDashboardMenuSlots<T>]"
        :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.pohon?.linkLabel] })"
        data-pohon="dashboard-menu-link-label"
      >
        <slot
          :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PDashboardMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
        >
          {{ getProp({ object: item, path: props.labelKey as string }) }}
        </slot>

        <PIcon
          v-if="item.target === '_blank' && externalIcon !== false"
          :name="isString(externalIcon) ? externalIcon : appConfig.pohon.icons.external"
          :class="pohon.linkLabelExternalIcon({
            class: [props.pohon?.linkLabelExternalIcon, item.pohon?.linkLabelExternalIcon],
            active,
          })"
          data-pohon="dashboard-menu-link-label-external-icon"
        />
      </span>

      <component
        :is="item.children?.length && !collapsed ? AAccordionTrigger : 'span'"
        v-if="(item.badge || item.badge === 0)
          || item.children?.length
          || item.trailingIcon
          || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PDashboardMenuSlots<T>]"
        as="span"
        :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, item.pohon?.linkTrailing] })"
        data-pohon="dashboard-menu-link-trailing"
        @click.stop.prevent
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PDashboardMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
          :pohon="pohon"
        >
          <PBadge
            v-if="item.badge || item.badge === 0"
            color="neutral"
            variant="outline"
            :size="((item.pohon?.linkTrailingBadgeSize || props.pohon?.linkTrailingBadgeSize || pohon.linkTrailingBadgeSize()) as PBadgeProps['size'])"
            v-bind="(isString(item.badge) || isNumber(item.badge)) ? { label: item.badge } : item.badge"
            :class="pohon.linkTrailingBadge({ class: [props.pohon?.linkTrailingBadge, item.pohon?.linkTrailingBadge] })"
            data-pohon="dashboard-menu-link-trailing-badge"
          />

          <PIcon
            v-if="item.children?.length"
            :name="item.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
            :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon], active })"
            data-pohon="dashboard-menu-link-trailing-icon"
          />
          <PIcon
            v-else-if="item.trailingIcon"
            :name="item.trailingIcon"
            :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon], active })"
            data-pohon="dashboard-menu-link-trailing-icon"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="!collapsed ? AAccordionItem : ANavigationMenuItem"
      as="li"
      :value="item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div
        v-if="item.type === 'label' && !collapsed"
        :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label, item.class] })"
        data-pohon="dashboard-menu-label"
      >
        <ReuseLinkTemplate
          :item="item"
          :index="index"
        />
      </div>

      <PLink
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="(item.children?.length && !collapsed && item.type === 'trigger') ? {} : pickLinkProps(item as Omit<PDashboardMenuItem, 'type'>)"
        custom
      >
        <component
          :is="((item.children?.length && !collapsed && !(slotProps as any).href) ? AAccordionTrigger : ANavigationMenuLink)"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <PDropdownMenu
            v-if="collapsed && item.children?.length"
            :items="[
              [
                {
                  label: getProp({ object: item, path: props.labelKey as string }),
                  type: 'label',
                },
              ],
              item.children,
            ]"
            :modal="false"
            v-bind="{ ...dropdownProps }"
          >
            <button
              :class="pohon.link({
                class: [props.pohon?.link, item.pohon?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0,
              })"
              data-pohon="dashboard-menu-link"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </button>
          </PDropdownMenu>

          <PTooltip
            v-else-if="collapsed && (!!props.tooltip || !!item.tooltip)"
            :text="getProp({ object: item, path: props.labelKey as string })"
            v-bind="{ ...tooltipProps, ...(isBoolean(item.tooltip) ? {} : item.tooltip || {}) }"
          >
            <PLinkBase
              v-bind="slotProps"
              :class="pohon.link({
                class: [props.pohon?.link, item.pohon?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0,
              })"
              data-pohon="dashboard-menu-link"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </PLinkBase>
          </PTooltip>

          <PLinkBase
            v-else
            v-bind="slotProps"
            :class="pohon.link({
              class: [props.pohon?.link, item.pohon?.link, item.class],
              active: active || item.active,
              disabled: !!item.disabled,
              level: level > 0,
            })"
            data-pohon="dashboard-menu-link"
          >
            <ReuseLinkTemplate
              :item="item"
              :active="active || item.active"
              :index="index"
            />
          </PLinkBase>
        </component>
      </PLink>

      <AAccordionContent
        v-if="item.children?.length && !collapsed"
        :class="pohon.content({ class: [props.pohon?.content, item.pohon?.content] })"
        data-pohon="dashboard-menu-accordion-content"
      >
        <AAccordionRoot
          v-bind="({
            ...accordionProps,
            defaultValue: getAccordionDefaultValue(item.children, level + 1),
          } as AAccordionRootProps)"
          as="ul"
          :class="pohon.childList({ class: props.pohon?.childList })"
          data-pohon="dashboard-menu-child-list"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="pohon.childItem({ class: [props.pohon?.childItem, childItem.pohon?.childItem] })"
            data-pohon="dashboard-menu-child-item"
          />
        </AAccordionRoot>
      </AAccordionContent>
    </component>
  </DefineItemTemplate>

  <ANavigationMenuRoot
    v-bind="{
      ...rootProps,
      ...$attrs,
    }"
    :data-collapsed="collapsed"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="dashboard-menu-root"
  >
    <slot name="list-leading" />

    <template
      v-for="(list, listIndex) in lists"
      :key="`list-${listIndex}`"
    >
      <AAccordionRoot
        v-bind="!collapsed ? {
          ...accordionProps,
          modelValue,
          defaultValue: defaultValue ?? getAccordionDefaultValue(list),
        } : {}"
        as="ul"
        :class="pohon.list({ class: props.pohon?.list })"
        data-pohon="dashboard-menu-list"
      >
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :class="pohon.item({ class: [props.pohon?.item, item.pohon?.item] })"
          data-pohon="dashboard-menu-item"
        />
      </AAccordionRoot>

      <div
        v-if="listIndex < lists.length - 1"
        :class="pohon.separator({ class: props.pohon?.separator })"
        data-pohon="dashboard-menu-separator"
      />
    </template>

    <slot name="list-trailing" />
  </ANavigationMenuRoot>
</template>
