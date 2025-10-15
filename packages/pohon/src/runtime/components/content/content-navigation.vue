<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootEmits, AAccordionRootProps } from 'akar';
import type { PBadgeProps, PIconProps, PLinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-navigation';
import { isNumber, isString } from '@vinicunca/perkakas';

type ContentNavigation = ComponentConfig<typeof theme, AppConfig, 'contentNavigation'>;

export interface PContentNavigationLink extends ContentNavigationItem {
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
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
  disabled?: boolean;
  children?: Array<PContentNavigationLink>;
  defaultOpen?: boolean;
  active?: boolean;
  class?: any;
  pohon?: Pick<ContentNavigation['slots'], 'link' | 'linkLeadingIcon' | 'linkTitle' | 'linkTrailing' | 'linkTrailingBadge' | 'linkTrailingBadgeSize' | 'linkTrailingIcon' | 'linkTitleExternalIcon' | 'trigger' | 'content' | 'item' | 'itemWithChildren'>;
}

export interface PContentNavigationProps<T extends PContentNavigationLink = PContentNavigationLink> extends Pick<AAccordionRootProps, 'disabled' | 'type' | 'unmountOnHide'> {
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
  color?: ContentNavigation['variants']['color'];
  /**
   * @defaultValue 'pill'
   */
  variant?: ContentNavigation['variants']['variant'];
  /**
   * Display a line next to the active link.
   * @defaultValue false
   */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: ContentNavigation['variants']['highlightColor'];
  /**
   * When type is "single", prevents closing the open item when clicking its trigger.
   * When type is "multiple", disables the collapsible behavior.
   * @defaultValue true
   */
  collapsible?: boolean;
  level?: number;
  navigation?: Array<T>;
  class?: any;
  pohon?: ContentNavigation['slots'];
}

export interface PContentNavigationEmits extends AAccordionRootEmits {}

type SlotProps<T> = (props: { link: T; active?: boolean }) => any;

export interface PContentNavigationSlots<T extends PContentNavigationLink = PContentNavigationLink> {
  'link': SlotProps<T>;
  'link-leading': SlotProps<T>;
  'link-title': SlotProps<T>;
  'link-trailing': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends PContentNavigationLink">
import { useAppConfig, useRoute } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  AAccordionContent,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
  APrimitive,
  useForwardPropsEmits,
} from 'akar';
import { computed } from 'vue';
import { mapContentNavigationItem } from '../../utils/content';
import { pickLinkProps } from '../../utils/link';
import { uv } from '../../utils/uv';
import PBadge from '../badge.vue';
import PIcon from '../icon.vue';
import PLinkBase from '../link-base.vue';
import PLink from '../link.vue';
import PContentNavigation from './content-navigation.vue';

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
const appConfig = useAppConfig() as ContentNavigation['AppConfig'];

const [
  DefineLinkTemplate,
  ReuseLinkTemplate,
] = createReusableTemplate<{ link: PContentNavigationLink; active?: boolean }>();

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contentNavigation || {}),
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

function isRouteInTree(link: PContentNavigationLink, routePath: string): boolean {
  if (link.children?.length) {
    return link.children.some((child) => isRouteInTree(child, routePath));
  }
  return routePath === link.path;
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
  <DefineLinkTemplate v-slot="{ link, active }">
    <slot
      name="link"
      :link="link as T"
      :active="active"
    >
      <slot
        name="link-leading"
        :link="link as T"
        :active="active"
      >
        <PIcon
          v-if="link.icon"
          :name="link.icon"
          :class="pohon.linkLeadingIcon({
            class: [props.pohon?.linkLeadingIcon, link.pohon?.linkLeadingIcon],
            active,
          })"
        />
      </slot>

      <span
        v-if="link.title || !!slots['link-title']"
        :class="pohon.linkTitle({
          class: [props.pohon?.linkTitle, link.pohon?.linkTitle],
          active,
        })"
      >
        <slot
          name="link-title"
          :link="link as T"
          :active="active"
        >
          {{ link.title }}
        </slot>

        <PIcon
          v-if="link.target === '_blank'"
          :name="appConfig.pohon.icons.external"
          :class="pohon.linkTitleExternalIcon({
            class: [props.pohon?.linkTitleExternalIcon, link.pohon?.linkTitleExternalIcon],
            active,
          })"
        />
      </span>

      <span
        v-if="link.badge || (link.children?.length && !disabled) || link.trailingIcon || !!slots['link-trailing']"
        :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, link.pohon?.linkTrailing] })"
      >
        <slot
          name="link-trailing"
          :link="link as T"
          :active="active"
        >
          <PBadge
            v-if="link.badge"
            color="neutral"
            variant="outline"
            :size="((props.pohon?.linkTrailingBadgeSize || pohon.linkTrailingBadgeSize()) as PBadgeProps['size'])"
            v-bind="(isString(link.badge) || isNumber(link.badge)) ? { label: link.badge } : link.badge"
            :class="pohon.linkTrailingBadge({ class: props.pohon?.linkTrailingBadge })"
          />
          <PIcon
            v-if="link.children?.length && !disabled"
            :name="link.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
            :class="pohon.linkTrailingIcon({
              class: [props.pohon?.linkTrailingIcon, link.pohon?.linkTrailingIcon],
            })"
          />
          <PIcon
            v-else-if="link.trailingIcon"
            :name="link.trailingIcon"
            :class="pohon.linkTrailingIcon({
              class: [props.pohon?.linkTrailingIcon, link.pohon?.linkTrailingIcon],
            })"
          />
        </slot>
      </span>
    </slot>
  </DefineLinkTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    :as-child="level > 0"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <AAccordionRoot
      as="ul"
      :disabled="disabled"
      v-bind="rootProps"
      :default-value="defaultValue"
      :class="level > 0 ? pohon.listWithChildren({ class: props.pohon?.listWithChildren }) : pohon.list({ class: props.pohon?.list })"
    >
      <template
        v-for="(link, index) in navigation"
        :key="index"
      >
        <AAccordionItem
          v-if="link.children?.length"
          as="li"
          :class="pohon.itemWithChildren({
            class: [props.pohon?.itemWithChildren, link.pohon?.itemWithChildren],
            level: level > 0,
          })"
          :value="String(index)"
        >
          <AAccordionTrigger
            as="button"
            :class="[
              pohon.link({
                class: [props.pohon?.link, link.pohon?.link, link.class],
                active: link.active,
                disabled: !!link.disabled || disabled,
              }),
              pohon.trigger({
                class: [props.pohon?.trigger, link.pohon?.trigger],
                disabled,
              }),
            ]"
          >
            <ReuseLinkTemplate
              :link="link"
              :active="link.active"
            />
          </AAccordionTrigger>

          <AAccordionContent
            :class="pohon.content({ class: [props.pohon?.content, link.pohon?.content] })"
          >
            <PContentNavigation
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
                  :link="(slotData.link as T)"
                  :active="slotData.active"
                />
              </template>
            </PContentNavigation>
          </AAccordionContent>
        </AAccordionItem>

        <li
          v-else
          :class="pohon.item({ class: [props.pohon?.item, link.pohon?.item], level: level > 0 })"
        >
          <PLink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(mapContentNavigationItem(link))"
            custom
          >
            <PLinkBase
              v-bind="slotProps"
              :class="pohon.link({
                class: [props.pohon?.link, link.pohon?.link, link.class],
                active,
                disabled: !!link.disabled,
                level: level > 0,
              })"
            >
              <ReuseLinkTemplate
                :link="link"
                :active="active"
              />
            </PLinkBase>
          </PLink>
        </li>
      </template>
    </AAccordionRoot>
  </APrimitive>
</template>
