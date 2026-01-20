<!-- eslint-disable sonar/no-nested-conditional -->
<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
import type { FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';
import type { Editor } from '@tiptap/vue-3';
import type { PButtonProps, PDropdownMenuItem, PDropdownMenuProps, PLinkPropsKeys, PTooltipProps } from '../types';
import type { EditorCustomHandlers, EditorItem } from '../types/editor';
import type { ArrayOrNested, DynamicSlots, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/editor-toolbar';

type EditorToolbar = ComponentConfig<typeof theme, AppConfig, 'editorToolbar'>;

type ButtonItem = Omit<PButtonProps, 'type'> & {
  slot?: string;
  tooltip?: PTooltipProps;
};

type EditorToolbarButtonItem<H extends EditorCustomHandlers = EditorCustomHandlers> = Omit<ButtonItem, PLinkPropsKeys> & EditorItem<H>;

type EditorToolbarDropdownChildItem<H extends EditorCustomHandlers = EditorCustomHandlers>
  = | PDropdownMenuItem
    | (Omit<PDropdownMenuItem, 'type'> & EditorItem<H>);

type EditorToolbarDropdownItem<H extends EditorCustomHandlers = EditorCustomHandlers> = ButtonItem & PDropdownMenuProps<ArrayOrNested<EditorToolbarDropdownChildItem<H>>>;

export type PEditorToolbarItem<H extends EditorCustomHandlers = EditorCustomHandlers>
  = | ButtonItem
    | EditorToolbarButtonItem<H>
    | EditorToolbarDropdownItem<H>;

type EditorToolbarBaseProps<T extends ArrayOrNested<PEditorToolbarItem> = ArrayOrNested<PEditorToolbarItem>> = {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The color of the toolbar controls.
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color'];
  /**
   * The variant of the toolbar controls.
   * @defaultValue 'ghost'
   */
  variant?: PButtonProps['variant'];
  /**
   * The color of the active toolbar control.
   * @defaultValue 'primary'
   */
  activeColor?: PButtonProps['color'];
  /**
   * The variant of the active toolbar control.
   * @defaultValue 'soft'
   */
  activeVariant?: PButtonProps['variant'];
  /**
   * The size of the toolbar controls.
   * @defaultValue 'sm'
   */
  size?: PButtonProps['size'];
  items?: T;
  editor: Editor;
  class?: any;
  pohon?: EditorToolbar['slots'];
};

export type PEditorToolbarProps<T extends ArrayOrNested<PEditorToolbarItem> = ArrayOrNested<PEditorToolbarItem>>
  = | (EditorToolbarBaseProps<T> & { layout?: 'fixed' })
    | (EditorToolbarBaseProps<T> & Partial<Omit<BubbleMenuPluginProps, 'editor' | 'element'>> & {
      layout?: 'bubble';
    })
    | (EditorToolbarBaseProps<T> & Partial<Omit<FloatingMenuPluginProps, 'editor' | 'element'>> & {
      layout?: 'floating';
    });

type SlotPropsProps = {
  index: number;
  isActive: (item: PEditorToolbarItem) => boolean;
  isDisabled: (item: PEditorToolbarItem) => boolean;
  onClick: (e: MouseEvent, item: PEditorToolbarItem) => void;
};
type SlotProps<T extends PEditorToolbarItem> = (props: { item: T } & SlotPropsProps) => any;

export type PEditorToolbarSlots<
  A extends ArrayOrNested<PEditorToolbarItem> = ArrayOrNested<PEditorToolbarItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  default: (props?: object) => any;
  item: SlotProps<T>;
} & DynamicSlots<MergeTypes<T>, undefined, SlotPropsProps>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PEditorToolbarItem>">
import { useAppConfig } from '#imports';
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3/menus';
import { omit, pick } from '@vinicunca/perkakas';
import { reactiveOmit } from '@vueuse/core';
import { APrimitive, ASeparator, useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, inject } from 'vue';
import { isArrayOfArray } from '../utils';
import { createHandlers } from '../utils/editor';
import { uv } from '../utils/uv';
import PButton from './button.vue';
import PDropdownMenu from './dropdown-menu.vue';
import PTooltip from './tooltip.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PEditorToolbarProps<T>>(),
  {
    layout: 'fixed',
    color: 'neutral',
    variant: 'ghost',
    activeColor: 'primary',
    activeVariant: 'soft',
    size: 'sm',
  },
);
defineSlots<PEditorToolbarSlots<T>>();

const appConfig = useAppConfig() as EditorToolbar['AppConfig'];

const handlers = inject('editorHandlers', computed(() => createHandlers()));

const Component = computed(() => {
  return ({
    bubble: BubbleMenu,
    floating: FloatingMenu,
    fixed: 'template',
  }[props.layout]);
});

const rootProps = useForwardProps(
  reactiveOmit(
    props,
    'as',
    'color',
    'variant',
    'activeColor',
    'activeVariant',
    'size',
    'items',
    'layout',
    'editor',
    'class',
    'pohon',
  ),
);

const options = computed(() => defu((props as any).options, {
  offset: 8,
  shift: { padding: 8 },
}));

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.editorToolbar || {}),
  })({
    layout: props.layout,
  }),
);

const groups = computed<Array<Array<PEditorToolbarItem>>>(() =>
  // eslint-disable-next-line no-nested-ternary
  props.items?.length
    // eslint-disable-next-line sonar/no-nested-conditional
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

function isActive(item: PEditorToolbarItem): boolean {
  if (!props.editor?.isEditable) {
    return false;
  }

  // Check for dropdown (has items property)
  if (('items' in item) && item.items?.length) {
    return item.items?.some((item): boolean => isActive(item as PEditorToolbarItem)) || false;
  }

  // Check for plain button (no kind property)
  if (!('kind' in item)) {
    return item.active ?? false;
  }

  // Check for editor item (has kind property)
  const handler = handlers?.value?.[item.kind];
  return handler?.isActive(props.editor, item as any) || false;
}

function isDisabled(item: PEditorToolbarItem): boolean {
  if (!props.editor?.isEditable) {
    return true;
  }

  if ('items' in item && item.items?.length) {
    const items = isArrayOfArray(item.items) ? item.items.flat() : item.items;
    // Filter out structural elements (separators, labels)
    const actionableItems = items.filter((item: any) => item.type !== 'separator' && item.type !== 'label');

    if (actionableItems.length === 0) {
      return true;
    }

    return actionableItems.every((item) => isDisabled(item));
  }

  if (!('kind' in item)) {
    return item.disabled ?? false;
  }

  const handler = handlers?.value?.[item.kind];
  if (!handler) {
    return false;
  }

  // Check item-specific disabled state
  if (handler.isDisabled?.(props.editor, item)) {
    return true;
  }

  // Check if item can be executed
  return !handler.canExecute(props.editor, item);
}

function onClick(e: MouseEvent, item: PEditorToolbarItem) {
  if (!props.editor?.isEditable || isDisabled(item)) {
    return;
  }

  if (('items' in item) || !('kind' in item)) {
    if ('onClick' in item) {
      for (const onClick of Array.isArray(item.onClick) ? item.onClick : [item.onClick]) {
        onClick?.(e);
      }
    }
    return;
  }

  const handler = handlers?.value?.[item.kind];
  if (handler) {
    handler.execute(props.editor, item).run();
  }
}

function getActiveChildItem(item: EditorToolbarDropdownItem): PEditorToolbarItem | undefined {
  if (!item.items) {
    return undefined;
  }

  const items = isArrayOfArray(item.items) ? item.items.flat() : item.items;

  return items.find((childItem: any): childItem is PEditorToolbarItem => {
    if (!('kind' in childItem)) {
      return false;
    }
    return isActive(childItem as PEditorToolbarItem);
  }) as PEditorToolbarItem | undefined;
}

function getButtonProps(item: PEditorToolbarItem) {
  const baseProps = omit(item as EditorToolbarButtonItem & EditorToolbarDropdownItem, ['kind', 'items', 'slot', 'checkedIcon', 'loadingIcon', 'externalIcon', 'content', 'arrow', 'portal', 'modal', 'tooltip']);

  // For dropdown items, use the active child's icon if available
  if ('items' in item && item.items?.length) {
    const activeChild = getActiveChildItem(item);
    if (activeChild?.icon) {
      baseProps.icon = activeChild.icon;
    }
    if (activeChild?.label && baseProps.label !== undefined) {
      baseProps.label = activeChild.label;
    }
  }

  return defu(baseProps, {
    color: props.color,
    activeColor: props.activeColor,
    activeVariant: props.activeVariant,
    variant: props.variant,
    size: props.size,
  });
}

function getDropdownProps(item: EditorToolbarDropdownItem) {
  const baseProps = pick(item, ['checkedIcon', 'loadingIcon', 'externalIcon', 'content', 'arrow', 'portal', 'modal', 'pohon']);

  return defu(baseProps, {
    modal: false,
  });
}

function mapDropdownItem(item: EditorToolbarDropdownChildItem): any {
  // Recursively map children if present
  const children = 'children' in item && Array.isArray(item.children)
    ? item.children.map(mapDropdownItem)
    : undefined;

  // If it's a separator or label (no 'kind' property), return with mapped children
  if (!('kind' in item)) {
    return children ? { ...item, children } : item;
  }

  const editorToolbarItem = item as EditorToolbarDropdownChildItem;
  return {
    ...editorToolbarItem,
    ...(children && { children }),
    active: isActive(editorToolbarItem),
    disabled: isDisabled(editorToolbarItem),
    onSelect: (e: Event) => onClick(e as MouseEvent, editorToolbarItem),
  };
}

function getDropdownItems(item: EditorToolbarDropdownItem) {
  if (!item.items) {
    return [];
  }

  return isArrayOfArray(item.items)
    ? item.items.map((group: any) => group.map(mapDropdownItem))
    : [item.items.map(mapDropdownItem)];
}
</script>

<template>
  <APrimitive
    :as="Component"
    v-bind="Component !== 'template' ? {
      editor,
      tabindex: -1,
      class: pohon.root({ class: props.pohon?.root }),
      ...rootProps,
      options,
      ...$attrs,
    } : {
      ...$attrs,
    }"
  >
    <APrimitive
      :as="as"
      role="toolbar"
      data-slot="base"
      :class="pohon.base({ class: [props.pohon?.base, props.class] })"
    >
      <template
        v-for="(group, groupIndex) in groups"
        :key="`group-${groupIndex}`"
      >
        <div
          role="group"
          data-slot="group"
          :class="pohon.group({ class: props.pohon?.group })"
        >
          <template
            v-for="(item, index) in group"
            :key="`group-${groupIndex}-${index}`"
          >
            <slot
              :name="((item.slot || 'item') as keyof PEditorToolbarSlots<T>)"
              :item="(item as any)"
              :index="index"
              :is-active="isActive"
              :is-disabled="isDisabled"
              :on-click="onClick"
            >
              <PDropdownMenu
                v-if="('items' in item && item.items?.length)"
                v-bind="getDropdownProps(item as EditorToolbarDropdownItem)"
                :items="getDropdownItems(item as EditorToolbarDropdownItem)"
              >
                <PTooltip v-bind="{ ...(item.tooltip || {}) }">
                  <PButton
                    :active="isActive(item)"
                    :disabled="isDisabled(item)"
                    v-bind="getButtonProps(item)"
                  />
                </PTooltip>
              </PDropdownMenu>

              <PTooltip
                v-else
                v-bind="{ ...(item.tooltip || {}) }"
              >
                <PButton
                  :active="isActive(item)"
                  :disabled="isDisabled(item)"
                  v-bind="getButtonProps(item)"
                  :pohon="item.pohon"
                  @click="onClick($event, item)"
                />
              </PTooltip>
            </slot>
          </template>
        </div>

        <ASeparator
          v-if="groupIndex < groups.length - 1"
          data-slot="separator"
          :class="pohon.separator({ class: props.pohon?.separator })"
          orientation="vertical"
        />
      </template>
    </APrimitive>
  </APrimitive>
</template>
