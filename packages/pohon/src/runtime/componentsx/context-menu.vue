<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ContextMenuContentEmits, ContextMenuContentProps, ContextMenuRootEmits, ContextMenuRootProps } from 'akar';
import type { VNode } from 'vue';
import type { AAvatarProps, KbdProps, LinkProps, PIconProps } from '../types';
import type { ArrayOrNested, DynamicSlots, EmitsToProps, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/context-menu';

type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>;

export interface ContextMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  color?: ContextMenu['variants']['color'];
  avatar?: AAvatarProps;
  content?: Omit<ContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> & { class?: any } & Partial<EmitsToProps<ContextMenuContentEmits>>;
  kbds?: Array<KbdProps['value']> | Array<KbdProps>;
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
  children?: ArrayOrNested<ContextMenuItem>;
  onSelect?: (e: Event) => void;
  onUpdateChecked?: (checked: boolean) => void;
  class?: any;
  pohon?: Pick<ContextMenu['slots'], 'content' | 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>;
  [key: string]: any;
}

export interface ContextMenuProps<T extends ArrayOrNested<ContextMenuItem> = ArrayOrNested<ContextMenuItem>> extends Omit<ContextMenuRootProps, 'dir'> {
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
  content?: Omit<ContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ContextMenuContentEmits>>;
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

export interface ContextMenuEmits extends ContextMenuRootEmits {}

type SlotProps<T extends ContextMenuItem> = (props: { item: T; active: boolean; index: number; pohon: ContextMenu['pohon'] }) => Array<VNode>;

export type ContextMenuSlots<
  A extends ArrayOrNested<ContextMenuItem> = ArrayOrNested<ContextMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'default'?: (props?: {}) => Array<VNode>;
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; active: boolean; index: number }) => Array<VNode>;
  'item-description'?: (props: { item: T; active: boolean; index: number }) => Array<VNode>;
  'item-trailing'?: SlotProps<T>;
  'content-top'?: (props: { sub: boolean }) => Array<VNode>;
  'content-bottom'?: (props: { sub: boolean }) => Array<VNode>;
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active: boolean; index: number; pohon: ContextMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<ContextMenuItem>">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { ContextMenuRoot, ContextMenuTrigger, useForwardPropsEmits } from 'akar';
import { computed, toRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import UContextMenuContent from './ContextMenuContent.vue';

const props = withDefaults(defineProps<ContextMenuProps<T>>(), {
  portal: true,
  modal: true,
  externalIcon: true,
  labelKey: 'label',
  descriptionKey: 'description',
});
const emits = defineEmits<ContextMenuEmits>();
const slots = defineSlots<ContextMenuSlots<T>>();

const appConfig = useAppConfig() as ContextMenu['AppConfig'];
const pohonProp = useComponentPohon('contextMenu', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'modal'), emits);
const contentProps = toRef(() => props.content);
const getProxySlots = () => omit(slots, ['default']);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.contextMenu || {}) })({
  size: props.size,
}));
</script>

<template>
  <ContextMenuRoot v-bind="rootProps">
    <ContextMenuTrigger
      v-if="!!slots.default"
      as-child
      :disabled="disabled"
      :class="props.class"
    >
      <slot />
    </ContextMenuTrigger>

    <UContextMenuContent
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
    >
      <template
        v-for="(_, name) in getProxySlots()"
        #[name]="slotData"
      >
        <slot
          :name="(name as keyof ContextMenuSlots<T>)"
          v-bind="slotData"
        />
      </template>
    </UContextMenuContent>
  </ContextMenuRoot>
</template>
