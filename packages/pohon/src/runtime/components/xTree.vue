<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { TreeRootProps, TreeRootEmits } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/tree'
import type { IconProps } from '../types'
import type { DynamicSlots, GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/uv'

type Tree = ComponentConfig<typeof theme, AppConfig, 'tree'>

export type TreeItem = {
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name']
  label?: string
  /**
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name']
  defaultExpanded?: boolean
  disabled?: boolean
  slot?: string
  children?: TreeItem[]
  onToggle?(e: Event): void
  onSelect?(e?: Event): void
  class?: any
  pohon?: Pick<Tree['slots'], 'item' | 'itemWithChildren' | 'link' | 'linkLeadingIcon' | 'linkLabel' | 'linkTrailing' | 'linkTrailingIcon' | 'listWithChildren'>
  [key: string]: any
}

export interface TreeProps<T extends TreeItem[] = TreeItem[], M extends boolean = false> extends Pick<TreeRootProps<T>, 'expanded' | 'defaultExpanded' | 'selectionBehavior' | 'propagateSelect' | 'disabled' | 'bubbleSelect'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'ul'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'primary'
   */
  color?: Tree['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Tree['variants']['size']
  /** This function is passed the index of each item and should return a unique key for that item */
  getKey?: (val: T[number]) => string
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  /**
   * The icon displayed on the right side of a parent node.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name']
  /**
   * The icon displayed when a parent node is expanded.
   * @defaultValue appConfig.pohon.icons.folderOpen
   * @IconifyIcon
   */
  expandedIcon?: IconProps['name']
  /**
   * The icon displayed when a parent node is collapsed.
   * @defaultValue appConfig.pohon.icons.folder
   * @IconifyIcon
   */
  collapsedIcon?: IconProps['name']
  items?: T
  /** The controlled value of the Tree. Can be bind as `v-model`. */
  modelValue?: M extends true ? T[number][] : T[number]
  /** The value of the Tree when initially rendered. Use when you do not need to control the state of the Tree. */
  defaultValue?: M extends true ? T[number][] : T[number]
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  class?: any
  pohon?: Tree['slots']
}

export type TreeEmits<T extends TreeItem[] = TreeItem[], M extends boolean = false> = TreeRootEmits<T[number], M>

type SlotProps<T extends TreeItem> = (props: { item: T, index: number, level: number, expanded: boolean, selected: boolean }) => any

export type TreeSlots<
  T extends TreeItem[] = TreeItem[]
> = {
  'item-wrapper': SlotProps<T[number]>
  'item': SlotProps<T[number]>
  'item-leading': SlotProps<T[number]>
  'item-label': SlotProps<T[number]>
  'item-trailing': SlotProps<T[number]>
} & DynamicSlots<T[number], undefined, { index: number, level: number, expanded: boolean, selected: boolean }>

</script>

<script setup lang="ts" generic="T extends TreeItem[], M extends boolean = false">
import { computed } from 'vue'
import { TreeRoot, TreeItem, useForwardPropsEmits } from 'akar'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { uv } from '../utils/uv'
import PIcon from './icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TreeProps<T, M>>(), {
  labelKey: 'label'
})
const emits = defineEmits<TreeEmits<T, M>>()
const slots = defineSlots<TreeSlots<T>>()

const appConfig = useAppConfig() as Tree['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'items', 'multiple', 'expanded', 'disabled', 'propagateSelect', 'bubbleSelect'), emits)

const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate<{ items?: TreeItem[], level: number }, TreeSlots<T>>()

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.tree || {}) })({
  color: props.color,
  size: props.size
}))

function getItemLabel<Item extends T[number]>(item: Item): string {
  return get(item, props.labelKey as string)
}

function getItemKey<Item extends T[number]>(item: Item): string {
  return props.getKey
    ? props.getKey(item) || getItemLabel(item)
    : getItemLabel(item)
}

function getDefaultOpenedItems(item: T[number]): string[] {
  const currentItem = item.defaultExpanded ? getItemKey(item) : null
  const childItems = item.children?.flatMap((child: T[number]) => getDefaultOpenedItems(child)) ?? []

  return [currentItem, ...childItems].filter(Boolean) as string[]
}

const defaultExpanded = computed(() =>
  props.defaultExpanded ?? props.items?.flatMap(item => getDefaultOpenedItems(item))
)
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineTreeTemplate v-slot="{ items, level }">
    <TreeItem
      v-for="(item, index) in items"
      :key="`${level}-${index}`"
      v-slot="{ isExpanded, isSelected }"
      :level="level"
      :value="item"
      :class="level > 1 ? pohon.itemWithChildren({ class: [props.pohon?.itemWithChildren, item.ui?.itemWithChildren] }) : pohon.item({ class: [props.pohon?.item, item.ui?.item] })"
      @toggle="item.onToggle"
      @select="item.onSelect"
    >
      <slot
        :name="((item.slot ? `${item.slot}-wrapper` : 'item-wrapper') as keyof TreeSlots<T>)"
        v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
        :item="(item as Extract<T[number], { slot: string; }>)"
      >
        <button
          type="button"
          :disabled="item.disabled || disabled"
          :data-expanded="isExpanded"
          :class="pohon.link({ class: [props.pohon?.link, item.ui?.link, item.class], selected: isSelected, disabled: item.disabled || disabled })"
        >
          <slot
            :name="((item.slot || 'item') as keyof TreeSlots<T>)"
            v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
            :item="(item as Extract<T[number], { slot: string; }>)"
          >
            <slot
              :name="((item.slot ? `${item.slot}-leading`: 'item-leading') as keyof TreeSlots<T>)"
              v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
              :item="(item as Extract<T[number], { slot: string; }>)"
            >
              <PIcon
                v-if="item.icon"
                :name="item.icon"
                :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, item.ui?.linkLeadingIcon] })"
              />
              <PIcon
                v-else-if="item.children?.length"
                :name="isExpanded ? (expandedIcon ?? appConfig.pohon.icons.folderOpen) : (collapsedIcon ?? appConfig.pohon.icons.folder)"
                :class="pohon.linkLeadingIcon({ class: [props.pohon?.linkLeadingIcon, item.ui?.linkLeadingIcon] })"
              />
            </slot>

            <span
              v-if="getItemLabel(item) || !!slots[(item.slot ? `${item.slot}-label`: 'item-label') as keyof TreeSlots<T>]"
              :class="pohon.linkLabel({ class: [props.pohon?.linkLabel, item.ui?.linkLabel] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-label`: 'item-label') as keyof TreeSlots<T>)"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
                :item="(item as Extract<T[number], { slot: string; }>)"
              >
                {{ getItemLabel(item) }}
              </slot>
            </span>

            <span
              v-if="item.trailingIcon || item.children?.length || !!slots[(item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof TreeSlots<T>]"
              :class="pohon.linkTrailing({ class: [props.pohon?.linkTrailing, item.ui?.linkTrailing] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof TreeSlots<T>)"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected }"
                :item="(item as Extract<T[number], { slot: string; }>)"
              >
                <PIcon
                  v-if="item.trailingIcon"
                  :name="item.trailingIcon"
                  :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.ui?.linkTrailingIcon] })"
                />
                <PIcon
                  v-else-if="item.children?.length"
                  :name="trailingIcon ?? appConfig.pohon.icons.chevronDown"
                  :class="pohon.linkTrailingIcon({ class: [props.pohon?.linkTrailingIcon, item.ui?.linkTrailingIcon] })"
                />
              </slot>
            </span>
          </slot>
        </button>
      </slot>

      <ul
        v-if="item.children?.length && isExpanded"
        role="group"
        :class="pohon.listWithChildren({ class: [props.pohon?.listWithChildren, item.ui?.listWithChildren] })"
      >
        <ReuseTreeTemplate :items="item.children" :level="level + 1" />
      </ul>
    </TreeItem>
  </DefineTreeTemplate>

  <TreeRoot
    v-bind="{ ...rootProps, ...$attrs }"
    :model-value="modelValue"
    :default-value="defaultValue"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :get-key="getItemKey"
    :default-expanded="defaultExpanded"
    :selection-behavior="selectionBehavior"
  >
    <ReuseTreeTemplate :items="items" :level="1" />
  </TreeRoot>
</template>
