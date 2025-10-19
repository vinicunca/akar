<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ATabsRootEmits, ATabsRootProps } from 'akar';
import type { PAvatarProps, PBadgeProps, PIconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/tabs';

type Tabs = ComponentConfig<typeof theme, AppConfig, 'tabs'>;

export interface PTabsItem {
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
  slot?: string;
  content?: string;
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number;
  disabled?: boolean;
  class?: any;
  pohon?: Pick<Tabs['slots'], 'trigger' | 'leadingIcon' | 'leadingAvatar' | 'leadingAvatarSize' | 'label' | 'trailingBadge' | 'trailingBadgeSize' | 'content'>;
  [key: string]: any;
}

export interface PTabsProps<T extends PTabsItem = PTabsItem> extends Pick<ATabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
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
  orientation?: ATabsRootProps['orientation'];
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

export interface PTabsEmits extends ATabsRootEmits<string | number> {}

type SlotProps<T extends PTabsItem> = (props: { item: T; index: number; pohon: Tabs['pohon'] }) => any;

export type PTabsSlots<T extends PTabsItem = PTabsItem> = {
  'leading': SlotProps<T>;
  'default': (props: { item: T; index: number }) => any;
  'trailing': SlotProps<T>;
  'content': SlotProps<T>;
  'list-leading': (props?: object) => any;
  'list-trailing': (props?: object) => any;
} & DynamicSlots<T, undefined, { index: number; pohon: Tabs['pohon'] }>;
</script>

<script setup lang="ts" generic="T extends PTabsItem">
import type { ComponentPublicInstance } from 'vue';
import { useAppConfig } from '#imports';
import { isNumber, isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ATabsContent,
  ATabsIndicator,
  ATabsList,
  ATabsRoot,
  ATabsTrigger,
  useForwardPropsEmits,
} from 'akar';
import { computed, ref } from 'vue';
import { getProp } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PBadge from './badge.vue';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PTabsProps<T>>(),
  {
    content: true,
    defaultValue: '0',
    orientation: 'horizontal',
    unmountOnHide: true,
    labelKey: 'label',
  },
);
const emits = defineEmits<PTabsEmits>();
const slots = defineSlots<PTabsSlots<T>>();

const appConfig = useAppConfig() as Tabs['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'as', 'unmountOnHide'),
  emits,
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.tabs || {}),
  })({
    color: props.color,
    variant: props.variant,
    size: props.size,
    orientation: props.orientation,
  }),
);

const triggersRef = ref<Array<ComponentPublicInstance>>([]);

defineExpose({
  triggersRef,
});
</script>

<template>
  <ATabsRoot
    v-bind="rootProps"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :activation-mode="activationMode"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <ATabsList :class="pohon.list({ class: props.pohon?.list })">
      <ATabsIndicator :class="pohon.indicator({ class: props.pohon?.indicator })" />

      <slot name="list-leading" />

      <ATabsTrigger
        v-for="(item, index) of items"
        :key="index"
        :ref="el => (triggersRef[index] = el as ComponentPublicInstance)"
        :value="item.value ?? String(index)"
        :disabled="item.disabled"
        :class="pohon.trigger({ class: [props.pohon?.trigger, item.pohon?.trigger] })"
      >
        <slot
          name="leading"
          :item="item"
          :index="index"
          :pohon="pohon"
        >
          <PIcon
            v-if="item.icon"
            :name="item.icon"
            :class="pohon.leadingIcon({ class: [props.pohon?.leadingIcon, item.pohon?.leadingIcon] })"
          />
          <PAvatar
            v-else-if="item.avatar"
            :size="((item.pohon?.leadingAvatarSize || props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="item.avatar"
            :class="pohon.leadingAvatar({ class: [props.pohon?.leadingAvatar, item.pohon?.leadingAvatar] })"
          />
        </slot>

        <span
          v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots.default"
          :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label] })"
        >
          <slot
            :item="item"
            :index="index"
          >{{ getProp({ object: item, path: props.labelKey as string }) }}</slot>
        </span>

        <slot
          name="trailing"
          :item="item"
          :index="index"
          :pohon="pohon"
        >
          <PBadge
            v-if="item.badge !== undefined"
            color="neutral"
            variant="outline"
            :size="((item.pohon?.trailingBadgeSize || props.pohon?.trailingBadgeSize || pohon.trailingBadgeSize()) as PBadgeProps['size'])"
            v-bind="(isString(item.badge) || isNumber(item.badge)) ? { label: item.badge } : item.badge"
            :class="pohon.trailingBadge({ class: [props.pohon?.trailingBadge, item.pohon?.trailingBadge] })"
          />
        </slot>
      </ATabsTrigger>

      <slot name="list-trailing" />
    </ATabsList>

    <template v-if="!!content">
      <ATabsContent
        v-for="(item, index) of items"
        :key="index"
        :value="item.value ?? String(index)"
        :class="pohon.content({ class: [props.pohon?.content, item.pohon?.content, item.class] })"
      >
        <slot
          :name="((item.slot || 'content') as keyof PTabsSlots<T>)"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
          :pohon="pohon"
        >
          {{ item.content }}
        </slot>
      </ATabsContent>
    </template>
  </ATabsRoot>
</template>
