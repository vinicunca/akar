<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootProps, NavigationMenuContentEmits, NavigationMenuContentProps, NavigationMenuRootProps } from 'akar';
import type { VNode } from 'vue';
import type { AAvatarProps, BadgeProps, ChipProps, LinkProps, PIconProps, PopoverProps, TooltipProps } from '../types';
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/navigation-menu';

type NavigationMenu = ComponentConfig<typeof theme, AppConfig, 'navigationMenu'>;

export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'type' | 'pohon'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string;
  [key: string]: any;
}

export interface NavigationMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: AAvatarProps;
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps;
  /**
   * Display a chip around the icon of the item.
   * `{ inset: true }`{lang="ts-type"}
   */
  chip?: boolean | ChipProps;
  /**
   * Display a tooltip on the item with the label of the item.
   * In `vertical` orientation, only works when the menu is `collapsed`.
   * In `horizontal` orientation, works on any item.
   */
  tooltip?: boolean | TooltipProps;
  /**
   * Display a popover on the item when the menu is collapsed with the children list.
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | PopoverProps;
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
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with Reka UI.
   * @defaultValue `item-${index}`, `item-${level}-${index}` for nested children, or `group-${listIndex}-item-${index}` when using grouped items
   */
  value?: string;
  children?: Array<NavigationMenuChildItem>;
  defaultOpen?: boolean;
  open?: boolean;
  onSelect?: (e: Event) => void;
  class?: any;
  pohon?: Pick<NavigationMenu['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLeadingChipSize' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>;
  [key: string]: any;
}

type SingleOrMultipleType = 'single' | 'multiple';
type Orientation = NavigationMenu['variants']['orientation'];

type NavigationMenuModelValue<
  K extends SingleOrMultipleType = SingleOrMultipleType,
  O extends Orientation = Orientation,
> = O extends 'horizontal' ? string : K extends 'single' ? string : K extends 'multiple' ? Array<string> : string | Array<string>;

export interface NavigationMenuProps<
  T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  K extends SingleOrMultipleType = SingleOrMultipleType,
  O extends Orientation = Orientation,
> extends Pick<NavigationMenuRootProps, 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AAccordionRootProps, 'disabled' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   *
   * Only works when `orientation` is `vertical`.
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
  modelValue?: NavigationMenuModelValue<K, O>;
  /**
   * The default active value of the item(s).
   * - In horizontal orientation: always `string`
   * - In vertical orientation with `type="single"`: `string`
   * - In vertical orientation with `type="multiple"`: `string[]`
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: NavigationMenuModelValue<K, O>;
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
  orientation?: O;
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  collapsed?: boolean;
  /**
   * Display a tooltip on the items with the label of the item.
   * Only works when `orientation` is `vertical` and `collapsed` is `true`.
   * `{ delayDuration: 0, content: { side: 'right' } }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | TooltipProps;
  /**
   * Display a popover on the items when the menu is collapsed with the children list.
   * `{ mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }`{lang="ts-type"}
   * @defaultValue false
   */
  popover?: boolean | PopoverProps;
  /** Display a line next to the active item. */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: NavigationMenu['variants']['highlightColor'];
  /** The content of the menu. */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>;
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
   * The key used to get the value from the item.
   * @defaultValue 'value'
   */
  valueKey?: GetItemKeys<T>;
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: NavigationMenu['slots'];
}

export type NavigationMenuEmits<
  K extends SingleOrMultipleType = SingleOrMultipleType,
  O extends Orientation = Orientation,
> = {
  /**
   * Event handler called when the value changes.
   * - In horizontal orientation: emits `string`
   * - In vertical orientation with `type="single"`: emits `string | undefined`
   * - In vertical orientation with `type="multiple"`: emits `string[] | undefined`
   */
  'update:modelValue': [value: NavigationMenuModelValue<K, O> | undefined];
};

type SlotProps<T extends NavigationMenuItem> = (props: { item: T; index: number; active: boolean; pohon: NavigationMenu['pohon'] }) => Array<VNode>;

export type NavigationMenuSlots<
  A extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; index: number; active: boolean }) => Array<VNode>;
  'item-trailing'?: SlotProps<T>;
  'item-content'?: (props: { item: T; index: number; active: boolean; pohon: NavigationMenu['pohon']; close: (() => void) | undefined }) => Array<VNode>;
  'list-leading'?: (props?: {}) => Array<VNode>;
  'list-trailing'?: (props?: {}) => Array<VNode>;
}
& DynamicSlots<MergeTypes<T>, 'label', { index: number; active: boolean; pohon: NavigationMenu['pohon'] }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing' | 'content', { index: number; active: boolean; pohon: NavigationMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>, K extends SingleOrMultipleType = SingleOrMultipleType, O extends Orientation = Orientation">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { AccordionContent, AccordionRoot, AccordionTrigger, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuRoot, NavigationMenuTrigger, NavigationMenuViewport, PAccordionItem, useForwardPropsEmits } from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { get, isArrayOfArray } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import UBadge from './Badge.vue';
import UChip from './Chip.vue';
import PIcon from './icon.vue';
import ULink from './Link.vue';
import ULinkBase from './LinkBase.vue';
import UPopover from './Popover.vue';
import UTooltip from './Tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<NavigationMenuProps<T, K, O>>(), {
  orientation: 'horizontal' as never,
  contentOrientation: 'horizontal',
  externalIcon: true,
  delayDuration: 0,
  type: 'multiple' as never,
  collapsible: true,
  unmountOnHide: true,
  valueKey: 'value',
  labelKey: 'label',
});
const emits = defineEmits<NavigationMenuEmits<K, O>>();
const slots = defineSlots<NavigationMenuSlots<T>>();

const appConfig = useAppConfig() as NavigationMenu['AppConfig'];
const pohonProp = useComponentPohon('navigationMenu', props);

const rootProps = useForwardPropsEmits(computed(() => ({
  as: props.as,
  delayDuration: props.delayDuration,
  skipDelayDuration: props.skipDelayDuration,
  orientation: props.orientation,
  disableClickTrigger: props.disableClickTrigger,
  disableHoverTrigger: props.disableHoverTrigger,
  disablePointerLeaveClose: props.disablePointerLeaveClose,
  unmountOnHide: props.unmountOnHide,
})), emits);
const accordionProps = useForwardPropsEmits(reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'), emits);
const contentProps = toRef(() => props.content);
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { ...(props.orientation === 'vertical' && { delayDuration: 0, content: { side: 'right' } }) }) as TooltipProps);
const popoverProps = toRef(() => defu(typeof props.popover === 'boolean' ? {} : props.popover, { mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }) as PopoverProps);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: NavigationMenuItem; index: number; active?: boolean }>();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: NavigationMenuItem; index: number; level?: number; listIndex?: number }>({
  props: {
    item: Object,
    index: Number,
    level: Number,
    listIndex: Number,
  },
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.navigationMenu || {}) })({
  orientation: props.orientation,
  contentOrientation: props.orientation === 'vertical' ? undefined : props.contentOrientation,
  collapsed: props.collapsed,
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color,
}));

const lists = computed<Array<Array<NavigationMenuItem>>>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

function getItemValue(item: NavigationMenuItem, index: number, level: number, listIndex: number) {
  const prefix = lists.value.length > 1 ? `group-${listIndex}-` : '';
  return get(item, props.valueKey as string) ?? (level > 0 ? `${prefix}item-${level}-${index}` : `${prefix}item-${index}`);
}

function getAccordionDefaultValue(list: Array<NavigationMenuItem>, level = 0, listIndex = 0) {
  const indexes = list.reduce((acc: Array<string>, item, index) => {
    if (item.defaultOpen || item.open) {
      acc.push(getItemValue(item, index, level, listIndex));
    }
    return acc;
  }, []);

  return props.type === 'single' ? indexes[0] : indexes;
}

function onLinkTrailingClick(e: Event, item: NavigationMenuItem) {
  if (!item.children?.length) {
    return;
  }

  if (props.orientation === 'horizontal') {
    e.preventDefault();
  } else if (props.orientation === 'vertical' && !props.collapsed) {
    e.preventDefault();
    e.stopPropagation();
  }
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof NavigationMenuSlots<T>)"
      :item="item"
      :index="index"
      :active="active"
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof NavigationMenuSlots<T>)"
        :item="item"
        :active="active"
        :index="index"
        :pohon="pohon"
      >
        <PAvatar
          v-if="item.avatar"
          :size="((item.pohon?.linkLeadingAvatarSize || pohonProp?.linkLeadingAvatarSize || pohon.linkLeadingAvatarSize()) as AAvatarProps['size'])"
          v-bind="item.avatar"
          data-slot="linkLeadingAvatar"
          :class="pohon.linkLeadingAvatar({ class: [pohonProp?.linkLeadingAvatar, item.pohon?.linkLeadingAvatar], active, disabled: !!item.disabled })"
        />
        <UChip
          v-else-if="item.icon && item.chip"
          :size="((item.pohon?.linkLeadingChipSize || pohonProp?.linkLeadingChipSize || pohon.linkLeadingChipSize()) as ChipProps['size'])"
          inset
          v-bind="typeof item.chip === 'object' ? item.chip : {}"
          data-slot="linkLeadingChip"
        >
          <PIcon
            :name="item.icon"
            data-slot="linkLeadingIcon"
            :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, item.pohon?.linkLeadingIcon], active, disabled: !!item.disabled })"
          />
        </UChip>
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          data-slot="linkLeadingIcon"
          :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, item.pohon?.linkLeadingIcon], active, disabled: !!item.disabled })"
        />
      </slot>

      <span
        v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>]"
        data-slot="linkLabel"
        :class="pohon.linkLabel({ class: [pohonProp?.linkLabel, item.pohon?.linkLabel] })"
      >
        <slot
          :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
        >
          {{ get(item, props.labelKey as string) }}
        </slot>

        <PIcon
          v-if="item.target === '_blank' && externalIcon !== false"
          :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external"
          data-slot="linkLabelExternalIcon"
          :class="pohon.linkLabelExternalIcon({ class: [pohonProp?.linkLabelExternalIcon, item.pohon?.linkLabelExternalIcon], active })"
        />
      </span>

      <component
        :is="orientation === 'vertical' && item.children?.length && !collapsed ? AccordionTrigger : 'span'"
        v-if="(item.badge || item.badge === 0) || (orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>]"
        :as="orientation === 'vertical' && item.children?.length && !collapsed ? 'span' : undefined"
        data-slot="linkTrailing"
        :class="pohon.linkTrailing({ class: [pohonProp?.linkTrailing, item.pohon?.linkTrailing] })"
        @click="(e: Event) => onLinkTrailingClick(e, item)"
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
          :pohon="pohon"
        >
          <UBadge
            v-if="item.badge || item.badge === 0"
            color="neutral"
            variant="outline"
            :size="((item.pohon?.linkTrailingBadgeSize || pohonProp?.linkTrailingBadgeSize || pohon.linkTrailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            data-slot="linkTrailingBadge"
            :class="pohon.linkTrailingBadge({ class: [pohonProp?.linkTrailingBadge, item.pohon?.linkTrailingBadge] })"
          />

          <PIcon
            v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)"
            :name="item.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
            data-slot="linkTrailingIcon"
            :class="pohon.linkTrailingIcon({ class: [pohonProp?.linkTrailingIcon, item.pohon?.linkTrailingIcon], active })"
          />
          <PIcon
            v-else-if="item.trailingIcon"
            :name="item.trailingIcon"
            data-slot="linkTrailingIcon"
            :class="pohon.linkTrailingIcon({ class: [pohonProp?.linkTrailingIcon, item.pohon?.linkTrailingIcon], active })"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0, listIndex = 0 }">
    <component
      :is="(orientation === 'vertical' && !collapsed) ? PAccordionItem : NavigationMenuItem"
      as="li"
      v-bind="(orientation === 'vertical' && !collapsed) ? { disabled: !!item.disabled } : {}"
      :value="getItemValue(item, index, level, listIndex)"
    >
      <div
        v-if="orientation === 'vertical' && item.type === 'label' && !collapsed"
        data-slot="label"
        :class="pohon.label({ class: [pohonProp?.label, item.pohon?.label, item.class] })"
      >
        <ReuseLinkTemplate
          :item="item"
          :index="index"
        />
      </div>
      <ULink
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="(orientation === 'vertical' && item.children?.length && !collapsed && item.type === 'trigger') ? {} : pickLinkProps(item as Omit<NavigationMenuItem, 'type'>)"
        custom
      >
        <component
          :is="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) ? NavigationMenuTrigger : ((orientation === 'vertical' && item.children?.length && !collapsed && !(slotProps as any).href) ? AccordionTrigger : NavigationMenuLink)"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <UPopover
            v-if="orientation === 'vertical' && collapsed && item.children?.length && (!!props.popover || !!item.popover)"
            v-bind="{ ...popoverProps, ...(typeof item.popover === 'boolean' ? {} : item.popover || {}) }"
            :pohon="{ content: pohon.content({ class: [pohonProp?.content, item.pohon?.content] }) }"
          >
            <ULinkBase
              v-bind="slotProps"
              data-slot="link"
              :class="pohon.link({ class: [pohonProp?.link, item.pohon?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </ULinkBase>

            <template #content="{ close }">
              <slot
                :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)"
                :item="item"
                :active="active || item.active"
                :index="index"
                :pohon="pohon"
                :close="close"
              >
                <ul
                  data-slot="childList"
                  :class="pohon.childList({ class: [pohonProp?.childList, item.pohon?.childList] })"
                >
                  <li
                    data-slot="childLabel"
                    :class="pohon.childLabel({ class: [pohonProp?.childLabel, item.pohon?.childLabel] })"
                  >
                    {{ get(item, props.labelKey as string) }}
                  </li>
                  <li
                    v-for="(childItem, childIndex) in item.children"
                    :key="childIndex"
                    data-slot="childItem"
                    :class="pohon.childItem({ class: [pohonProp?.childItem, item.pohon?.childItem] })"
                  >
                    <ULink
                      v-slot="{ active: childActive, ...childSlotProps }"
                      v-bind="pickLinkProps(childItem)"
                      custom
                    >
                      <NavigationMenuLink
                        as-child
                        :active="childActive"
                        @select="childItem.onSelect"
                      >
                        <ULinkBase
                          v-bind="childSlotProps"
                          data-slot="childLink"
                          :class="pohon.childLink({ class: [pohonProp?.childLink, item.pohon?.childLink, childItem.class], active: childActive })"
                        >
                          <PIcon
                            v-if="childItem.icon"
                            :name="childItem.icon"
                            data-slot="childLinkIcon"
                            :class="pohon.childLinkIcon({ class: [pohonProp?.childLinkIcon, item.pohon?.childLinkIcon], active: childActive })"
                          />

                          <span
                            data-slot="childLinkLabel"
                            :class="pohon.childLinkLabel({ class: [pohonProp?.childLinkLabel, item.pohon?.childLinkLabel], active: childActive })"
                          >
                            {{ get(childItem, props.labelKey as string) }}

                            <PIcon
                              v-if="childItem.target === '_blank' && externalIcon !== false"
                              :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external"
                              data-slot="childLinkLabelExternalIcon"
                              :class="pohon.childLinkLabelExternalIcon({ class: [pohonProp?.childLinkLabelExternalIcon, item.pohon?.childLinkLabelExternalIcon], active: childActive })"
                            />
                          </span>
                        </ULinkBase>
                      </NavigationMenuLink>
                    </ULink>
                  </li>
                </ul>
              </slot>
            </template>
          </UPopover>
          <UTooltip
            v-else-if="(orientation === 'vertical' && collapsed && (!!props.tooltip || !!item.tooltip)) || (orientation === 'horizontal' && !!item.tooltip)"
            :text="get(item, props.labelKey as string)"
            v-bind="{ ...tooltipProps, ...(typeof item.tooltip === 'boolean' ? {} : item.tooltip || {}) }"
          >
            <ULinkBase
              v-bind="slotProps"
              data-slot="link"
              :class="pohon.link({ class: [pohonProp?.link, item.pohon?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </ULinkBase>
          </UTooltip>
          <ULinkBase
            v-else
            v-bind="slotProps"
            data-slot="link"
            :class="pohon.link({ class: [pohonProp?.link, item.pohon?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: orientation === 'horizontal' || level > 0 })"
          >
            <ReuseLinkTemplate
              :item="item"
              :active="active || item.active"
              :index="index"
            />
          </ULinkBase>
        </component>

        <NavigationMenuContent
          v-if="orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])"
          v-bind="contentProps"
          data-slot="content"
          :class="pohon.content({ class: [pohonProp?.content, item.pohon?.content] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)"
            :item="item"
            :active="active || item.active"
            :index="index"
            :pohon="pohon"
          >
            <ul
              data-slot="childList"
              :class="pohon.childList({ class: [pohonProp?.childList, item.pohon?.childList] })"
            >
              <li
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                data-slot="childItem"
                :class="pohon.childItem({ class: [pohonProp?.childItem, item.pohon?.childItem] })"
              >
                <ULink
                  v-slot="{ active: childActive, ...childSlotProps }"
                  v-bind="pickLinkProps(childItem)"
                  custom
                >
                  <NavigationMenuLink
                    as-child
                    :active="childActive"
                    @select="childItem.onSelect"
                  >
                    <ULinkBase
                      v-bind="childSlotProps"
                      data-slot="childLink"
                      :class="pohon.childLink({ class: [pohonProp?.childLink, item.pohon?.childLink, childItem.class], active: childActive })"
                    >
                      <PIcon
                        v-if="childItem.icon"
                        :name="childItem.icon"
                        data-slot="childLinkIcon"
                        :class="pohon.childLinkIcon({ class: [pohonProp?.childLinkIcon, item.pohon?.childLinkIcon], active: childActive })"
                      />

                      <div
                        data-slot="childLinkWrapper"
                        :class="pohon.childLinkWrapper({ class: [pohonProp?.childLinkWrapper, item.pohon?.childLinkWrapper] })"
                      >
                        <p
                          data-slot="childLinkLabel"
                          :class="pohon.childLinkLabel({ class: [pohonProp?.childLinkLabel, item.pohon?.childLinkLabel], active: childActive })"
                        >
                          {{ get(childItem, props.labelKey as string) }}

                          <PIcon
                            v-if="childItem.target === '_blank' && externalIcon !== false"
                            :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external"
                            data-slot="childLinkLabelExternalIcon"
                            :class="pohon.childLinkLabelExternalIcon({ class: [pohonProp?.childLinkLabelExternalIcon, item.pohon?.childLinkLabelExternalIcon], active: childActive })"
                          />
                        </p>
                        <p
                          v-if="childItem.description"
                          data-slot="childLinkDescription"
                          :class="pohon.childLinkDescription({ class: [pohonProp?.childLinkDescription, item.pohon?.childLinkDescription], active: childActive })"
                        >
                          {{ childItem.description }}
                        </p>
                      </div>
                    </ULinkBase>
                  </NavigationMenuLink>
                </ULink>
              </li>
            </ul>
          </slot>
        </NavigationMenuContent>
      </ULink>

      <AccordionContent
        v-if="orientation === 'vertical' && item.children?.length && !collapsed"
        data-slot="content"
        :class="pohon.content({ class: [pohonProp?.content, item.pohon?.content] })"
      >
        <AccordionRoot
          v-bind="({
            ...accordionProps,
            defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex),
          } as AAccordionRootProps)"
          as="ul"
          data-slot="childList"
          :class="pohon.childList({ class: [pohonProp?.childList, item.pohon?.childList] })"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :list-index="listIndex"
            data-slot="childItem"
            :class="pohon.childItem({ class: [pohonProp?.childItem, childItem.pohon?.childItem] })"
          />
        </AccordionRoot>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    v-bind="{
      ...rootProps,
      ...(orientation === 'horizontal' ? {
        modelValue: modelValue as string,
        defaultValue: defaultValue as string,
      } : {}),
      ...$attrs,
    }"
    :data-collapsed="collapsed"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <slot name="list-leading" />

    <template
      v-for="(list, listIndex) in lists"
      :key="`list-${listIndex}`"
    >
      <component
        v-bind="orientation === 'vertical' && !collapsed ? {
          ...accordionProps,
          modelValue,
          defaultValue: defaultValue ?? getAccordionDefaultValue(list, 0, listIndex),
        } : {}"
        :is="orientation === 'vertical' ? AccordionRoot : NavigationMenuList"
        as="ul"
        data-slot="list"
        :class="pohon.list({ class: pohonProp?.list })"
      >
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :list-index="listIndex"
          data-slot="item"
          :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item] })"
        />
      </component>

      <div
        v-if="orientation === 'vertical' && listIndex < lists.length - 1"
        data-slot="separator"
        :class="pohon.separator({ class: pohonProp?.separator })"
      />
    </template>

    <slot name="list-trailing" />

    <div
      v-if="orientation === 'horizontal'"
      data-slot="viewportWrapper"
      :class="pohon.viewportWrapper({ class: pohonProp?.viewportWrapper })"
    >
      <NavigationMenuIndicator
        v-if="arrow"
        data-slot="indicator"
        :class="pohon.indicator({ class: pohonProp?.indicator })"
      >
        <div
          data-slot="arrow"
          :class="pohon.arrow({ class: pohonProp?.arrow })"
        />
      </NavigationMenuIndicator>

      <NavigationMenuViewport
        data-slot="viewport"
        :class="pohon.viewport({ class: pohonProp?.viewport })"
      />
    </div>
  </NavigationMenuRoot>
</template>
