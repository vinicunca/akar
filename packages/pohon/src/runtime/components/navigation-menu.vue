<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { NavigationMenuRootProps, NavigationMenuRootEmits, NavigationMenuContentProps, NavigationMenuContentEmits, AccordionRootProps } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/navigation-menu'
import type { AvatarProps, BadgeProps, IconProps, LinkProps, PopoverProps, TooltipProps } from '../types'
import type { ArrayOrNested, DynamicSlots, GetItemKeys, MergeTypes, NestedItem, EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/uv'

type NavigationMenu = ComponentConfig<typeof theme, AppConfig, 'navigationMenu'>

export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'type' | 'ui'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string
  [key: string]: any
}

export interface NavigationMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name']
  avatar?: AvatarProps
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps
  /**
   * Display a tooltip on the item when the menu is collapsed with the label of the item.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the item when the menu is collapsed with the children list.
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | PopoverProps
  /**
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name']
  /**
   * The type of the item.
   * The `label` type is only displayed in `vertical` orientation.
   * The `trigger` type is used to force the item to be collapsible when its a link in `vertical` orientation.
   * @defaultValue 'link'
   */
  type?: 'label' | 'trigger' | 'link'
  slot?: string
  /**
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with Reka pohon.
   * @defaultValue `item-${index}`
   */
  value?: string
  children?: NavigationMenuChildItem[]
  defaultOpen?: boolean
  open?: boolean
  onSelect?(e: Event): void
  class?: any
  pohon?: Pick<NavigationMenu['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>
  [key: string]: any
}

export interface NavigationMenuProps<T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>> extends Pick<NavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AccordionRootProps, 'disabled' | 'type' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * The icon displayed to open the menu.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name']
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @defaultValue appConfig.pohon.icons.external
   * @IconifyIcon
   */
  externalIcon?: boolean | IconProps['name']
  items?: T
  /**
   * @defaultValue 'primary'
   */
  color?: NavigationMenu['variants']['color']
  /**
   * @defaultValue 'pill'
   */
  variant?: NavigationMenu['variants']['variant']
  /**
   * The orientation of the menu.
   * @defaultValue 'horizontal'
   */
  orientation?: NavigationMenuRootProps['orientation']
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  collapsed?: boolean
  /**
   * Display a tooltip on the items when the menu is collapsed with the label of the item.
   * `{ delayDuration: 0, content: { side: 'right' } }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the items when the menu is collapsed with the children list.
   * `{ mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }`{lang="ts-type"}
   * @defaultValue false
   */
  popover?: boolean | PopoverProps
  /** Display a line next to the active item. */
  highlight?: boolean
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: NavigationMenu['variants']['highlightColor']
  /** The content of the menu. */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @defaultValue 'horizontal'
   */
  contentOrientation?: NavigationMenu['variants']['contentOrientation']
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  class?: any
  pohon?: NavigationMenu['slots']
}

export interface NavigationMenuEmits extends NavigationMenuRootEmits {}

type SlotProps<T extends NavigationMenuItem> = (props: { item: T, index: number, active?: boolean }) => any

export type NavigationMenuSlots<
  A extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  T extends NestedItem<A> = NestedItem<A>
> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
  'item-content': SlotProps<T>
  'list-leading': (props?: object) => any
  'list-trailing': (props?: object) => any
} & DynamicSlots<MergeTypes<T>, 'leading' | 'label' | 'trailing' | 'content', { index: number, active?: boolean }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>">
import { computed, toRef } from 'vue'
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent, useForwardPropsEmits } from 'akar'
import { defu } from 'defu'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { get, isArrayOfArray } from '../utils'
import { uv } from '../utils/uv'
import { pickLinkProps } from '../utils/link'
import PLinkBase from './link-base.vue'
import PLink from './link.vue'
import PAvatar from './avatar.vue'
import PIcon from './icon.vue'
import UBadge from './badge.vue'
import UPopover from './xPopover.vue'
import UTooltip from './Tooltip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NavigationMenuProps<T>>(), {
  orientation: 'horizontal',
  contentOrientation: 'horizontal',
  externalIcon: true,
  delayDuration: 0,
  type: 'multiple',
  collapsible: true,
  unmountOnHide: true,
  labelKey: 'label'
})
const emits = defineEmits<NavigationMenuEmits>()
const slots = defineSlots<NavigationMenuSlots<T>>()

const appConfig = useAppConfig() as NavigationMenu['AppConfig']

const rootProps = useForwardPropsEmits(computed(() => ({
  as: props.as,
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
  delayDuration: props.delayDuration,
  skipDelayDuration: props.skipDelayDuration,
  orientation: props.orientation,
  disableClickTrigger: props.disableClickTrigger,
  disableHoverTrigger: props.disableHoverTrigger,
  disablePointerLeaveClose: props.disablePointerLeaveClose,
  unmountOnHide: props.unmountOnHide
})), emits)
const accordionProps = useForwardPropsEmits(reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'), emits)
const contentProps = toRef(() => props.content)
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as TooltipProps)
const popoverProps = toRef(() => defu(typeof props.popover === 'boolean' ? {} : props.popover, { mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }) as PopoverProps)

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, active?: boolean }>()
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, level?: number }>({
  props: {
    item: Object,
    index: Number,
    level: Number
  }
})

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.navigationMenu || {}) })({
  orientation: props.orientation,
  contentOrientation: props.orientation === 'vertical' ? undefined : props.contentOrientation,
  collapsed: props.collapsed,
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color
}))

const lists = computed<NavigationMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)

function getAccordionDefaultValue(list: NavigationMenuItem[], level = 0) {
  const indexes = list.reduce((acc: string[], item, index) => {
    if (item.defaultOpen || item.open) {
      acc.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`))
    }
    return acc
  }, [])

  return props.type === 'single' ? indexes[0] : indexes
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof NavigationMenuSlots<T>)" :item="item" :index="index">
      <slot :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
        <PAvatar v-if="item.avatar" :size="((item.ui?.linkLeadingAvatarSize || props.pohon?.linkLeadingAvatarSize || pohon.linkLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="pohon.linkLeadingAvatar({ class: [props.pohon?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })" />
        <PIcon v-else-if="item.icon" :name="item.icon" :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })" />
      </slot>

      <span
        v-if="(!collapsed || orientation !== 'vertical') && (get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>])"
        :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.ui?.linkLabel] })"
      >
        <slot :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          {{ get(item, props.labelKey as string) }}
        </slot>

        <PIcon v-if="item.target === '_blank' && externalIcon !== false" :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external" :class="pohon.linkLabelExternalIcon({ class: [props.pohon?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })" />
      </span>

      <component :is="orientation === 'vertical' && item.children?.length && !collapsed ? AccordionTrigger : 'span'" v-if="(!collapsed || orientation !== 'vertical') && (item.badge || (orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>])" as="span" :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, item.ui?.linkTrailing] })" @click.stop.prevent>
        <slot :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          <UBadge
            v-if="item.badge !== undefined"
            color="neutral"
            variant="outline"
            :size="((item.ui?.linkTrailingBadgeSize || props.pohon?.linkTrailingBadgeSize || pohon.linkTrailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            :class="pohon.linkTrailingBadge({ class: [props.pohon?.linkTrailingBadge, item.ui?.linkTrailingBadge] })"
          />

          <PIcon v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)" :name="item.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown" :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })" />
          <PIcon v-else-if="item.trailingIcon" :name="item.trailingIcon" :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })" />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(orientation === 'vertical' && !collapsed) ? AccordionItem : NavigationMenuItem"
      as="li"
      :value="item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div v-if="orientation === 'vertical' && item.type === 'label' && !collapsed" :class="pohon.label({ class: [props.pohon?.label, item.ui?.label, item.class] })">
        <ReuseLinkTemplate :item="item" :index="index" />
      </div>
      <PLink v-else-if="item.type !== 'label'" v-slot="{ active, ...slotProps }" v-bind="(orientation === 'vertical' && item.children?.length && !collapsed && item.type === 'trigger') ? {} : pickLinkProps(item as Omit<NavigationMenuItem, 'type'>)" custom>
        <component
          :is="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) ? NavigationMenuTrigger : ((orientation === 'vertical' && item.children?.length && !collapsed && !(slotProps as any).href) ? AccordionTrigger : NavigationMenuLink)"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <UPopover v-if="orientation === 'vertical' && collapsed && item.children?.length && (!!props.popover || !!item.popover)" v-bind="{ ...popoverProps, ...(typeof item.popover === 'boolean' ? {} : item.popover || {}) }" :ui="{ content: pohon.content({ class: [props.pohon?.content, item.ui?.content] }) }">
            <PLinkBase v-bind="slotProps" :class="pohon.link({ class: [props.pohon?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })">
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </PLinkBase>

            <template #content>
              <slot :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)" :item="item" :active="active || item.active" :index="index">
                <ul :class="pohon.childList({ class: [props.pohon?.childList, item.ui?.childList] })">
                  <li :class="pohon.childLabel({ class: [props.pohon?.childLabel, item.ui?.childLabel] })">
                    {{ get(item, props.labelKey as string) }}
                  </li>
                  <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="pohon.childItem({ class: [props.pohon?.childItem, item.ui?.childItem] })">
                    <PLink v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                      <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                        <PLinkBase v-bind="childSlotProps" :class="pohon.childLink({ class: [props.pohon?.childLink, item.ui?.childLink, childItem.class], active: childActive })">
                          <PIcon v-if="childItem.icon" :name="childItem.icon" :class="pohon.childLinkIcon({ class: [props.pohon?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" />

                          <span :class="pohon.childLinkLabel({ class: [props.pohon?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })">
                            {{ get(childItem, props.labelKey as string) }}

                            <PIcon v-if="childItem.target === '_blank' && externalIcon !== false" :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external" :class="pohon.childLinkLabelExternalIcon({ class: [props.pohon?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" />
                          </span>
                        </PLinkBase>
                      </NavigationMenuLink>
                    </PLink>
                  </li>
                </ul>
              </slot>
            </template>
          </UPopover>
          <UTooltip v-else-if="orientation === 'vertical' && collapsed && (!!props.tooltip || !!item.tooltip)" :text="get(item, props.labelKey as string)" v-bind="{ ...tooltipProps, ...(typeof item.tooltip === 'boolean' ? {} : item.tooltip || {}) }">
            <PLinkBase v-bind="slotProps" :class="pohon.link({ class: [props.pohon?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })">
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </PLinkBase>
          </UTooltip>
          <PLinkBase v-else v-bind="slotProps" :class="pohon.link({ class: [props.pohon?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: orientation === 'horizontal' || level > 0 })">
            <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
          </PLinkBase>
        </component>

        <NavigationMenuContent v-if="orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])" v-bind="contentProps" :class="pohon.content({ class: [props.pohon?.content, item.ui?.content] })">
          <slot :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)" :item="item" :active="active || item.active" :index="index">
            <ul :class="pohon.childList({ class: [props.pohon?.childList, item.ui?.childList] })">
              <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="pohon.childItem({ class: [props.pohon?.childItem, item.ui?.childItem] })">
                <PLink v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                  <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                    <PLinkBase v-bind="childSlotProps" :class="pohon.childLink({ class: [props.pohon?.childLink, item.ui?.childLink, childItem.class], active: childActive })">
                      <PIcon v-if="childItem.icon" :name="childItem.icon" :class="pohon.childLinkIcon({ class: [props.pohon?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" />

                      <div :class="pohon.childLinkWrapper({ class: [props.pohon?.childLinkWrapper, item.ui?.childLinkWrapper] })">
                        <p :class="pohon.childLinkLabel({ class: [props.pohon?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })">
                          {{ get(childItem, props.labelKey as string) }}

                          <PIcon v-if="childItem.target === '_blank' && externalIcon !== false" :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external" :class="pohon.childLinkLabelExternalIcon({ class: [props.pohon?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" />
                        </p>
                        <p v-if="childItem.description" :class="pohon.childLinkDescription({ class: [props.pohon?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })">
                          {{ childItem.description }}
                        </p>
                      </div>
                    </PLinkBase>
                  </NavigationMenuLink>
                </PLink>
              </li>
            </ul>
          </slot>
        </NavigationMenuContent>
      </PLink>

      <AccordionContent v-if="orientation === 'vertical' && item.children?.length && !collapsed" :class="pohon.content({ class: [props.pohon?.content, item.ui?.content] })">
        <AccordionRoot
          v-bind="({
            ...accordionProps,
            defaultValue: getAccordionDefaultValue(item.children, level + 1)
          } as AccordionRootProps)"
          as="ul"
          :class="pohon.childList({ class: props.pohon?.childList })"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="pohon.childItem({ class: [props.pohon?.childItem, childItem.ui?.childItem] })"
          />
        </AccordionRoot>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot v-bind="{ ...rootProps, ...$attrs }" :data-collapsed="collapsed" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <slot name="list-leading" />

    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <component
        v-bind="orientation === 'vertical' && !collapsed ? {
          ...accordionProps,
          defaultValue: getAccordionDefaultValue(list)
        } : {}"
        :is="orientation === 'vertical' && !collapsed ? AccordionRoot : NavigationMenuList"
        as="ul"
        :class="pohon.list({ class: props.pohon?.list })"
      >
        <ReuseItemTemplate v-for="(item, index) in list" :key="`list-${listIndex}-${index}`" :item="item" :index="index" :class="pohon.item({ class: [props.pohon?.item, item.ui?.item] })" />
      </component>

      <div v-if="orientation === 'vertical' && listIndex < lists.length - 1" :class="pohon.separator({ class: props.pohon?.separator })" />
    </template>

    <slot name="list-trailing" />

    <div v-if="orientation === 'horizontal'" :class="pohon.viewportWrapper({ class: props.pohon?.viewportWrapper })">
      <NavigationMenuIndicator v-if="arrow" :class="pohon.indicator({ class: props.pohon?.indicator })">
        <div :class="pohon.arrow({ class: props.pohon?.arrow })" />
      </NavigationMenuIndicator>

      <NavigationMenuViewport :class="pohon.viewport({ class: props.pohon?.viewport })" />
    </div>
  </NavigationMenuRoot>
</template>
