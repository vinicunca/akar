<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AAccordionRootProps,
  ANavigationMenuContentEmits,
  ANavigationMenuContentProps,
  ANavigationMenuRootEmits,
  ANavigationMenuRootProps,
} from 'akar';
import type { PAvatarProps, PBadgeProps, PIconProps, PLinkProps, PPopoverProps, PTooltipProps } from '../types';
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/navigation-menu';

type NavigationMenu = ComponentConfig<typeof theme, AppConfig, 'navigationMenu'>;

export interface PNavigationMenuChildItem extends Omit<PNavigationMenuItem, 'type' | 'pohon'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string;
  [key: string]: any;
}

export interface PNavigationMenuItem extends Omit<PLinkProps, 'type' | 'raw' | 'custom'> {
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
   * Display a popover on the item when the menu is collapsed with the children list.
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | PPopoverProps;
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
  children?: Array<PNavigationMenuChildItem>;
  defaultOpen?: boolean;
  open?: boolean;
  onSelect?: (event: Event) => void;
  class?: any;
  pohon?: Pick<NavigationMenu['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>;
  [key: string]: any;
}

export interface PNavigationMenuProps<T extends ArrayOrNested<PNavigationMenuItem> = ArrayOrNested<PNavigationMenuItem>> extends Pick<ANavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AAccordionRootProps, 'disabled' | 'type' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
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
  color?: NavigationMenu['variants']['color'];
  /**
   * @defaultValue 'pill'
   */
  variant?: NavigationMenu['variants']['variant'];
  /**
   * The orientation of the menu.
   * @defaultValue 'horizontal'
   */
  orientation?: ANavigationMenuRootProps['orientation'];
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
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
   * Display a popover on the items when the menu is collapsed with the children list.
   * `{ mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }`{lang="ts-type"}
   * @defaultValue false
   */
  popover?: boolean | PPopoverProps;
  /** Display a line next to the active item. */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: NavigationMenu['variants']['highlightColor'];
  /** The content of the menu. */
  content?: Omit<ANavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ANavigationMenuContentEmits>>;
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @defaultValue 'horizontal'
   */
  contentOrientation?: NavigationMenu['variants']['contentOrientation'];
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean;
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  scrollToActive?: boolean;
  class?: any;
  pohon?: NavigationMenu['slots'];
}

export interface PNavigationMenuEmits extends ANavigationMenuRootEmits {}

type SlotProps<T extends PNavigationMenuItem> = (props: { item: T; index: number; active?: boolean; pohon: NavigationMenu['pohon'] }) => any;

export type PNavigationMenuSlots<
  A extends ArrayOrNested<PNavigationMenuItem> = ArrayOrNested<PNavigationMenuItem>,
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
& DynamicSlots<MergeTypes<T>, 'label', { index: number; active?: boolean; pohon: NavigationMenu['pohon'] }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing' | 'content', { index: number; active?: boolean; pohon: NavigationMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PNavigationMenuItem>">
import { useAppConfig } from '#imports';
import { isBoolean, isNumber, isString } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  AAccordionContent,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { getProp, isArrayOfArray } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PBadge from './badge.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';
import PPopover from './popover.vue';
import PTooltip from './tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PNavigationMenuProps<T>>(),
  {
    orientation: 'horizontal',
    contentOrientation: 'horizontal',
    externalIcon: true,
    delayDuration: 0,
    type: 'multiple',
    collapsible: true,
    unmountOnHide: true,
    labelKey: 'label',
  },
);
const emits = defineEmits<PNavigationMenuEmits>();
const slots = defineSlots<PNavigationMenuSlots<T>>();

const appConfig = useAppConfig() as NavigationMenu['AppConfig'];

const rootProps = useForwardPropsEmits(
  computed(() => ({
    as: props.as,
    modelValue: props.modelValue,
    defaultValue: props.defaultValue,
    delayDuration: props.delayDuration,
    skipDelayDuration: props.skipDelayDuration,
    orientation: props.orientation,
    disableClickTrigger: props.disableClickTrigger,
    disableHoverTrigger: props.disableHoverTrigger,
    disablePointerLeaveClose: props.disablePointerLeaveClose,
    unmountOnHide: props.unmountOnHide,
  })),
  emits,
);
const accordionProps = useForwardPropsEmits(
  reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'),
  emits,
);
const contentProps = toRef(() => props.content);
const tooltipProps = toRef(() => defu(
  isBoolean(props.tooltip)
    ? {}
    : props.tooltip,
  { delayDuration: 0, content: { side: 'right' } },
) as PTooltipProps);
const popoverProps = toRef(() => defu(
  isBoolean(props.popover)
    ? {}
    : props.popover,
  { mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } },
) as PPopoverProps);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: PNavigationMenuItem; index: number; active?: boolean }>();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: PNavigationMenuItem; index: number; level?: number }>({
  props: {
    item: Object,
    index: Number,
    level: Number,
  },
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.navigationMenu || {}),
  })({
    orientation: props.orientation,
    contentOrientation: props.orientation === 'vertical' ? undefined : props.contentOrientation,
    collapsed: props.collapsed,
    color: props.color,
    variant: props.variant,
    highlight: props.highlight,
    highlightColor: props.highlightColor || props.color,
  }),
);

const lists = computed<Array<Array<PNavigationMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

function getAccordionDefaultValue(list: Array<PNavigationMenuItem>, level = 0) {
  const indexes = list.reduce((acc: Array<string>, item, index) => {
    if (item.defaultOpen || item.open) {
      acc.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`));
    }
    return acc;
  }, []);

  return props.type === 'single' ? indexes[0] : indexes;
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof PNavigationMenuSlots<T>)"
      :item="item"
      :index="index"
      :active="active"
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PNavigationMenuSlots<T>)"
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
          data-pohon="navigation-menu-link-leading-avatar"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          :class="pohon.linkLeadingIcon({
            class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon],
            active,
            disabled: !!item.disabled,
          })"
          data-pohon="navigation-menu-link-leading-icon"
        />
      </slot>

      <span
        v-if="(!collapsed || orientation !== 'vertical') && (getProp({ object: item, path: props.labelKey as string }) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PNavigationMenuSlots<T>])"
        :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.pohon?.linkLabel] })"
        data-pohon="navigation-menu-link-label"
      >
        <slot
          :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PNavigationMenuSlots<T>)"
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
          data-pohon="navigation-menu-link-label-external-icon"
        />
      </span>

      <component
        :is="orientation === 'vertical' && item.children?.length && !collapsed ? AAccordionTrigger : 'span'"
        v-if="(!collapsed || orientation !== 'vertical')
          && (
            (item.badge || item.badge === 0)
            || (
              orientation === 'horizontal'
              && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof PNavigationMenuSlots<T>])
            )
            || (orientation === 'vertical' && item.children?.length)
            || item.trailingIcon
            || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PNavigationMenuSlots<T>]
          )"
        as="span"
        :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, item.pohon?.linkTrailing] })"
        data-pohon="navigation-menu-link-trailing"
        @click.stop.prevent
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PNavigationMenuSlots<T>)"
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
            data-pohon="navigation-menu-link-trailing-badge"
          />

          <PIcon
            v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof PNavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)"
            :name="item.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
            :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon], active })"
            data-pohon="navigation-menu-link-trailing-icon"
          />
          <PIcon
            v-else-if="item.trailingIcon"
            :name="item.trailingIcon"
            :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon], active })"
            data-pohon="navigation-menu-link-trailing-icon"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(orientation === 'vertical' && !collapsed) ? AAccordionItem : ANavigationMenuItem"
      as="li"
      :value="item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div
        v-if="orientation === 'vertical' && item.type === 'label' && !collapsed"
        :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label, item.class] })"
        data-pohon="navigation-menu-label"
      >
        <ReuseLinkTemplate
          :item="item"
          :index="index"
        />
      </div>

      <PLink
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="(orientation === 'vertical' && item.children?.length && !collapsed && item.type === 'trigger') ? {} : pickLinkProps(item as Omit<PNavigationMenuItem, 'type'>)"
        custom
      >
        <component
          :is="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof PNavigationMenuSlots<T>])) ? ANavigationMenuTrigger : ((orientation === 'vertical' && item.children?.length && !collapsed && !(slotProps as any).href) ? AAccordionTrigger : ANavigationMenuLink)"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <PPopover
            v-if="orientation === 'vertical' && collapsed && item.children?.length && (!!props.popover || !!item.popover)"
            v-bind="{ ...popoverProps, ...(isBoolean(item.popover) ? {} : item.popover || {}) }"
            :pohon="{ content: pohon.content({ class: [props.pohon?.content, item.pohon?.content] }) }"
          >
            <PLinkBase
              v-bind="slotProps"
              :class="pohon.link({
                class: [props.pohon?.link, item.pohon?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0,
              })"
              data-pohon="navigation-menu-link"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </PLinkBase>

            <template #content="{ close }">
              <slot
                :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof PNavigationMenuSlots<T>)"
                :item="item"
                :active="active || item.active"
                :index="index"
                :pohon="pohon"
                :close="close"
              >
                <ul
                  :class="pohon.childList({ class: [props.pohon?.childList, item.pohon?.childList] })"
                  data-pohon="navigation-menu-child-list"
                >
                  <li
                    :class="pohon.childLabel({ class: [props.pohon?.childLabel, item.pohon?.childLabel] })"
                    data-pohon="navigation-menu-child-label"
                  >
                    {{ getProp({ object: item, path: props.labelKey as string }) }}
                  </li>
                  <li
                    v-for="(childItem, childIndex) in item.children"
                    :key="childIndex"
                    :class="pohon.childItem({ class: [props.pohon?.childItem, item.pohon?.childItem] })"
                    data-pohon="navigation-menu-child-item"
                  >
                    <PLink
                      v-slot="{ active: childActive, ...childSlotProps }"
                      v-bind="pickLinkProps(childItem)"
                      custom
                    >
                      <ANavigationMenuLink
                        as-child
                        :active="childActive"
                        @select="childItem.onSelect"
                      >
                        <PLinkBase
                          v-bind="childSlotProps"
                          :class="pohon.childLink({
                            class: [props.pohon?.childLink, item.pohon?.childLink, childItem.class],
                            active: childActive,
                          })"
                          data-pohon="navigation-menu-child-link"
                        >
                          <PIcon
                            v-if="childItem.icon"
                            :name="childItem.icon"
                            :class="pohon.childLinkIcon({
                              class: [props.pohon?.childLinkIcon, item.pohon?.childLinkIcon],
                              active: childActive,
                            })"
                            data-pohon="navigation-menu-child-link-icon"
                          />

                          <span
                            :class="pohon.childLinkLabel({
                              class: [props.pohon?.childLinkLabel, item.pohon?.childLinkLabel],
                              active: childActive,
                            })"
                            data-pohon="navigation-menu-child-link-label"
                          >
                            {{ getProp({ object: childItem, path: props.labelKey as string }) }}

                            <PIcon
                              v-if="childItem.target === '_blank' && externalIcon !== false"
                              :name="isString(externalIcon) ? externalIcon : appConfig.pohon.icons.external"
                              :class="pohon.childLinkLabelExternalIcon({
                                class: [props.pohon?.childLinkLabelExternalIcon, item.pohon?.childLinkLabelExternalIcon],
                                active: childActive,
                              })"
                              data-pohon="navigation-menu-child-link-label-external-icon"
                            />
                          </span>
                        </PLinkBase>
                      </ANavigationMenuLink>
                    </PLink>
                  </li>
                </ul>
              </slot>
            </template>
          </PPopover>

          <PTooltip
            v-else-if="orientation === 'vertical' && collapsed && (!!props.tooltip || !!item.tooltip)"
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
              data-pohon="navigation-menu-link"
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
              level: orientation === 'horizontal' || level > 0,
            })"
            data-pohon="navigation-menu-link"
          >
            <ReuseLinkTemplate
              :item="item"
              :active="active || item.active"
              :index="index"
            />
          </PLinkBase>
        </component>

        <ANavigationMenuContent
          v-if="orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof PNavigationMenuSlots<T>])"
          v-bind="contentProps"
          :class="pohon.content({ class: [props.pohon?.content, item.pohon?.content] })"
          data-pohon="navigation-menu-accordion-content"
        >
          <slot
            :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof PNavigationMenuSlots<T>)"
            :item="item"
            :active="active || item.active"
            :index="index"
            :pohon="pohon"
          >
            <ul
              :class="pohon.childList({ class: [props.pohon?.childList, item.pohon?.childList] })"
              data-pohon="navigation-menu-child-list"
            >
              <li
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :class="pohon.childItem({ class: [props.pohon?.childItem, item.pohon?.childItem] })"
                data-pohon="navigation-menu-child-item"
              >
                <PLink
                  v-slot="{ active: childActive, ...childSlotProps }"
                  v-bind="pickLinkProps(childItem)"
                  custom
                >
                  <ANavigationMenuLink
                    as-child
                    :active="childActive"
                    @select="childItem.onSelect"
                  >
                    <PLinkBase
                      v-bind="childSlotProps"
                      :class="pohon.childLink({
                        class: [props.pohon?.childLink, item.pohon?.childLink, childItem.class],
                        active: childActive,
                      })"
                      data-pohon="navigation-menu-child-link"
                    >
                      <PIcon
                        v-if="childItem.icon"
                        :name="childItem.icon"
                        :class="pohon.childLinkIcon({
                          class: [props.pohon?.childLinkIcon, item.pohon?.childLinkIcon],
                          active: childActive,
                        })"
                        data-pohon="navigation-menu-child-link-icon"
                      />

                      <div
                        :class="pohon.childLinkWrapper({ class: [props.pohon?.childLinkWrapper, item.pohon?.childLinkWrapper] })"
                        data-pohon="navigation-menu-child-link-wrapper"
                      >
                        <p
                          :class="pohon.childLinkLabel({
                            class: [props.pohon?.childLinkLabel, item.pohon?.childLinkLabel],
                            active: childActive,
                          })"
                          data-pohon="navigation-menu-child-link-label"
                        >
                          {{ getProp({ object: childItem, path: props.labelKey as string }) }}

                          <PIcon
                            v-if="childItem.target === '_blank' && externalIcon !== false"
                            :name="isString(externalIcon) ? externalIcon : appConfig.pohon.icons.external"
                            :class="pohon.childLinkLabelExternalIcon({
                              class: [props.pohon?.childLinkLabelExternalIcon, item.pohon?.childLinkLabelExternalIcon],
                              active: childActive,
                            })"
                            data-pohon="navigation-menu-child-link-label-external-icon"
                          />
                        </p>
                        <p
                          v-if="childItem.description"
                          :class="pohon.childLinkDescription({
                            class: [props.pohon?.childLinkDescription, item.pohon?.childLinkDescription],
                            active: childActive,
                          })"
                          data-pohon="navigation-menu-child-link-description"
                        >
                          {{ childItem.description }}
                        </p>
                      </div>
                    </PLinkBase>
                  </ANavigationMenuLink>
                </PLink>
              </li>
            </ul>
          </slot>
        </ANavigationMenuContent>
      </PLink>

      <AAccordionContent
        v-if="orientation === 'vertical' && item.children?.length && !collapsed"
        :class="pohon.content({ class: [props.pohon?.content, item.pohon?.content] })"
        data-pohon="navigation-menu-accordion-content"
      >
        <AAccordionRoot
          v-bind="({
            ...accordionProps,
            defaultValue: getAccordionDefaultValue(item.children, level + 1),
          } as AAccordionRootProps)"
          as="ul"
          :class="pohon.childList({ class: props.pohon?.childList })"
          data-pohon="navigation-menu-child-list"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="pohon.childItem({ class: [props.pohon?.childItem, childItem.pohon?.childItem] })"
            data-pohon="navigation-menu-child-item"
          />
        </AAccordionRoot>
      </AAccordionContent>
    </component>
  </DefineItemTemplate>

  <ANavigationMenuRoot
    v-bind="{ ...rootProps, ...$attrs }"
    :data-collapsed="collapsed"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="navigation-menu-root"
  >
    <slot name="list-leading" />

    <template
      v-for="(list, listIndex) in lists"
      :key="`list-${listIndex}`"
    >
      <component
        v-bind="orientation === 'vertical' && !collapsed ? {
          ...accordionProps,
          defaultValue: getAccordionDefaultValue(list),
        } : {}"
        :is="orientation === 'vertical' && !collapsed ? AAccordionRoot : ANavigationMenuList"
        as="ul"
        :class="pohon.list({ class: props.pohon?.list })"
        data-pohon="navigation-menu-list"
      >
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :class="pohon.item({ class: [props.pohon?.item, item.pohon?.item] })"
          data-pohon="navigation-menu-item"
        />
      </component>

      <div
        v-if="orientation === 'vertical' && listIndex < lists.length - 1"
        :class="pohon.separator({ class: props.pohon?.separator })"
        data-pohon="navigation-menu-separator"
      />
    </template>

    <slot name="list-trailing" />

    <div
      v-if="orientation === 'horizontal'"
      :class="pohon.viewportWrapper({ class: props.pohon?.viewportWrapper })"
      data-pohon="navigation-menu-viewport-wrapper"
    >
      <ANavigationMenuIndicator
        v-if="arrow"
        :class="pohon.indicator({ class: props.pohon?.indicator })"
        data-pohon="navigation-menu-indicator"
      >
        <div
          :class="pohon.arrow({ class: props.pohon?.arrow })"
          data-pohon="navigation-menu-arrow"
        />
      </ANavigationMenuIndicator>

      <ANavigationMenuViewport
        :class="pohon.viewport({ class: props.pohon?.viewport })"
        data-pohon="navigation-menu-viewport"
      />
    </div>
  </ANavigationMenuRoot>
</template>
