<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ATreeItemSelectEvent, ATreeItemToggleEvent, ATreeRootEmits, ATreeRootProps } from 'akar';
import type { PIconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/tree';

type Tree = ComponentConfig<typeof theme, AppConfig, 'tree'>;

export type PTreeItem = {
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  label?: string;
  /**
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  defaultExpanded?: boolean;
  disabled?: boolean;
  slot?: string;
  children?: Array<PTreeItem>;
  onToggle?: (event: ATreeItemToggleEvent<PTreeItem>) => void;
  onSelect?: (event?: ATreeItemSelectEvent<PTreeItem>) => void;
  class?: any;
  pohon?: Pick<Tree['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkLeadingIcon' | 'linkLabel' | 'linkTrailing' | 'linkTrailingIcon' | 'listWithChildren'>;
  [key: string]: any;
};

export interface PTreeProps<T extends Array<PTreeItem> = Array<PTreeItem>, M extends boolean = false> extends Pick<ATreeRootProps<T>, 'expanded' | 'defaultExpanded' | 'selectionBehavior' | 'propagateSelect' | 'disabled' | 'bubbleSelect'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'ul'
   */
  as?: any | { root?: any; link?: any };
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
  trailingIcon?: PIconProps['name'];
  /**
   * The icon displayed when a parent node is expanded.
   * @defaultValue appConfig.pohon.icons.folderOpen
   * @IconifyIcon
   */
  expandedIcon?: PIconProps['name'];
  /**
   * The icon displayed when a parent node is collapsed.
   * @defaultValue appConfig.pohon.icons.folder
   * @IconifyIcon
   */
  collapsedIcon?: PIconProps['name'];
  items?: T;
  /** The controlled value of the Tree. Can be bind as `v-model`. */
  modelValue?: M extends true ? Array<T[number]> : T[number];
  /** The value of the Tree when initially rendered. Use when you do not need to control the state of the Tree. */
  defaultValue?: M extends true ? Array<T[number]> : T[number];
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean;
  /**
   * Use nested DOM structure (children inside parents) vs flattened structure (all items at same level).
   * When `virtualize` is enabled, this is automatically set to `false`.
   * @defaultValue true
   */
  nested?: boolean;
  /**
   * Enable virtualization for large lists.
   * Note: when enabled, the tree structure is flattened like if `nested` was set to `false`.
   * @defaultValue false
   */
  virtualize?: boolean | {
    /**
     * Number of items rendered outside the visible area
     * @defaultValue 12
     */
    overscan?: number;
    /**
     * Estimated size (in px) of each item
     * @defaultValue 32
     */
    estimateSize?: number;
  };
  onSelect?: (e: ATreeItemSelectEvent<T[number]>, item: T[number]) => void;
  onToggle?: (e: ATreeItemToggleEvent<T[number]>, item: T[number]) => void;
  class?: any;
  pohon?: Tree['slots'];
}

export type PTreeEmits<T extends Array<PTreeItem> = Array<PTreeItem>, M extends boolean = false> = ATreeRootEmits<T[number], M>;

type SlotProps<T extends PTreeItem> = (props: {
  item: T;
  index: number;
  level: number;
  expanded: boolean;
  selected: boolean;
  indeterminate: boolean | undefined;
  handleSelect: () => void;
  handleToggle: () => void;
}) => any;

export type PTreeSlots<
  T extends Array<PTreeItem> = Array<PTreeItem>,
> = {
  'item-wrapper': SlotProps<T[number]>;
  'item': SlotProps<T[number]>;
  'item-leading': SlotProps<T[number]>;
  'item-label': SlotProps<T[number]>;
  'item-trailing': SlotProps<T[number]>;
} & DynamicSlots<T[number], undefined, {
  index: number;
  level: number;
  expanded: boolean;
  pohon: Tree['pohon'];
  selected: boolean;
  indeterminate: boolean | undefined;
  handleSelect: () => void;
  handleToggle: () => void;
}>;
</script>

<script setup lang="ts" generic="T extends PTreeItem[], M extends boolean = false">
import type { ComponentPublicInstance } from 'vue';
import { useAppConfig } from '#imports';
import { isBoolean, isFunction, isString } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { ATreeItem, ATreeRoot, ATreeVirtualizer, useForwardPropsEmits } from 'akar';
import { defu } from 'defu';
import { computed, toRef, useTemplateRef } from 'vue';
import { getProp } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PTreeProps<T, M>>(),
  {
    labelKey: 'label',
    nested: true,
    virtualize: false,
  },
);
const emits = defineEmits<PTreeEmits<T, M>>();
const slots = defineSlots<PTreeSlots<T>>();

const appConfig = useAppConfig() as Tree['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'items',
    'multiple',
    'expanded',
    'disabled',
    'propagateSelect',
    'bubbleSelect',
  ),
  emits,
);

const as = computed(() => {
  if (isString(props.as) || isFunction(props.as?.render)) {
    return { root: props.as, link: 'button' };
  }

  return defu(props.as, { root: 'ul', link: 'button' });
});

const nested = computed(() => props.virtualize ? false : props.nested);

const flattenedPaddingFormula = computed(() => {
  const sizeConfig = {
    xs: { base: 2, perLevel: 5.5 }, // px-2, ms-4 + ps-1.5
    sm: { base: 2.5, perLevel: 6 }, // px-2.5, ms-4.5 + ps-1.5
    md: { base: 2.5, perLevel: 6.5 }, // px-2.5, ms-5 + ps-1.5
    lg: { base: 3, perLevel: 7 }, // px-3, ms-5.5 + ps-1.5
    xl: { base: 3, perLevel: 7.5 }, // px-3, ms-6 + ps-1.5
  };
  const config = sizeConfig[props.size || 'md'];
  return (level: number) => `calc(var(--spacing) * ${(level - 1) * config.perLevel + config.base})`;
});

const virtualizerProps = toRef(() =>
  !!props.virtualize && defu(
    isBoolean(props.virtualize) ? {} : props.virtualize,
    {
      estimateSize: ({
        xs: 24,
        sm: 28,
        md: 32,
        lg: 36,
        xl: 40,
      })[props.size || 'md'],
    },
  ));

const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate<{ items?: Array<PTreeItem>; level: number }, PTreeSlots<T>>();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{
  item: PTreeItem;
  index: number;
  level: number;
}, PTreeSlots<T>>({
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.tree || {}),
  })({
    color: props.color,
    size: props.size,
    virtualize: !!props.virtualize,
  }),
);

const rootRef = useTemplateRef<ComponentPublicInstance>('rootRef');

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

defineExpose({
  get $el() {
    return rootRef.value?.$el as HTMLElement;
  },
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineItemTemplate v-slot="{ item, index, level }">
    <li
      role="presentation"
      :class="!!nested && level > 1
        ? pohon.itemWithChildren({ class: [props.pohon?.itemWithChildren, item.pohon?.itemWithChildren] })
        : pohon.item({ class: [props.pohon?.item, item.pohon?.item] })"
      data-pohon="tree-item"
    >
      <ATreeItem
        v-slot="{ isExpanded, isSelected, isIndeterminate, handleSelect, handleToggle }"
        :level="level"
        :value="item"
        as-child
        @toggle="(item.onToggle ?? props.onToggle)?.($event, item)"
        @select="(item.onSelect ?? props.onSelect)?.($event, item)"
      >
        <slot
          :name="((item.slot ? `${item.slot}-wrapper` : 'item-wrapper') as keyof PTreeSlots<T>)"
          v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, pohon }"
          :item="(item as Extract<T[number], { slot: string; }>)"
        >
          <component
            :is="as.link"
            :type="as.link === 'button' ? 'button' : undefined"
            :disabled="item.disabled || disabled"
            :class="pohon.link({
              class: [props.pohon?.link, item.pohon?.link, item.class],
              selected: isSelected,
              disabled: item.disabled || disabled,
            })"
            :style="!nested && level > 1
              ? { paddingLeft: flattenedPaddingFormula(level) }
              : undefined"
            tabindex="0"
            data-pohon="tree-link"
          >
            <slot
              :name="((item.slot || 'item') as keyof PTreeSlots<T>)"
              v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, pohon }"
              :item="(item as Extract<T[number], { slot: string; }>)"
            >
              <slot
                :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PTreeSlots<T>)"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, pohon }"
                :item="(item as Extract<T[number], { slot: string; }>)"
              >
                <PIcon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="pohon.linkLeadingIcon({
                    class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon],
                  })"
                  data-pohon="tree-link-leading-icon"
                />

                <PIcon
                  v-else-if="item.children?.length"
                  :name="isExpanded ? (expandedIcon ?? appConfig.pohon.icons.folderOpen) : (collapsedIcon ?? appConfig.pohon.icons.folder)"
                  :class="pohon.linkLeadingIcon({
                    class: [props.pohon?.linkLeadingIcon, item.pohon?.linkLeadingIcon],
                  })"
                  data-pohon="tree-link-leading-icon"
                />
              </slot>

              <span
                v-if="getItemLabel(item) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PTreeSlots<T>]"
                :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.pohon?.linkLabel] })"
                data-pohon="tree-link-label"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PTreeSlots<T>)"
                  v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, pohon }"
                  :item="(item as Extract<T[number], { slot: string; }>)"
                >
                  {{ getItemLabel(item) }}
                </slot>
              </span>

              <span
                v-if="item.trailingIcon || item.children?.length || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PTreeSlots<T>]"
                :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, item.pohon?.linkTrailing] })"
                data-pohon="tree-link-trailing"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PTreeSlots<T>)"
                  v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, pohon }"
                  :item="(item as Extract<T[number], { slot: string; }>)"
                >
                  <PIcon
                    v-if="item.trailingIcon"
                    :name="item.trailingIcon"
                    :class="pohon.linkTrailingIcon({
                      class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon],
                    })"
                    data-pohon="tree-link-trailing-icon"
                  />
                  <PIcon
                    v-else-if="item.children?.length"
                    :name="trailingIcon ?? appConfig.pohon.icons.chevronDown"
                    :class="pohon.linkTrailingIcon({
                      class: [props.pohon?.linkTrailingIcon, item.pohon?.linkTrailingIcon],
                    })"
                    data-pohon="tree-link-trailing-icon"
                  />
                </slot>
              </span>
            </slot>
          </component>
        </slot>

        <ul
          v-if="nested && item.children?.length && isExpanded"
          role="group"
          :class="pohon.listWithChildren({
            class: [props.pohon?.listWithChildren, item.pohon?.listWithChildren],
          })"
          data-pohon="tree-list-with-children"
        >
          <ReuseTreeTemplate
            :items="item.children"
            :level="level + 1"
          />
        </ul>
      </ATreeItem>
    </li>
  </DefineItemTemplate>

  <DefineTreeTemplate v-slot="{ items, level }">
    <ReuseItemTemplate
      v-for="(item, index) in items"
      :key="`${level}-${index}`"
      :item="item"
      :index="index"
      :level="level"
    />
  </DefineTreeTemplate>

  <ATreeRoot
    ref="rootRef"
    v-slot="{ flattenItems }"
    v-bind="{ ...rootProps, ...$attrs }"
    :as="as.root"
    :model-value="modelValue"
    :default-value="defaultValue"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="tree-root"
    :get-key="getItemKey"
    :default-expanded="defaultExpanded"
    :selection-behavior="selectionBehavior"
  >
    <ATreeVirtualizer
      v-if="!!virtualize"
      v-slot="{ item, virtualItem }"
      :text-content="item => getItemLabel(item.value)"
      v-bind="virtualizerProps"
    >
      <ReuseItemTemplate
        :item="item.value"
        :index="virtualItem.index"
        :level="item.level"
      />
    </ATreeVirtualizer>

    <template v-else-if="!nested">
      <ReuseItemTemplate
        v-for="(item, index) in flattenItems"
        :key="item._id"
        :item="item.value"
        :index="index"
        :level="item.level"
      />
    </template>

    <ReuseTreeTemplate
      v-else
      :items="items"
      :level="1"
    />
  </ATreeRoot>
</template>
