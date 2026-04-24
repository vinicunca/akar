<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ADropdownMenuArrowProps,
  ADropdownMenuContentEmits,
  ADropdownMenuContentProps,
  ADropdownMenuRootEmits,
  ADropdownMenuRootProps,
} from 'akar';
import type { VNode } from 'vue';
import type { PAvatarProps, PIconProps, PInputProps, PKbdProps, PLinkProps } from '../types';
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dropdown-menu';

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>;

export interface PDropdownMenuItem extends Omit<PLinkProps, 'type' | 'raw' | 'custom'> {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  color?: DropdownMenu['variants']['color'];
  avatar?: PAvatarProps;
  content?: Omit<ADropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & { class?: any } & Partial<EmitsToProps<ADropdownMenuContentEmits>>;
  kbds?: Array<PKbdProps['value']> | Array<PKbdProps>;
  /**
   * The item type.
   * @defaultValue 'link'
   */
  type?: 'label' | 'separator' | 'link' | 'checkbox';
  slot?: string;
  loading?: boolean;
  disabled?: boolean;
  checked?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  filter?: boolean | Omit<PInputProps, 'modelValue' | 'defaultValue'>;
  filterFields?: Array<string>;
  ignoreFilter?: boolean;
  children?: ArrayOrNested<PDropdownMenuItem>;
  onSelect?: (event: Event) => void;
  onUpdateChecked?: (checked: boolean) => void;
  class?: any;
  pohon?: Pick<DropdownMenu['slots'], 'content' | 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>;
  [key: string]: any;
}

export interface PDropdownMenuProps<T extends ArrayOrNested<PDropdownMenuItem> = ArrayOrNested<PDropdownMenuItem>> extends Omit<ADropdownMenuRootProps, 'dir'> {
  /**
   * @defaultValue 'md'
   */
  size?: DropdownMenu['variants']['size'];
  items?: T;
  /**
   * The icon displayed when an item is checked.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  checkedIcon?: PIconProps['name'];
  /**
   * The icon displayed when an item is loading.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name'];
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @defaultValue appConfig.pohon.icons.external
   * @IconifyIcon
   */
  externalIcon?: boolean | PIconProps['name'];
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<ADropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ADropdownMenuContentEmits>>;
  /**
   * Display an arrow alongside the menu.
   * `{ rounded: true }`{lang="ts-type"}
   * @defaultValue false
   */
  arrow?: boolean | Omit<ADropdownMenuArrowProps, 'as' | 'asChild'>;
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  /**
   * The key used to get the description from the item.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>;
  /**
   * Whether to display a filter input or not.
   * Can be an object to pass additional props to the input.
   * `{ placeholder: 'Search...', variant: 'none' }`{lang="ts-type"}
   * @defaultValue false
   */
  filter?: boolean | Omit<PInputProps, 'modelValue' | 'defaultValue'>;
  /**
   * The fields to filter by.
   * @defaultValue [labelKey]
   */
  filterFields?: Array<string>;
  /**
   * When `true`, items will not be filtered which is useful for custom filtering.
   * @defaultValue false
   */
  ignoreFilter?: boolean;
  disabled?: boolean;
  class?: any;
  pohon?: DropdownMenu['slots'];
}

export interface PDropdownMenuEmits extends ADropdownMenuRootEmits {}

type SlotProps<T extends PDropdownMenuItem> = (props: { item: T; active: boolean; index: number; pohon: DropdownMenu['pohon'] }) => Array<VNode>;

export type PDropdownMenuSlots<
  A extends ArrayOrNested<PDropdownMenuItem> = ArrayOrNested<PDropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'default'?: (props: { open: boolean }) => Array<VNode>;
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; active: boolean; index: number }) => Array<VNode>;
  'item-description'?: (props: { item: T; active: boolean; index: number }) => Array<VNode>;
  'item-trailing'?: SlotProps<T>;
  'empty'?: (props: { searchTerm: string }) => Array<VNode>;
  'content-top'?: (props: { sub: boolean }) => Array<VNode>;
  'content-bottom'?: (props: { sub: boolean }) => Array<VNode>;
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active: boolean; index: number; pohon: DropdownMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PDropdownMenuItem>">
import { reactivePick } from '@vueuse/core';
import {
  ADropdownMenuArrow,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PDropdownMenuContent from './dropdown-menu-content.vue';

const props = withDefaults(defineProps<PDropdownMenuProps<T>>(), {
  portal: true,
  modal: true,
  externalIcon: true,
  labelKey: 'label',
  descriptionKey: 'description',
  filter: false,
  ignoreFilter: false,
});
const emits = defineEmits<PDropdownMenuEmits>();
const slots = defineSlots<PDropdownMenuSlots<T>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const appConfig = useAppConfig() as DropdownMenu['AppConfig'];
const pohonProp = useComponentPohon('dropdownMenu', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'modal'), emits);
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as ADropdownMenuContentProps);
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as ADropdownMenuArrowProps);
const getProxySlots = () => omit(slots, ['default']);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dropdownMenu || {}) })({
  size: props.size,
}));
</script>

<template>
  <ADropdownMenuRoot
    v-slot="{ open }"
    v-bind="rootProps"
  >
    <ADropdownMenuTrigger
      v-if="!!slots.default"
      as-child
      :class="props.class"
      :disabled="disabled"
    >
      <slot :open="open" />
    </ADropdownMenuTrigger>

    <PDropdownMenuContent
      v-model:search-term="searchTerm"
      :class="pohon.content({ class: [!slots.default && props.class, pohonProp?.content] })"
      :pohon="pohon"
      :pohon-override="pohonProp"
      v-bind="contentProps"
      :items="items"
      :portal="portal"
      :label-key="(labelKey as string & keyof NestedItem<T>)"
      :description-key="(descriptionKey as string & keyof NestedItem<T>)"
      :checked-icon="checkedIcon"
      :loading-icon="loadingIcon"
      :external-icon="externalIcon"
      :size="size"
      :filter="filter"
      :filter-fields="filterFields"
      :ignore-filter="ignoreFilter"
    >
      <template
        v-for="(_, name) in getProxySlots()"
        #[name]="slotData"
      >
        <slot
          :name="(name as keyof PDropdownMenuSlots<T>)"
          v-bind="slotData"
        />
      </template>

      <ADropdownMenuArrow
        v-if="!!arrow"
        v-bind="arrowProps"
        data-slot="arrow"
        :class="pohon.arrow({ class: pohonProp?.arrow })"
      />
    </PDropdownMenuContent>
  </ADropdownMenuRoot>
</template>
