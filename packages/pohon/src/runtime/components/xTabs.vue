<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { TabsRootEmits, TabsRootProps } from 'akar';
import type { AvatarProps, BadgeProps, IconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/tabs';

type Tabs = ComponentConfig<typeof theme, AppConfig, 'tabs'>;

export interface TabsItem {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  avatar?: AvatarProps;
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps;
  slot?: string;
  content?: string;
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number;
  disabled?: boolean;
  class?: any;
  pohon?: Pick<Tabs['slots'], 'trigger' | 'leadingIcon' | 'leadingAvatar' | 'leadingAvatarSize' | 'label' | 'trailingBadge' | 'trailingBadgeSize' | 'content'>;
  [key: string]: any;
}

export interface TabsProps<T extends TabsItem = TabsItem> extends Pick<TabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  items?: Array<T>;
  /**
   * @defaultValue 'primary'
   */
  color?: Tabs['variants']['color'];
  /**
   * @defaultValue 'pill'
   */
  variant?: Tabs['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Tabs['variants']['size'];
  /**
   * The orientation of the tabs.
   * @defaultValue 'horizontal'
   */
  orientation?: TabsRootProps['orientation'];
  /**
   * The content of the tabs, can be disabled to prevent rendering the content.
   * @defaultValue true
   */
  content?: boolean;
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: Tabs['slots'];
}

export interface TabsEmits extends TabsRootEmits<string | number> {}

type SlotProps<T extends TabsItem> = (props: { item: T; index: number }) => any;

export type TabsSlots<T extends TabsItem = TabsItem> = {
  'leading': SlotProps<T>;
  'default': SlotProps<T>;
  'trailing': SlotProps<T>;
  'content': SlotProps<T>;
  'list-leading': (props?: object) => any;
  'list-trailing': (props?: object) => any;
} & DynamicSlots<T, undefined, { index: number }>;

</script>

<script setup lang="ts" generic="T extends TabsItem">
import type { ComponentPublicInstance } from 'vue';
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, useForwardPropsEmits } from 'akar';
import { computed, ref } from 'vue';
import { get } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import UBadge from './badge.vue';
import PIcon from './icon.vue';

const props = withDefaults(defineProps<TabsProps<T>>(), {
  content: true,
  defaultValue: '0',
  orientation: 'horizontal',
  unmountOnHide: true,
  labelKey: 'label',
});
const emits = defineEmits<TabsEmits>();
const slots = defineSlots<TabsSlots<T>>();

const appConfig = useAppConfig() as Tabs['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'unmountOnHide'), emits);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.tabs || {}) })({
  color: props.color,
  variant: props.variant,
  size: props.size,
  orientation: props.orientation,
}));

const triggersRef = ref<Array<ComponentPublicInstance>>([]);

defineExpose({
  triggersRef,
});
</script>

<template>
  <TabsRoot
    v-bind="rootProps"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :activation-mode="activationMode"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <TabsList :class="pohon.list({ class: props.pohon?.list })">
      <TabsIndicator :class="pohon.indicator({ class: props.pohon?.indicator })" />

      <slot name="list-leading" />

      <TabsTrigger
        v-for="(item, index) of items"
        :key="index"
        :ref="el => (triggersRef[index] = el as ComponentPublicInstance)"
        :value="item.value ?? String(index)"
        :disabled="item.disabled"
        :class="pohon.trigger({ class: [props.pohon?.trigger, item.ui?.trigger] })"
      >
        <slot
          name="leading"
          :item="item"
          :index="index"
        >
          <PIcon
            v-if="item.icon"
            :name="item.icon"
            :class="pohon.leadingIcon({ class: [props.pohon?.leadingIcon, item.ui?.leadingIcon] })"
          />
          <PAvatar
            v-else-if="item.avatar"
            :size="((item.ui?.leadingAvatarSize || props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="item.avatar"
            :class="pohon.leadingAvatar({ class: [props.pohon?.leadingAvatar, item.ui?.leadingAvatar] })"
          />
        </slot>

        <span
          v-if="get(item, props.labelKey as string) || !!slots.default"
          :class="pohon.label({ class: [props.pohon?.label, item.ui?.label] })"
        >
          <slot
            :item="item"
            :index="index"
          >{{ get(item, props.labelKey as string) }}</slot>
        </span>

        <slot
          name="trailing"
          :item="item"
          :index="index"
        >
          <UBadge
            v-if="item.badge !== undefined"
            color="neutral"
            variant="outline"
            :size="((item.ui?.trailingBadgeSize || props.pohon?.trailingBadgeSize || pohon.trailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(isString(item.badge) || isNumber(item.badge)) ? { label: item.badge } : item.badge"
            :class="pohon.trailingBadge({ class: [props.pohon?.trailingBadge, item.ui?.trailingBadge] })"
          />
        </slot>
      </TabsTrigger>

      <slot name="list-trailing" />
    </TabsList>

    <template v-if="!!content">
      <TabsContent
        v-for="(item, index) of items"
        :key="index"
        :value="item.value ?? String(index)"
        :class="pohon.content({ class: [props.pohon?.content, item.ui?.content, item.class] })"
      >
        <slot
          :name="((item.slot || 'content') as keyof TabsSlots<T>)"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
        >
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
