<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui';
import type { IconProps, PBadgeProps, PLinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/content/content-navigation';

type ContentNavigation = ComponentConfig<typeof theme, AppConfig, 'contentNavigation'>;

export interface ContentNavigationLink extends ContentNavigationItem {
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  /**
   * Display a badge on the link.
   * `{ color: 'neutral', variant: 'outline', size: 'sm' }`{lang="ts-type"}
   */
  badge?: string | number | PBadgeProps;
  target?: PLinkProps['target'];
  /**
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
  disabled?: boolean;
  children?: Array<ContentNavigationLink>;
  defaultOpen?: boolean;
  active?: boolean;
  class?: any;
  pohon?: Pick<ContentNavigation['slots'], 'link' | 'linkLeadingIcon' | 'linkTitle' | 'linkTrailing' | 'linkTrailingIcon' | 'linkTrailingBadge' | 'linkTrailingBadgeSize' | 'linkTrailingIcon' | 'linkTitleExternalIcon' | 'trigger' | 'content' | 'item' | 'itemWithChildren'>;
}

export interface ContentNavigationProps<T extends ContentNavigationLink = ContentNavigationLink> extends Pick<AccordionRootProps, 'disabled' | 'type' | 'unmountOnHide'> {
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
   * @defaultValue appConfig.ui.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
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

export interface ContentNavigationEmits extends AccordionRootEmits {}

type SlotProps<T> = (props: { link: T; active?: boolean }) => any;

export interface ContentNavigationSlots<T extends ContentNavigationLink = ContentNavigationLink> {
  'link': SlotProps<T>;
  'link-leading': SlotProps<T>;
  'link-title': SlotProps<T>;
  'link-trailing': SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends ContentNavigationLink">
import { useAppConfig, useRoute } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger, Primitive, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';
import { mapContentNavigationItem } from '../../utils/content';
import { pickLinkProps } from '../../utils/link';
import { tv } from '../../utils/tv';
import UBadge from '../Badge.vue';
import UIcon from '../Icon.vue';
import PLinkBase from '../link-base.vue';
import ULink from '../Link.vue';
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

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ link: ContentNavigationLink; active?: boolean }>();

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.contentNavigation || {}) })({
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color,
}));

const disabled = computed(() => props.disabled || (props.type === 'multiple' && props.collapsible === false));

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
  const index = props.navigation?.findIndex((link) => route.path.startsWith(link.path));
  const tyindex = index === -1 ? 0 : index;

  return props.type === 'multiple' ? [String(tyindex)] : String(tyindex);
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
        <UIcon
          v-if="link.icon"
          :name="link.icon"
          :class="ui.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, link.pohon?.linkLeadingIcon], active })"
        />
      </slot>

      <span
        v-if="link.title || !!slots['link-title']"
        :class="ui.linkTitle({ class: [props.pohon?.linkTitle, link.pohon?.linkTitle], active })"
      >
        <slot
          name="link-title"
          :link="link as T"
          :active="active"
        >
          {{ link.title }}
        </slot>

        <UIcon
          v-if="link.target === '_blank'"
          :name="appConfig.ui.icons.external"
          :class="ui.linkTitleExternalIcon({ class: [props.pohon?.linkTitleExternalIcon, link.pohon?.linkTitleExternalIcon], active })"
        />
      </span>

      <span
        v-if="link.badge || (link.children?.length && !disabled) || link.trailingIcon || !!slots['link-trailing']"
        :class="ui.linkTrailing({ class: [props.pohon?.linkTrailing, link.pohon?.linkTrailing] })"
      >
        <slot
          name="link-trailing"
          :link="link as T"
          :active="active"
        >
          <UBadge
            v-if="link.badge"
            color="neutral"
            variant="outline"
            :size="((props.pohon?.linkTrailingBadgeSize || ui.linkTrailingBadgeSize()) as PBadgeProps['size'])"
            v-bind="(isString(link.badge) || isNumber(link.badge)) ? { label: link.badge } : link.badge"
            :class="ui.linkTrailingBadge({ class: props.pohon?.linkTrailingBadge })"
          />
          <UIcon
            v-if="link.children?.length && !disabled"
            :name="link.trailingIcon || trailingIcon || appConfig.ui.icons.chevronDown"
            :class="ui.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, link.pohon?.linkTrailingIcon] })"
          />
          <UIcon
            v-else-if="link.trailingIcon"
            :name="link.trailingIcon"
            :class="ui.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, link.pohon?.linkTrailingIcon] })"
          />
        </slot>
      </span>
    </slot>
  </DefineLinkTemplate>

  <Primitive
    :as="as"
    v-bind="$attrs"
    :as-child="level > 0"
    :class="ui.root({ class: [props.pohon?.root, props.class] })"
  >
    <AccordionRoot
      as="ul"
      :disabled="disabled"
      v-bind="rootProps"
      :default-value="defaultValue"
      :class="level > 0 ? ui.listWithChildren({ class: props.pohon?.listWithChildren }) : ui.list({ class: props.pohon?.list })"
    >
      <template
        v-for="(link, index) in navigation"
        :key="index"
      >
        <AccordionItem
          v-if="link.children?.length"
          as="li"
          :class="ui.itemWithChildren({ class: [props.pohon?.itemWithChildren, link.pohon?.itemWithChildren], level: level > 0 })"
          :value="String(index)"
        >
          <AccordionTrigger
            as="button"
            :class="[
              ui.link({ class: [props.pohon?.link, link.pohon?.link, link.class], active: link.active, disabled: !!link.disabled || disabled }),
              ui.trigger({ class: [props.pohon?.trigger, link.pohon?.trigger], disabled }),
            ]"
          >
            <ReuseLinkTemplate
              :link="link"
              :active="link.active"
            />
          </AccordionTrigger>

          <AccordionContent :class="ui.content({ class: [props.pohon?.content, link.pohon?.content] })">
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
              :ui="props.ui"
            >
              <template
                v-for="(_, name) in slots"
                #[name]="slotData"
              >
                <slot
                  :name="name"
                  :link="slotData.link as T"
                  :active="slotData.active"
                />
              </template>
            </UContentNavigation>
          </AccordionContent>
        </AccordionItem>

        <li
          v-else
          :class="ui.item({ class: [props.pohon?.item, link.pohon?.item], level: level > 0 })"
        >
          <ULink
            v-slot="{ active, ...slotProps }"
            v-bind="pickLinkProps(mapContentNavigationItem(link))"
            custom
          >
            <PLinkBase
              v-bind="slotProps"
              :class="ui.link({ class: [props.pohon?.link, link.pohon?.link, link.class], active, disabled: !!link.disabled, level: level > 0 })"
            >
              <ReuseLinkTemplate
                :link="link"
                :active="active"
              />
            </PLinkBase>
          </ULink>
        </li>
      </template>
    </AccordionRoot>
  </Primitive>
</template>
