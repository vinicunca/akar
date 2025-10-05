<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps, ATreeRootEmits, ATreeRootProps } from 'akar';
import type { IconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/tree';

type Tree = ComponentConfig<typeof theme, AppConfig, 'tree'>;

export type PTreeItem = {
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  label?: string;
  /**
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
  defaultExpanded?: boolean;
  disabled?: boolean;
  slot?: string;
  children?: Array<PTreeItem>;
  onToggle?: (event: Event) => void;
  onSelect?: (event?: Event) => void;
  class?: any;
  pohon?: Pick<Tree['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkLeadingIcon' | 'linkLabel' | 'linkTrailing' | 'linkTrailingIcon' | 'listWithChildren'>;
  [key: string]: any;
};

export interface PTreeProps<T extends Array<PTreeItem> = Array<PTreeItem>, M extends boolean = false> extends Pick<ATreeRootProps<T>, 'expanded' | 'defaultExpanded' | 'selectionBehavior' | 'propagateSelect' | 'disabled' | 'bubbleSelect'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'ul'
   */
  as?: any;
  /**
   * @defaultValue 'primary'
   */
  color?: Tree['variants']['color'];
  /**
   * @defaultValue 'md'
   */
  size?: Tree['variants']['size'];
  /** This function is passed the index of each item and should return a unique key for that item */
  getKey?: (val: T[number]) => string;
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  /**
   * The icon displayed on the right side of a parent node.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
  /**
   * The icon displayed when a parent node is expanded.
   * @defaultValue appConfig.pohon.icons.folderOpen
   * @IconifyIcon
   */
  expandedIcon?: IconProps['name'];
  /**
   * The icon displayed when a parent node is collapsed.
   * @defaultValue appConfig.pohon.icons.folder
   * @IconifyIcon
   */
  collapsedIcon?: IconProps['name'];
  items?: T;
  /** The controlled value of the Tree. Can be bind as `v-model`. */
  modelValue?: M extends true ? Array<T[number]> : T[number];
  /** The value of the Tree when initially rendered. Use when you do not need to control the state of the Tree. */
  defaultValue?: M extends true ? Array<T[number]> : T[number];
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean;
  class?: any;
  pohon?: Tree['slots'];
}

export type PTreeEmits<T extends Array<PTreeItem> = Array<PTreeItem>, M extends boolean = false> = ATreeRootEmits<T[number], M>;

type SlotProps<T extends PTreeItem> = (props: { item: T; index: number; level: number; expanded: boolean; selected: boolean }) => any;

export type PTreeSlots<
  T extends Array<PTreeItem> = Array<PTreeItem>,
> = {
  'item-wrapper': SlotProps<T[number]>;
  'item': SlotProps<T[number]>;
  'item-leading': SlotProps<T[number]>;
  'item-label': SlotProps<T[number]>;
  'item-trailing': SlotProps<T[number]>;
} & DynamicSlots<T[number], undefined, { index: number; level: number; expanded: boolean; selected: boolean }>;
</script>

<script setup lang="ts" generic="T extends PTreeItem[], M extends boolean = false">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { ATreeItem, ATreeRoot, useForwardPropsEmits } from 'akar';
import { computed } from 'vue';
import { getProp } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PTreeProps<T, M>>(),
  {
    labelKey: 'label',
  },
);
const emits = defineEmits<PTreeEmits<T, M>>();
const slots = defineSlots<PTreeSlots<T>>();

const appConfig = useAppConfig() as Tree['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'items',
    'multiple',
    'expanded',
    'disabled',
    'propagateSelect',
    'bubbleSelect',
  ),
  emits,
);

const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate<{ items?: Array<PTreeItem>; level: number }, PTreeSlots<T>>();

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.tree || {}),
  })({
    color: props.color,
    size: props.size,
  }),
);

function getItemLabel<Item extends T[number]>(item: Item): string {
  return getProp({ object: item, path: props.labelKey as string });
}

function getItemKey<Item extends T[number]>(item: Item): string {
  return props.getKey
    ? props.getKey(item) || getItemLabel(item)
    : getItemLabel(item);
}

function getDefaultOpenedItems(item: T[number]): Array<string> {
  const currentItem = item.defaultExpanded ? getItemKey(item) : null;
  const childItems = item.children?.flatMap((child: T[number]) => getDefaultOpenedItems(child)) ?? [];

  return [currentItem, ...childItems].filter(Boolean) as Array<string>;
}

const defaultExpanded = computed(() =>
  props.defaultExpanded ?? props.items?.flatMap((item) => getDefaultOpenedItems(item)),
);
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineTreeTemplate v-slot="{ items, level }">
    <ATreeItem
      v-for="(item, index) in items"
      :key="`${level}-${index}`"
      v-slot="{ isExpanded, isSelected }"
      :level="level"
      :value="item"
      :class="level > 1
        ? pohon.itemWithChildren({ class: [props.pohon?.itemWithChildren, item.pohon?.itemWithChildren] })
        : pohon.item({ class: [props.pohon?.item, item.pohon?.item] })
      "
      @toggle="item.onToggle"
      @select="item.onSelect"
    >
      <slot
        :name="((item.slot ? `${item.slot}-wrapper` : 'item-wrapper') as keyof PTreeSlots<T>)"
        v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
        :item="(item as Extract<T[number], { slot: string; }>)"
      >
        <button
          type="button"
          :disabled="item.disabled || disabled"
          :data-expanded="isExpanded"
          :class="pohon.link({
            class: [props.pohon?.link, item.pohon?.link, item.class], selected: isSelected, disabled: item.disabled || disabled,
          })"
        >
          <slot
            :name="((item.slot || 'item') as keyof PTreeSlots<T>)"
            v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
            :item="(item as Extract<T[number], { slot: string; }>)"
          >
            <slot
              :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PTreeSlots<T>)"
              v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
              :item="(item as Extract<T[number], { slot: string; }>)"
            >
              <PIcon
                v-if="item.icon"
                :name="item.icon"
                :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon] })"
              />
              <PIcon
                v-else-if="item.children?.length"
                :name="isExpanded ? (expandedIcon ?? appConfig.pohon.icons.folderOpen) : (collapsedIcon ?? appConfig.pohon.icons.folder)"
                :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon] })"
              />
            </slot>

            <span
              v-if="getItemLabel(item) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PTreeSlots<T>]"
              :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.pohon?.linkLabel] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PTreeSlots<T>)"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
                :item="(item as Extract<T[number], { slot: string; }>)"
              >
                {{ getItemLabel(item) }}
              </slot>
            </span>

            <span
              v-if="item.trailingIcon || item.children?.length || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PTreeSlots<T>]"
              :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, item.pohon?.linkTrailing] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PTreeSlots<T>)"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
                :item="(item as Extract<T[number], { slot: string; }>)"
              >
                <PIcon
                  v-if="item.trailingIcon"
                  :name="item.trailingIcon"
                  :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon] })"
                />
                <PIcon
                  v-else-if="item.children?.length"
                  :name="trailingIcon ?? appConfig.pohon.icons.chevronDown"
                  :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon] })"
                />
              </slot>
            </span>
          </slot>
        </button>
      </slot>

      <ul
        v-if="item.children?.length && isExpanded"
        role="group"
        :class="pohon.listWithChildren({ class: [props.pohon?.listWithChildren, item.pohon?.listWithChildren] })"
      >
        <ReuseTreeTemplate
          :items="item.children"
          :level="level + 1"
        />
      </ul>
    </ATreeItem>
  </DefineTreeTemplate>

  <ATreeRoot
    v-bind="{ ...rootProps, ...$attrs }"
    :model-value="modelValue"
    :default-value="defaultValue"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :get-key="getItemKey"
    :default-expanded="defaultExpanded"
    :selection-behavior="selectionBehavior"
  >
    <ReuseTreeTemplate
      :items="items"
      :level="1"
    />
  </ATreeRoot>
</template>
