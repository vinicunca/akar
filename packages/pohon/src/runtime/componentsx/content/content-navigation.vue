<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootEmits, AAccordionRootProps } from 'akar';
import type { VNode } from 'vue';
import type { BadgeProps, PIconProps, LinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-navigation';

type ContentNavigation = ComponentConfig<typeof theme, AppConfig, 'contentNavigation'>;

export interface ContentNavigationLink extends ContentNavigationItem {
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * Display a badge on the link.
   * `{ color: 'neutral', variant: 'outline', size: 'sm' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps;
  target?: LinkProps['target'];
  /**
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  disabled?: boolean;
  children?: Array<ContentNavigationLink>;
  defaultOpen?: boolean;
  active?: boolean;
  class?: any;
  pohon?: Pick<ContentNavigation['slots'], 'link' | 'linkLeadingIcon' | 'linkTitle' | 'linkTrailing' | 'linkTrailingIcon' | 'linkTrailingBadge' | 'linkTrailingBadgeSize' | 'linkTrailingIcon' | 'linkTitleExternalIcon' | 'trigger' | 'content' | 'item' | 'itemWithChildren'>;
}

export interface ContentNavigationProps<T extends ContentNavigationLink = ContentNavigationLink> extends Pick<AAccordionRootProps, 'disabled' | 'type' | 'unmountOnHide'> {
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

export interface ContentNavigationEmits extends AAccordionRootEmits {}

type SlotProps<T> = (props: { link: T; active: boolean; pohon: ContentNavigation['pohon'] }) => Array<VNode>;

export interface ContentNavigationSlots<T extends ContentNavigationLink = ContentNavigationLink> {
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-title'?: SlotProps<T>;
  'link-trailing'?: SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends ContentNavigationLink">
import { useAppConfig, useRoute } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { AccordionContent, PAccordionItem, AccordionRoot, AccordionTrigger, Primitive, useForwardPropsEmits } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { mapContentNavigationItem } from '../../utils/content';
import { pickLinkProps } from '../../utils/link';
import { uv } from '../../utils/uv';
import UBadge from '../Badge.vue';
import PIcon from '../icon.vue';
import ULink from '../Link.vue';
import ULinkBase from '../LinkBase.vue';
import UContentNavigation from './ContentNavigation.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ContentNavigationProps<T>>(), {
  as: 'nav',
  defaultOpen: undefined,
  level: 0,
  type: 'multiple',
  collapsible: true,
  highlight: false,
  unmountOnHide: true,
});
const emits = defineEmits<ContentNavigationEmits>();
const slots = defineSlots<ContentNavigationSlots<T>>();

const rootProps = useForwardPropsEmits(reactivePick(props, 'collapsible', 'type', 'unmountOnHide'), emits);

const route = useRoute();
const appConfig = useAppConfig() as ContentNavigation['AppConfig'];
const pohonProp = useComponentPohon('contentNavigation', props);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ link: ContentNavigationLink; active: boolean }>();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.contentNavigation || {}) })({
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color,
}));

const disabled = computed(() => props.disabled || (props.type === 'multiple' && props.collapsible === false));

function isRouteInTree(link: ContentNavigationLink, routePath: string): boolean {
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
    return props.type === 'single' ? '0' : props.navigation?.map((link, index) => link.defaultOpen !== false && String(index)).filter(Boolean) as Array<string>;
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
          :name="link.icon"
          data-slot="linkLeadingIcon"
          :class="pohon.linkLeadingIcon({ class: [pohonProp?.linkLeadingIcon, link.pohon?.linkLeadingIcon], active })"
        />
      </slot>

      <span
        v-if="link.title || !!slots['link-title']"
        data-slot="linkTitle"
        :class="pohon.linkTitle({ class: [pohonProp?.linkTitle, link.pohon?.linkTitle], active })"
      >
        <slot
          name="link-title"
          :link="(link as T)"
          :active="active"
          :pohon="pohon"
        >
          {{ link.title }}
        </slot>

        <PIcon
          v-if="link.target === '_blank'"
          :name="appConfig.pohon.icons.external"
          data-slot="linkTitleExternalIcon"
          :class="pohon.linkTitleExternalIcon({ class: [pohonProp?.linkTitleExternalIcon, link.pohon?.linkTitleExternalIcon], active })"
        />
      </span>

      <span
        v-if="(link.badge || link.badge === 0) || (link.children?.length && !disabled) || link.trailingIcon || !!slots['link-trailing']"
        data-slot="linkTrailing"
        :class="pohon.linkTrailing({ class: [pohonProp?.linkTrailing, link.pohon?.linkTrailing] })"
      >
        <slot
          name="link-trailing"
          :link="(link as T)"
          :active="active"
          :pohon="pohon"
        >
          <UBadge
            v-if="link.badge || link.badge === 0"
            color="neutral"
            variant="outline"
            :size="((pohonProp?.linkTrailingBadgeSize || pohon.linkTrailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof link.badge === 'string' || typeof link.badge === 'number') ? { label: link.badge } : link.badge"
            data-slot="linkTrailingBadge"
            :class="pohon.linkTrailingBadge({ class: pohonProp?.linkTrailingBadge })"
          />
          <PIcon
            v-if="link.children?.length && !disabled"
            :name="link.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
            data-slot="linkTrailingIcon"
            :class="pohon.linkTrailingIcon({ class: [pohonProp?.linkTrailingIcon, link.pohon?.linkTrailingIcon] })"
          />
          <PIcon
            v-else-if="link.trailingIcon"
            :name="link.trailingIcon"
            data-slot="linkTrailingIcon"
            :class="pohon.linkTrailingIcon({ class: [pohonProp?.linkTrailingIcon, link.pohon?.linkTrailingIcon] })"
          />
        </slot>
      </span>
    </slot>
  </DefineLinkTemplate>

  <Primitive
    :as="as"
    v-bind="$attrs"
    :as-child="level > 0"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <AccordionRoot
      as="ul"
      :disabled="disabled"
      v-bind="rootProps"
      :default-value="defaultValue"
      :class="level > 0 ? pohon.listWithChildren({ class: pohonProp?.listWithChildren }) : pohon.list({ class: pohonProp?.list })"
    >
      <template
        v-for="(link, index) in navigation"
        :key="index"
      >
        <PAccordionItem
          v-if="link.children?.length"
          as="li"
          :disabled="!!link.disabled"
          data-slot="itemWithChildren"
          :class="pohon.itemWithChildren({ class: [pohonProp?.itemWithChildren, link.pohon?.itemWithChildren], level: level > 0 })"
          :value="String(index)"
        >
          <AccordionTrigger
            as="button"
            :class="[
              pohon.link({ class: [pohonProp?.link, link.pohon?.link, link.class], active: link.active, disabled: !!link.disabled || disabled }),
              pohon.trigger({ class: [pohonProp?.trigger, link.pohon?.trigger], disabled: !!link.disabled || disabled }),
            ]"
          >
            <ReuseLinkTemplate
              :link="link"
              :active="link.active || false"
            />
          </AccordionTrigger>

          <AccordionContent
            data-slot="content"
            :class="pohon.content({ class: [pohonProp?.content, link.pohon?.content] })"
          >
            <UContentNavigation
              v-bind="rootProps"
              :navigation="link.children"
              :default-open="defaultOpen"
              :level="level + 1"
              :trailing-icon="trailingIcon"
              :color="color"
              :variant="variant"
              :highlight="highlight"
              :highlight-color="highlightColor"
              :pohon="pohonProp"
            >
              <template
                v-for="(_, name) in slots"
                #[name]="slotData"
              >
                <slot
                  :name="name"
                  v-bind="{ ...slotData, link: slotData.link as T }"
                />
              </template>
            </UContentNavigation>
          </AccordionContent>
        </PAccordionItem>

        <li
          v-else
          data-slot="item"
          :class="pohon.item({ class: [pohonProp?.item, link.pohon?.item], level: level > 0 })"
        >
          <ULink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(mapContentNavigationItem(link))"
            custom
          >
            <ULinkBase
              v-bind="slotProps"
              data-slot="link"
              :class="pohon.link({ class: [pohonProp?.link, link.pohon?.link, link.class], active, disabled: !!link.disabled, level: level > 0 })"
            >
              <ReuseLinkTemplate
                :link="link"
                :active="active"
              />
            </ULinkBase>
          </ULink>
        </li>
      </template>
    </AccordionRoot>
  </Primitive>
</template>
