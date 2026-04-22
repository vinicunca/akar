<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { AListboxRootEmits, AListboxRootProps } from 'akar';
import type { FuseResult } from 'fuse.js';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PButtonProps, PChipProps, PIconProps, PInputProps, PKbdProps, PLinkProps, PLinkPropsKeys } from '../types';
import type { GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/command-palette';

type CommandPalette = ComponentConfig<typeof theme, AppConfig, 'commandPalette'>;

export interface PCommandPaletteItem extends Omit<PLinkProps, 'type' | 'raw' | 'custom'> {
  prefix?: string;
  label?: string;
  suffix?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  chip?: PChipProps;
  kbds?: Array<PKbdProps['value']> | Array<PKbdProps>;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  slot?: string;
  /**
   * The placeholder to display when the item has children.
   */
  placeholder?: string;
  children?: Array<PCommandPaletteItem>;
  onSelect?: (event: Event) => void;
  class?: any;
  pohon?: Pick<CommandPalette['slots'], 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelPrefix' | 'itemLabelBase' | 'itemLabelSuffix' | 'itemTrailing' | 'itemTrailingKbds' | 'itemTrailingKbdsSize' | 'itemTrailingHighlightedIcon' | 'itemTrailingIcon'>;
  [key: string]: any;
}

export interface PCommandPaletteGroup<T extends PCommandPaletteItem = PCommandPaletteItem> {
  id: string;
  label?: string;
  slot?: string;
  items?: Array<T>;
  /**
   * Whether to filter group items with [useFuse](https://vueuse.org/integrations/useFuse).
   * When `true`, items will not be filtered which is useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean;
  /** Filter group items after the search happened. */
  postFilter?: (searchTerm: string, items: Array<T>) => Array<T>;
  /**
   * The icon displayed when an item is highlighted.
   * @IconifyIcon
   */
  highlightedIcon?: PIconProps['name'];
}

export interface PCommandPaletteProps<G extends PCommandPaletteGroup<T> = PCommandPaletteGroup<any>, T extends PCommandPaletteItem = PCommandPaletteItem> extends Pick<AListboxRootProps, 'multiple' | 'disabled' | 'modelValue' | 'defaultValue' | 'highlightOnHover' | 'selectionBehavior' | 'by'>, Pick<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'md'
   */
  size?: CommandPalette['variants']['size'];
  /**
   * The icon displayed in the input.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * The icon displayed on the right side of the input.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  /**
   * The icon displayed when an item is selected.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  selectedIcon?: PIconProps['name'];
  /**
   * The icon displayed when an item has children.
   * @defaultValue appConfig.pohon.icons.chevronRight
   * @IconifyIcon
   */
  childrenIcon?: PIconProps['name'];
  /**
   * The placeholder text for the input.
   * @defaultValue t('commandPalette.placeholder')
   */
  placeholder?: PInputProps['placeholder'];
  /**
   * Automatically focus the input when component is mounted.
   * @defaultValue true
   */
  autofocus?: boolean;
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  /**
   * Display a button to navigate back in history.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @defaultValue true
   */
  back?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the back button.
   * @defaultValue appConfig.pohon.icons.arrowLeft
   * @IconifyIcon
   */
  backIcon?: PIconProps['name'];
  /**
   * Configure the input or hide it with `false`.
   * @defaultValue true
   */
  input?: boolean | Omit<PInputProps, 'modelValue' | 'defaultValue'>;
  groups?: Array<G>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse).
   * @defaultValue {
      fuseOptions: {
        ignoreLocation: true,
        threshold: 0.1,
        keys: ['label', 'suffix']
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }
   */
  fuse?: UseFuseOptions<T>;
  /**
   * Enable virtualization for large lists.
   * Note: when enabled, all groups are flattened into a single list due to a limitation of Reka UI (https://github.com/unovue/akar/issues/1885).
   * @defaultValue false
   */
  virtualize?: boolean | {
    /**
     * Number of items rendered outside the visible area
     * @defaultValue 12
     */
    overscan?: number;
    /**
     * Estimated size (in px) of each item, or a function that returns the size for a given index
     * @defaultValue 32
     */
    estimateSize?: number | ((index: number) => number);
  };
  /**
   * When `items` is an array of objects, select the field to use as the value instead of the object itself.
   * @defaultValue undefined
   */
  valueKey?: GetItemKeys<T>;
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
   * Whether to preserve the order of groups as defined in the `groups` prop when filtering.
   * When `false`, groups will appear based on item matches.
   * @defaultValue false
   */
  preserveGroupOrder?: boolean;
  class?: any;
  pohon?: CommandPalette['slots'];
}

export type PCommandPaletteEmits<T extends PCommandPaletteItem = PCommandPaletteItem> = AListboxRootEmits<T> & {
  'update:open': [value: boolean];
};

type SlotProps<T> = (props: { item: T; index: number; pohon: CommandPalette['pohon'] }) => Array<VNode>;
type GroupSlotProps<T extends PCommandPaletteItem = PCommandPaletteItem, G extends PCommandPaletteGroup<T> = PCommandPaletteGroup<T>> = (props: { group: G; label: string; pohon: CommandPalette['pohon'] }) => Array<VNode>;

type GroupSlots<T extends PCommandPaletteItem = PCommandPaletteItem, G extends PCommandPaletteGroup<T> = PCommandPaletteGroup<T>> = {
  'group-label'?: GroupSlotProps<T, G>;
} & Record<`${string}-group-label`, GroupSlotProps<T, G>>;

export type PCommandPaletteSlots<T extends PCommandPaletteItem = PCommandPaletteItem, G extends PCommandPaletteGroup<T> = PCommandPaletteGroup<T>> = {
  'empty'?: (props: { searchTerm: string }) => Array<VNode>;
  'footer'?: (props: { pohon: CommandPalette['pohon'] }) => Array<VNode>;
  'back'?: (props: { pohon: CommandPalette['pohon'] }) => Array<VNode>;
  'close'?: (props: { pohon: CommandPalette['pohon'] }) => Array<VNode>;
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: SlotProps<T>;
  'item-description'?: SlotProps<T>;
  'item-trailing'?: SlotProps<T>;
} & Record<string, SlotProps<T>> & GroupSlots<T, G>;

</script>

<script setup lang="ts" generic="G extends PCommandPaletteGroup<T>, T extends PCommandPaletteItem">
import { useAppConfig } from '#imports';
import { isBoolean, isFunction, isString } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick, refThrottled } from '@vueuse/core';
import { useFuse } from '@vueuse/integrations/useFuse';
import {
  AListboxContent,
  AListboxFilter,
  AListboxGroup,
  AListboxGroupLabel,
  AListboxItem,
  AListboxItemIndicator,
  AListboxRoot,
  AListboxVirtualizer,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, ref, toRef, useTemplateRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { getProp, omit } from '../utils';
import { highlight } from '../utils/fuse';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import { getEstimateSize } from '../utils/virtualizer';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';
import PInput from './input.vue';
import PKbd from './kbd.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PCommandPaletteProps<G, T>>(),
  {
    labelKey: 'label',
    descriptionKey: 'description',
    input: true,
    autofocus: true,
    back: true,
    preserveGroupOrder: false,
    virtualize: false,
    highlightOnHover: true,
  },
);
const emits = defineEmits<PCommandPaletteEmits<T>>();
const slots = defineSlots<PCommandPaletteSlots<T, G>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as CommandPalette['AppConfig'];
const pohonProp = useComponentPohon('commandPalette', props);

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'as', 'disabled', 'multiple', 'modelValue', 'defaultValue', 'highlightOnHover', 'by'),
  emits,
);
const virtualizerProps = toRef(() => {
  if (!props.virtualize) {
    return false;
  }

  return defu(
    isBoolean(props.virtualize) ? {} : props.virtualize,
    {
      estimateSize: getEstimateSize(
        filteredItems.value,
        'md',
        props.descriptionKey as string,
        !!slots['item-description'],
      ),
    },
  );
});

const [
  DefineItemTemplate,
  ReuseItemTemplate,
] = createReusableTemplate<{
  item: PCommandPaletteItem;
  group?: PCommandPaletteGroup;
  index: number;
}>({
  props: {
    item: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: false,
    },
    index: {
      type: Number,
      required: false,
    },
  },
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.commandPalette || {}) })({
  size: props.size,
  virtualize: !!props.virtualize,
}));

const fuse = computed(() =>
  defu(
    {},
    props.fuse,
    {
      fuseOptions: {
        ignoreLocation: true,
        threshold: 0.1,
        keys: [props.labelKey, 'suffix'],
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true,
    },
  ) as UseFuseOptions<T>,
);

const history = ref<Array<PCommandPaletteGroup & { placeholder?: string }>>([]);

const placeholder = computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t('commandPalette.placeholder'));

const groups = computed(() => history.value?.length ? [history.value[history.value.length - 1] as G] : props.groups);

const items = computed(() => groups.value?.filter((group) => {
  if (!group.id) {
    console.warn('[@nuxt/pohon] CommandPalette group is missing an `id` property');
    return false;
  }
  if (group.ignoreFilter) {
    return false;
  }
  return true;
})?.flatMap((group) => group.items?.map((item) => ({ ...item, group: group.id })) || []) || []);

const { results: fuseResults } = useFuse<typeof items.value[number]>(searchTerm, items, fuse);

const throttledFuseResults = refThrottled(fuseResults, 16, true);

function processGroupItems(group: G, items: Array<T & { matches?: FuseResult<T>['matches'] }>) {
  let processedItems = items;

  if (group?.postFilter && isFunction(group.postFilter)) {
    processedItems = group.postFilter(searchTerm.value, processedItems);
  }

  return {
    ...group,
    items: processedItems.slice(0, fuse.value.resultLimit).map((item) => {
      return {
        ...item,
        labelHtml: highlight<T>(item, searchTerm.value, props.labelKey),
        suffixHtml: highlight<T>(item, searchTerm.value, undefined, [props.labelKey]),
      };
    }),
  };
}

const filteredGroups = computed(() => {
  const currentGroups = groups.value;

  const groupsById = throttledFuseResults.value.reduce((acc, result) => {
    const { item, matches } = result;
    if (!item.group) {
      return acc;
    }

    acc[item.group] ||= [];
    acc[item.group]?.push({ ...item, matches });

    return acc;
  }, {} as Record<string, Array<T & { matches?: FuseResult<T>['matches'] }>>);

  if (props.preserveGroupOrder) {
    const processedGroups: Array<ReturnType<typeof processGroupItems>> = [];

    for (const group of currentGroups || []) {
      if (!group.items?.length) {
        continue;
      }

      const items = group.ignoreFilter ? group.items : groupsById[group.id];
      if (!items?.length) {
        continue;
      }

      const processedGroup = processGroupItems(group, items);

      // Filter out groups that become empty after postFilter
      if (processedGroup.items?.length) {
        processedGroups.push(processedGroup);
      }
    }

    return processedGroups;
  }

  const fuseGroups = Object.entries(groupsById).map(([id, items]) => {
    const group = currentGroups?.find((group) => group.id === id);
    if (!group) {
      return undefined;
    }

    const processedGroup = processGroupItems(group, items);
    // Filter out groups without items after postFilter
    return processedGroup.items?.length ? processedGroup : undefined;
  }).filter((group) => !!group);

  const nonFuseGroups = currentGroups
    ?.map((group, index) => ({ ...group, index }))
    ?.filter((group) => group.ignoreFilter && group.items?.length)
    ?.map((group) => {
      const processedGroup = processGroupItems(group, group.items || []);
      return { ...processedGroup, index: group.index };
    })
    // Filter out groups without items after postFilter
    ?.filter((group) => group.items?.length) || [];

  return nonFuseGroups.reduce((acc, group) => {
    acc.splice(group.index, 0, group);
    return acc;
  }, [...fuseGroups]);
});

const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group.items || []));

const rootRef = useTemplateRef('rootRef');

function navigate(item: T) {
  if (!item.children?.length) {
    return;
  }

  history.value.push({
    id: `history-${history.value.length}`,
    label: item.label,
    slot: item.slot,
    placeholder: item.placeholder,
    items: item.children,
  } as any);

  searchTerm.value = '';

  rootRef.value?.highlightFirstItem();
}

function navigateBack() {
  if (!history.value.length) {
    return;
  }

  history.value.pop();

  searchTerm.value = '';

  rootRef.value?.highlightFirstItem();
}

function onBackspace() {
  if (!searchTerm.value) {
    navigateBack();
  }
}

function onSelect(event: Event, item: T) {
  if (item.children?.length) {
    event.preventDefault();

    navigate(item);
  } else {
    item.onSelect?.(event);
  }
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <DefineItemTemplate v-slot="{ item, index, group }">
    <PLink
      v-slot="{ active, ...slotProps }"
      v-bind="pickLinkProps(item)"
      custom
    >
      <AListboxItem
        :value="props.valueKey ? getProp(item, props.valueKey as string) : omit(item, ['matches' as any, 'group' as any, 'onSelect', 'labelHtml', 'suffixHtml', 'children'])"
        :disabled="item.disabled"
        as-child
        @select="onSelect($event, item as T)"
      >
        <PLinkBase
          v-bind="slotProps"
          data-slot="item"
          :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item, item.class], active: active || item.active })"
        >
          <slot
            :name="((item.slot || group?.slot || 'item') as keyof PCommandPaletteSlots<T>)"
            :item="(item as any)"
            :index="index"
            :pohon="pohon"
          >
            <slot
              :name="((item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`) as keyof PCommandPaletteSlots<T>)"
              :item="(item as any)"
              :index="index"
              :pohon="pohon"
            >
              <PIcon
                v-if="item.loading"
                :name="loadingIcon || appConfig.pohon.icons.loading"
                data-slot="itemLeadingIcon"
                :class="pohon.itemLeadingIcon({ class: [pohonProp?.itemLeadingIcon, item.pohon?.itemLeadingIcon], loading: true })"
              />
              <PIcon
                v-else-if="item.icon"
                :name="item.icon"
                data-slot="itemLeadingIcon"
                :class="pohon.itemLeadingIcon({ class: [pohonProp?.itemLeadingIcon, item.pohon?.itemLeadingIcon], active: active || item.active })"
              />
              <PAvatar
                v-else-if="item.avatar"
                :size="((item.pohon?.itemLeadingAvatarSize || pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
                v-bind="item.avatar"
                data-slot="itemLeadingAvatar"
                :class="pohon.itemLeadingAvatar({ class: [pohonProp?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar], active: active || item.active })"
              />
              <PChip
                v-else-if="item.chip"
                :size="((item.pohon?.itemLeadingChipSize || pohonProp?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
                inset
                standalone
                v-bind="item.chip"
                data-slot="itemLeadingChip"
                :class="pohon.itemLeadingChip({ class: [pohonProp?.itemLeadingChip, item.pohon?.itemLeadingChip], active: active || item.active })"
              />
            </slot>

            <span
              v-if="(item.prefix || (item.labelHtml || getProp(item, props.labelKey as string)) || (item.suffixHtml || item.suffix) || !!slots[(item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`) as keyof PCommandPaletteSlots<T>]) || (getProp(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof PCommandPaletteSlots<T>])"
              data-slot="itemWrapper"
              :class="pohon.itemWrapper({ class: [pohonProp?.itemWrapper, item.pohon?.itemWrapper] })"
            >
              <span
                data-slot="itemLabel"
                :class="pohon.itemLabel({ class: [pohonProp?.itemLabel, item.pohon?.itemLabel], active: active || item.active })"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`) as keyof PCommandPaletteSlots<T>)"
                  :item="(item as any)"
                  :index="index"
                  :pohon="pohon"
                >
                  <span
                    v-if="item.prefix"
                    data-slot="itemLabelPrefix"
                    :class="pohon.itemLabelPrefix({ class: [pohonProp?.itemLabelPrefix, item.pohon?.itemLabelPrefix] })"
                  >{{ item.prefix }}</span>

                  <span
                    v-if="item.labelHtml"
                    data-slot="itemLabelBase"
                    :class="pohon.itemLabelBase({ class: [pohonProp?.itemLabelBase, item.pohon?.itemLabelBase], active: active || item.active })"
                    v-html="item.labelHtml"
                  />
                  <span
                    v-else
                    data-slot="itemLabelBase"
                    :class="pohon.itemLabelBase({ class: [pohonProp?.itemLabelBase, item.pohon?.itemLabelBase], active: active || item.active })"
                  >{{ getProp(item, props.labelKey as string) }}</span>

                  <span
                    v-if="item.suffixHtml"
                    data-slot="itemLabelSuffix"
                    :class="pohon.itemLabelSuffix({ class: [pohonProp?.itemLabelSuffix, item.pohon?.itemLabelSuffix], active: active || item.active })"
                    v-html="item.suffixHtml"
                  />
                  <span
                    v-else-if="item.suffix"
                    data-slot="itemLabelSuffix"
                    :class="pohon.itemLabelSuffix({ class: [pohonProp?.itemLabelSuffix, item.pohon?.itemLabelSuffix], active: active || item.active })"
                  >{{ item.suffix }}</span>
                </slot>
              </span>

              <span
                v-if="getProp(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof PCommandPaletteSlots<T>]"
                data-slot="itemDescription"
                :class="pohon.itemDescription({ class: [pohonProp?.itemDescription, item.pohon?.itemDescription] })"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof PCommandPaletteSlots<T>)"
                  :item="(item as any)"
                  :index="index"
                  :pohon="pohon"
                >
                  {{ getProp(item, props.descriptionKey as string) }}
                </slot>
              </span>
            </span>

            <span
              data-slot="itemTrailing"
              :class="pohon.itemTrailing({ class: [pohonProp?.itemTrailing, item.pohon?.itemTrailing] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`) as keyof PCommandPaletteSlots<T>)"
                :item="(item as any)"
                :index="index"
                :pohon="pohon"
              >
                <PIcon
                  v-if="item.children && item.children.length > 0"
                  :name="childrenIcon || appConfig.pohon.icons.chevronRight"
                  data-slot="itemTrailingIcon"
                  :class="pohon.itemTrailingIcon({ class: [pohonProp?.itemTrailingIcon, item.pohon?.itemTrailingIcon] })"
                />

                <span
                  v-else-if="item.kbds?.length"
                  data-slot="itemTrailingKbds"
                  :class="pohon.itemTrailingKbds({ class: [pohonProp?.itemTrailingKbds, item.pohon?.itemTrailingKbds] })"
                >
                  <PKbd
                    v-for="(kbd, kbdIndex) in item.kbds"
                    :key="kbdIndex"
                    :size="((item.pohon?.itemTrailingKbdsSize || pohonProp?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as PKbdProps['size'])"
                    v-bind="isString(kbd) ? { value: kbd } : kbd"
                  />
                </span>

                <PIcon
                  v-else-if="group?.highlightedIcon"
                  :name="group.highlightedIcon"
                  data-slot="itemTrailingHighlightedIcon"
                  :class="pohon.itemTrailingHighlightedIcon({ class: [pohonProp?.itemTrailingHighlightedIcon, item.pohon?.itemTrailingHighlightedIcon] })"
                />
              </slot>

              <AListboxItemIndicator
                v-if="!item.children?.length"
                as-child
              >
                <PIcon
                  :name="selectedIcon || appConfig.pohon.icons.check"
                  data-slot="itemTrailingIcon"
                  :class="pohon.itemTrailingIcon({ class: [pohonProp?.itemTrailingIcon, item.pohon?.itemTrailingIcon] })"
                />
              </AListboxItemIndicator>
            </span>
          </slot>
        </PLinkBase>
      </AListboxItem>
    </PLink>
  </DefineItemTemplate>

  <AListboxRoot
    v-bind="{ ...rootProps, ...$attrs }"
    ref="rootRef"
    :selection-behavior="selectionBehavior"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <AListboxFilter
      v-if="input"
      v-model="searchTerm"
      as-child
    >
      <PInput
        variant="none"
        :size="size"
        v-bind="typeof props.input === 'object' ? props.input : {}"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :loading="loading"
        :loading-icon="loadingIcon"
        :trailing-icon="trailingIcon"
        :icon="icon || appConfig.pohon.icons.search"
        data-slot="input"
        :class="pohon.input({ class: pohonProp?.input })"
        @keydown.backspace="onBackspace"
      >
        <template
          v-if="history?.length && (back || !!slots.back)"
          #leading
        >
          <slot
            name="back"
            :pohon="pohon"
          >
            <PButton
              :size="size"
              :icon="backIcon || appConfig.pohon.icons.arrowLeft"
              color="neutral"
              variant="link"
              :aria-label="t('commandPalette.back')"
              v-bind="(typeof back === 'object' ? back : {})"
              data-slot="back"
              :class="pohon.back({ class: pohonProp?.back })"
              @click="navigateBack"
            />
          </slot>
        </template>

        <template
          v-if="close || !!slots.close"
          #trailing
        >
          <slot
            name="close"
            :pohon="pohon"
          >
            <PButton
              v-if="close"
              :size="size"
              :icon="closeIcon || appConfig.pohon.icons.close"
              color="neutral"
              variant="ghost"
              :aria-label="t('commandPalette.close')"
              v-bind="(typeof close === 'object' ? close : {})"
              data-slot="close"
              :class="pohon.close({ class: pohonProp?.close })"
              @click="emits('update:open', false)"
            />
          </slot>
        </template>
      </PInput>
    </AListboxFilter>

    <AListboxContent
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <div
        v-if="filteredGroups?.length"
        role="presentation"
        data-slot="viewport"
        :class="pohon.viewport({ class: pohonProp?.viewport })"
      >
        <AListboxVirtualizer
          v-if="!!virtualize"
          v-slot="{ option: item, virtualItem }"
          :options="(filteredItems as any[])"
          :text-content="item => getProp(item, props.labelKey as string)"
          v-bind="virtualizerProps"
        >
          <ReuseItemTemplate
            :item="item"
            :index="virtualItem.index"
          />
        </AListboxVirtualizer>

        <template v-else>
          <AListboxGroup
            v-for="group in filteredGroups"
            :key="`group-${group.id}`"
            data-slot="group"
            :class="pohon.group({ class: pohonProp?.group })"
          >
            <AListboxGroupLabel
              v-if="getProp(group, props.labelKey as string) || !!slots[(group.slot ? `${group.slot}-group-label` : 'group-label') as keyof PCommandPaletteSlots<T, G>]"
              data-slot="label"
              :class="pohon.label({ class: pohonProp?.label })"
            >
              <slot
                :name="((group.slot ? `${group.slot}-group-label` : 'group-label') as keyof GroupSlots<T, G>)"
                :group="group"
                :label="getProp(group, props.labelKey as string)"
                :pohon="pohon"
              >
                {{ getProp(group, props.labelKey as string) }}
              </slot>
            </AListboxGroupLabel>

            <ReuseItemTemplate
              v-for="(item, index) in group.items"
              :key="`group-${group.id}-${index}`"
              :item="item"
              :index="index"
              :group="(group as PCommandPaletteGroup)"
            />
          </AListboxGroup>
        </template>
      </div>

      <div
        v-else
        data-slot="empty"
        :class="pohon.empty({ class: pohonProp?.empty })"
      >
        <slot
          name="empty"
          :search-term="searchTerm"
        >
          {{ searchTerm ? t('commandPalette.noMatch', { searchTerm }) : t('commandPalette.noData') }}
        </slot>
      </div>
    </AListboxContent>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot
        name="footer"
        :pohon="pohon"
      />
    </div>
  </AListboxRoot>
</template>
