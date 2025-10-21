<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AContextMenuContentEmits,
  AContextMenuContentProps,
  AContextMenuRootEmits,
  AContextMenuRootProps,
} from 'akar';
import type { PAvatarProps, PIconProps, PKbdProps, PLinkProps } from '../types';
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/context-menu';

type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>;

export interface PContextMenuItem extends Omit<PLinkProps, 'type' | 'raw' | 'custom'> {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  color?: ContextMenu['variants']['color'];
  avatar?: PAvatarProps;
  content?: Omit<AContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<AContextMenuContentEmits>>;
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
  children?: ArrayOrNested<PContextMenuItem>;
  onSelect?: (event: Event) => void;
  onUpdateChecked?: (checked: boolean) => void;
  class?: any;
  pohon?: Pick<ContextMenu['slots'], 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>;
  [key: string]: any;
}

export interface PContextMenuProps<T extends ArrayOrNested<PContextMenuItem> = ArrayOrNested<PContextMenuItem>> extends Omit<AContextMenuRootProps, 'dir'> {
  /**
   * @defaultValue 'md'
   */
  size?: ContextMenu['variants']['size'];
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
  /** The content of the menu. */
  content?: Omit<AContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<AContextMenuContentEmits>>;
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
  disabled?: boolean;
  class?: any;
  pohon?: ContextMenu['slots'];
}

export interface PContextMenuEmits extends AContextMenuRootEmits {}

type SlotProps<T extends PContextMenuItem> = (props: { item: T; active?: boolean; index: number; pohon: ContextMenu['pohon'] }) => any;

export type PContextMenuSlots<
  A extends ArrayOrNested<PContextMenuItem> = ArrayOrNested<PContextMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'default': (props?: object) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; active?: boolean; index: number }) => any;
  'item-description': (props: { item: T; active?: boolean; index: number }) => any;
  'item-trailing': SlotProps<T>;
  'content-top': (props?: object) => any;
  'content-bottom': (props?: object) => any;
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active?: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active?: boolean; index: number; pohon: ContextMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PContextMenuItem>">
import { useAppConfig } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  AContextMenuRoot,
  AContextMenuTrigger,
  useForwardPropsEmits,
} from 'akar';
import { computed, toRef } from 'vue';
import { uv } from '../utils/uv';
import PContextMenuContent from './context-menu-content.vue';

const props = withDefaults(
  defineProps<PContextMenuProps<T>>(),
  {
    portal: true,
    modal: true,
    externalIcon: true,
    labelKey: 'label',
    descriptionKey: 'description',
  },
);
const emits = defineEmits<PContextMenuEmits>();
const slots = defineSlots<PContextMenuSlots<T>>();

const appConfig = useAppConfig() as ContextMenu['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'modal'), emits);
const contentProps = toRef(() => props.content);
const getProxySlots = () => omit(slots, ['default']);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contextMenu || {}),
  })({
    size: props.size,
  }),
);
</script>

<template>
  <AContextMenuRoot v-bind="rootProps">
    <AContextMenuTrigger
      v-if="!!slots.default"
      as-child
      :disabled="disabled"
      :class="props.class"
    >
      <slot />
    </AContextMenuTrigger>

    <PContextMenuContent
      :class="pohon.content({ class: [!slots.default && props.class, props.pohon?.content] })"
      :pohon="pohon"
      :pohon-override="props.pohon"
      v-bind="contentProps"
      :items="items"
      :portal="portal"
      :label-key="(labelKey as keyof NestedItem<T>)"
      :description-key="(descriptionKey as keyof NestedItem<T>)"
      :checked-icon="checkedIcon"
      :loading-icon="loadingIcon"
      :external-icon="externalIcon"
    >
      <template
        v-for="(_, name) in getProxySlots()"
        #[name]="slotData"
      >
        <slot
          :name="(name as keyof PContextMenuSlots<T>)"
          v-bind="slotData"
        />
      </template>
    </PContextMenuContent>
  </AContextMenuRoot>
</template>
