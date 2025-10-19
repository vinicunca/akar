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
import type { PAvatarProps, PIconProps, PKbdProps, PLinkProps } from '../types';
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dropdown-menu';

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>;

export interface PDropdownMenuItem extends Omit<PLinkProps, 'type' | 'raw' | 'custom'> {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  color?: DropdownMenu['variants']['color'];
  avatar?: PAvatarProps;
  content?: Omit<ADropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ADropdownMenuContentEmits>>;
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
  children?: ArrayOrNested<PDropdownMenuItem>;
  onSelect?: (event: Event) => void;
  onUpdateChecked?: (checked: boolean) => void;
  class?: any;
  pohon?: Pick<DropdownMenu['slots'], 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLabel' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>;
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
  disabled?: boolean;
  class?: any;
  pohon?: DropdownMenu['slots'];
}

export interface PDropdownMenuEmits extends ADropdownMenuRootEmits {}

type SlotProps<T extends PDropdownMenuItem> = (props: {
  item: T;
  active?: boolean;
  index: number;
  pohon: DropdownMenu['pohon'];
}) => any;

export type PDropdownMenuSlots<
  A extends ArrayOrNested<PDropdownMenuItem> = ArrayOrNested<PDropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'default': (props: { open: boolean }) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; active?: boolean; index: number }) => any;
  'item-trailing': SlotProps<T>;
  'content-top': (props?: object) => any;
  'content-bottom': (props?: object) => any;
}
& DynamicSlots<MergeTypes<T>, 'label', { active?: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active?: boolean; index: number; pohon: DropdownMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PDropdownMenuItem>">
import { useAppConfig } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ADropdownMenuArrow,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, toRef } from 'vue';
import { uv } from '../utils/uv';
import PDropdownMenuContent from './dropdown-menu-content.vue';

const props = withDefaults(
  defineProps<PDropdownMenuProps<T>>(),
  {
    portal: true,
    modal: true,
    externalIcon: true,
    labelKey: 'label',
  },
);
const emits = defineEmits<PDropdownMenuEmits>();
const slots = defineSlots<PDropdownMenuSlots<T>>();

const appConfig = useAppConfig() as DropdownMenu['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'modal'), emits);
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as ADropdownMenuContentProps);
const arrowProps = toRef(() => props.arrow as ADropdownMenuArrowProps);
const getProxySlots = () => omit(slots, ['default']);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dropdownMenu || {}),
  })({
    size: props.size,
  }),
);
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
      :class="pohon.content({ class: [!slots.default && props.class, props.pohon?.content] })"
      :pohon="pohon"
      :pohon-override="props.pohon"
      v-bind="contentProps"
      :items="items"
      :portal="portal"
      :label-key="(labelKey as keyof NestedItem<T>)"
      :checked-icon="checkedIcon"
      :loading-icon="loadingIcon"
      :external-icon="externalIcon"
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
        :class="pohon.arrow({ class: props.pohon?.arrow })"
      />
    </PDropdownMenuContent>
  </ADropdownMenuRoot>
</template>
