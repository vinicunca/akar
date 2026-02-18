<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootEmits, AAccordionRootProps } from 'akar';
import type { PBadgeProps, PIconProps, PLinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-menu';

type DashboardMenu = ComponentConfig<typeof theme, AppConfig, 'dashboardMenu'>;

export interface PDashboardMenuItem {
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * @IconifyIcon
   */
  activeIcon?: PIconProps['name'];
  /**
   * Display a badge on the link.
   * `{ color: 'neutral', variant: 'outline', size: 'sm' }`{lang="ts-type"}
   */
  badge?: string | number | PBadgeProps;
  target?: PLinkProps['target'];
  /**
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  label: string;
  /**
   * Menu path, unique, can be used as a key
   */
  path: string;
  /**
   * Parent path
   */
  parent?: string;
  /**
   * All parent paths
   */
  parents?: Array<string>;
  /**
   * Used for route -> menu sorting
   */
  order?: number;
  disabled?: boolean;
  /**
   * Whether to show the menu
   */
  show?: boolean;
  children?: Array<PDashboardMenuItem>;
  defaultOpen?: boolean;
  active?: boolean;
  class?: any;
  pohon?: Pick<DashboardMenu['slots'], 'link' | 'linkLeadingIcon' | 'linkTitle' | 'linkTrailing' | 'linkTrailingBadge' | 'linkTrailingBadgeSize' | 'linkTrailingIcon' | 'linkTitleExternalIcon' | 'trigger' | 'content' | 'item' | 'itemWithChildren'>;
  [key: string]: unknown;
}

export interface PContentNavigationProps<T extends PDashboardMenuItem = PDashboardMenuItem> extends Pick<AAccordionRootProps, 'disabled' | 'type' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  /**
   * When `true`, the tree will be opened based on the current route.
   * When `false`, the tree will be closed.
   * When `undefined` (default), the first item will be opened with `type="single"` and the first level will be opened with `type="multiple"`.
   */
  defaultOpen?: boolean;
  /**
   * The icon displayed to toggle the accordion.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  /**
   * @defaultValue 'primary'
   */
  color?: DashboardMenu['variants']['color'];
  /**
   * @defaultValue 'pill'
   */
  variant?: DashboardMenu['variants']['variant'];
  /**
   * Display a line next to the active link.
   * @defaultValue false
   */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: DashboardMenu['variants']['highlightColor'];
  /**
   * When type is "single", prevents closing the open item when clicking its trigger.
   * When type is "multiple", disables the collapsible behavior.
   * @defaultValue true
   */
  collapsible?: boolean;
  collapsed?: boolean;
  level?: number;
  navigation?: Array<T>;
  class?: any;
  pohon?: DashboardMenu['slots'];
}

export interface PContentNavigationEmits extends AAccordionRootEmits {}

type SlotProps<T> = (props: { link: T; active?: boolean; pohon: DashboardMenu['pohon'] }) => any;

export interface PContentNavigationSlots<T extends PDashboardMenuItem = PDashboardMenuItem> {
  'link': SlotProps<T>;
  'link-leading': SlotProps<T>;
  'link-title': SlotProps<T>;
  'link-trailing': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PDashboardMenuItem">
import { useAppConfig, useRoute } from '#imports';
import { isNumber, isString } from '@vinicunca/perkakas';
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
import { computed } from 'vue';
import { mapContentNavigationItem } from '../utils/content';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PBadge from './badge.vue';
import PDashboardMenu from './dashboard-menu.vue';
import PDropdownMenu from './dropdown-menu.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PContentNavigationProps<T>>(),
  {
    as: 'nav',
    defaultOpen: undefined,
    level: 0,
    type: 'multiple',
    collapsible: true,
    highlight: false,
    unmountOnHide: true,
  },
);
const emits = defineEmits<PContentNavigationEmits>();
const slots = defineSlots<PContentNavigationSlots<T>>();

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'collapsible', 'type', 'unmountOnHide'),
  emits,
);

const route = useRoute();
const appConfig = useAppConfig() as DashboardMenu['AppConfig'];

const [
  DefineLinkTemplate,
  ReuseLinkTemplate,
] = createReusableTemplate<{
  link: PDashboardMenuItem;
  active?: boolean;
  childActive?: boolean;
}>();

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardMenu || {}),
  })({
    color: props.color,
    variant: props.variant,
    highlight: props.highlight,
    highlightColor: props.highlightColor || props.color,
  }),
);

const disabled = computed(() =>
  props.disabled || (props.type === 'multiple' && props.collapsible === false),
);

function isRouteInTree(link: PDashboardMenuItem, routePath: string): boolean {
  if (link.children?.length) {
    return link.children.some((child) => isRouteInTree(child, routePath));
  }
  return routePath === link.to;
}

const defaultValue = computed(() => {
  // When `defaultOpen` is `false`, return `undefined` to close all items
  if (props.defaultOpen === false) {
    return undefined;
  }
  // When `defaultOpen` is `undefined`, open the first item or the first level
  if (props.defaultOpen === undefined) {
    return props.type === 'single'
      ? '0'
      : props.navigation
        ?.map((link, index) => link.defaultOpen !== false && String(index))
        .filter(Boolean) as Array<string>;
  }
  // When `defaultOpen` is `true`, open items based on the current route
  const indices = props.navigation?.reduce((acc, link, index) => {
    if (isRouteInTree(link, route.path)) {
      acc.push(String(index));
    }
    return acc;
  }, [] as Array<string>) || [];

  return props.type === 'multiple' ? indices : indices[0];
});
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, active, childActive }">
    <slot
      name="link"
      :link="(link as T)"
      :active="active"
      :pohon="pohon"
    >
      <slot
        name="link-leading"
        :link="(link as T)"
        :active="active"
        :pohon="pohon"
      >
        <PIcon
          v-if="link.icon"
          :name="active || childActive ? link.activeIcon ?? link.icon : link.icon"
          :class="pohon.linkLeadingIcon({
            class: [pohonProp?.linkLeadingIcon, link.pohon?.linkLeadingIcon],
            active,
            childActive,
          })"
          data-pohon="dashboard-menu-link-leading-icon"
        />
      </slot>

      <span
        v-if="(link.label || !!slots['link-title']) && !props.collapsed"
        :class="pohon.linkTitle({
          class: [pohonProp?.linkTitle, link.pohon?.linkTitle],
          active,
        })"
        data-pohon="dashboard-menu-link-title"
      >
        <slot
          name="link-title"
          :link="(link as T)"
          :active="active"
          :pohon="pohon"
        >
          {{ link.label }}
        </slot>

        <PIcon
          v-if="link.target === '_blank'"
          :name="appConfig.pohon.icons.external"
          :class="pohon.linkTitleExternalIcon({
            class: [pohonProp?.linkTitleExternalIcon, link.pohon?.linkTitleExternalIcon],
            active,
          })"
          data-pohon="dashboard-menu-link-title-external-icon"
        />
      </span>

      <span
        v-if="((link.badge || link.badge === 0) || (link.children?.length && !disabled) || link.trailingIcon || !!slots['link-trailing']) && !props.collapsed"
        :class="pohon.linkTrailing({ class: [pohonProp?.linkTrailing, link.pohon?.linkTrailing] })"
        data-pohon="dashboard-menu-link-trailing"
      >
        <slot
          name="link-trailing"
          :link="(link as T)"
          :active="active"
          :pohon="pohon"
        >
          <PBadge
            v-if="(link.badge || link.badge === 0)"
            color="neutral"
            variant="solid"
            :size="((pohonProp?.linkTrailingBadgeSize || pohon.linkTrailingBadgeSize()) as PBadgeProps['size'])"
            v-bind="(isString(link.badge) || isNumber(link.badge)) ? { label: link.badge } : link.badge"
            :class="pohon.linkTrailingBadge({ class: pohonProp?.linkTrailingBadge })"
            data-pohon="dashboard-menu-link-trailing-badge"
          />
          <PIcon
            v-if="link.children?.length && !disabled"
            :name="link.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
            :class="pohon.linkTrailingIcon({
              class: [pohonProp?.linkTrailingIcon, link.pohon?.linkTrailingIcon],
            })"
            data-pohon="dashboard-menu-link-trailing-icon"
          />
          <PIcon
            v-else-if="link.trailingIcon"
            :name="link.trailingIcon"
            :class="pohon.linkTrailingIcon({
              class: [pohonProp?.linkTrailingIcon, link.pohon?.linkTrailingIcon],
            })"
            data-pohon="dashboard-menu-link-trailing-icon"
          />
        </slot>
      </span>
    </slot>
  </DefineLinkTemplate>

  <ANavigationMenuRoot
    :as="as"
    :as-child="level > 0"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="dashboard-menu-root"
    orientation="vertical"
  >
    <AAccordionRoot
      v-bind="props.collapsed
        ? {}
        : {
          ...rootProps,
          defaultValue,
        }"
      as="ul"
      :disabled="disabled"
      :class="
        level > 0
          ? pohon.listWithChildren({ class: pohonProp?.listWithChildren })
          : pohon.list({ class: pohonProp?.list })
      "
      data-pohon="dashboard-menu-list-with-children"
    >
      <template
        v-for="(link, index) in navigation"
        :key="index"
      >
        <component
          :is="props.collapsed ? ANavigationMenuItem : AAccordionItem"
          v-if="link.children?.length"
          as="li"
          :class="props.collapsed ? pohon.item({
            class: [pohonProp?.item, link.pohon?.item],
            collapsed: true,
          }) : pohon.itemWithChildren({
            class: [pohonProp?.itemWithChildren, link.pohon?.itemWithChildren],
            level: level > 0,
          })"
          :value="String(index)"
          data-pohon="dashboard-menu-item-with-children"
        >
          <AAccordionTrigger
            v-if="!props.collapsed"
            as="button"
            :class="[
              pohon.link({
                class: [pohonProp?.link, link.pohon?.link, link.class],
                active: link.active,
                childActive: isRouteInTree(link, route.path),
                disabled: !!link.disabled || disabled,
                level: level > 0,
                collapsed: props.collapsed,
              }),
              pohon.trigger({
                class: [pohonProp?.trigger, link.pohon?.trigger],
                disabled,
              }),
            ]"
          >
            <ReuseLinkTemplate
              :link="link"
              :active="link.active"
              :child-active="isRouteInTree(link, route.path)"
            />
          </AAccordionTrigger>

          <PDropdownMenu
            v-else
            v-slot="{ open }"
            :content="{
              side: 'right',
              align: 'start',
              sideOffset: 12,
            }"
            :items="link.children.map(item => mapContentNavigationItem(item))"
          >
            <ANavigationMenuLink
              as="button"
              :class="[
                pohon.link({
                  class: [pohonProp?.link, link.pohon?.link, link.class],
                  active: link.active || open,
                  childActive: isRouteInTree(link, route.path),
                  disabled: !!link.disabled || disabled,
                  level: level > 0,
                  collapsed: props.collapsed,
                }),
                pohon.trigger({
                  class: [pohonProp?.trigger, link.pohon?.trigger],
                  disabled,
                }),
              ]"
            >
              <ReuseLinkTemplate
                :link="link"
                :active="link.active"
                :child-active="isRouteInTree(link, route.path)"
              />
            </ANavigationMenuLink>
          </PDropdownMenu>

          <AAccordionContent
            v-if="link.children?.length && !props.collapsed"
            :class="pohon.content({ class: [pohonProp?.content, link.pohon?.content] })"
            data-pohon="dashboard-menu-content"
          >
            <PDashboardMenu
              v-bind="rootProps"
              :navigation="link.children"
              :default-open="defaultOpen"
              :level="level + 1"
              :trailing-icon="trailingIcon"
              :color="color"
              :variant="variant"
              :highlight="highlight"
              :highlight-color="highlightColor"
              :pohon="props.pohon"
            >
              <template
                v-for="(_, name) in slots"
                #[name]="slotData"
              >
                <slot
                  :name="name"
                  v-bind="{ ...slotData, link: link as T }"
                />
              </template>
            </PDashboardMenu>
          </AAccordionContent>
        </component>

        <ANavigationMenuItem
          v-else
          :class="pohon.item({
            class: [pohonProp?.item, link.pohon?.item],
            level: level > 0,
            collapsed: props.collapsed,
          })"
          data-pohon="dashboard-menu-item"
        >
          <PLink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(mapContentNavigationItem(link))"
            custom
          >
            <PLinkBase
              v-bind="slotProps"
              :class="pohon.link({
                class: [pohonProp?.link, link.pohon?.link, link.class],
                active,
                disabled: !!link.disabled,
                level: level > 0,
                collapsed: props.collapsed,
              })"
            >
              <ReuseLinkTemplate
                :link="link"
                :active="active"
              />
            </PLinkBase>
          </PLink>
        </ANavigationMenuItem>
      </template>
    </AAccordionRoot>
  </ANavigationMenuRoot>
</template>
