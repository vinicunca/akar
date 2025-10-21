<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { AListboxRootEmits, AListboxRootProps } from 'akar';
import type { FuseResult } from 'fuse.js';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PButtonProps, PChipProps, PIconProps, PInputProps, PKbdProps, PLinkProps } from '../types';
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
  onSelect?: (event?: Event) => void;
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

export interface PCommandPaletteProps<G extends PCommandPaletteGroup<T> = PCommandPaletteGroup<any>, T extends PCommandPaletteItem = PCommandPaletteItem> extends Pick<AListboxRootProps, 'multiple' | 'disabled' | 'modelValue' | 'defaultValue' | 'highlightOnHover' | 'selectionBehavior'>, Pick<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed in the input.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
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
  trailingIcon?: PIconProps['name'];
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
   * Display a close button in the input (useful when inside a Dialog for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: boolean | Partial<PButtonProps>;
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
  back?: boolean | PButtonProps;
  /**
   * The icon displayed in the back button.
   * @defaultValue appConfig.pohon.icons.arrowLeft
   * @IconifyIcon
   */
  backIcon?: PIconProps['name'];
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
   * Note: when enabled, all groups are flattened into a single list due to a limitation of Reka UI (https://github.com/unovue/reka-ui/issues/1885).
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
  class?: any;
  pohon?: CommandPalette['slots'];
}

export type PCommandPaletteEmits<T extends PCommandPaletteItem = PCommandPaletteItem> = AListboxRootEmits<T> & {
  'update:open': [value: boolean];
};

type SlotProps<T> = (props: { item: T; index: number; pohon: CommandPalette['pohon'] }) => any;

export type PCommandPaletteSlots<G extends PCommandPaletteGroup<T> = PCommandPaletteGroup<any>, T extends PCommandPaletteItem = PCommandPaletteItem> = {
  'empty': (props: { searchTerm?: string }) => any;
  'footer': (props: { pohon: CommandPalette['pohon'] }) => any;
  'back': (props: { pohon: CommandPalette['pohon'] }) => any;
  'close': (props: { pohon: CommandPalette['pohon'] }) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': SlotProps<T>;
  'item-description': SlotProps<T>;
  'item-trailing': SlotProps<T>;
} & Record<string, SlotProps<G>> & Record<string, SlotProps<T>>;

</script>

<script setup lang="ts" generic="G extends PCommandPaletteGroup<T>, T extends PCommandPaletteItem">
import { useAppConfig } from '#imports';
import { isBoolean, isFunction, isString, omit } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
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
  useForwardProps,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, ref, toRef, useTemplateRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { getProp } from '../utils';
import { highlight } from '../utils/fuse';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';
import PInput from './input.vue';
import PKbd from './kbd.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = withDefaults(
  defineProps<PCommandPaletteProps<G, T>>(),
  {
    modelValue: '',
    labelKey: 'label',
    descriptionKey: 'description',
    autofocus: true,
    back: true,
    virtualize: false,
  },
);
const emits = defineEmits<PCommandPaletteEmits<T>>();
const slots = defineSlots<PCommandPaletteSlots<G, T>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as CommandPalette['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'as', 'disabled', 'multiple', 'modelValue', 'defaultValue', 'highlightOnHover'),
  emits,
);
const inputProps = useForwardProps(reactivePick(props, 'loading'));
const virtualizerProps = toRef(() =>
  !!props.virtualize && defu(
    isBoolean(props.virtualize) ? {} : props.virtualize,
    { estimateSize: 32 },
  ),
);

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

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.commandPalette || {}),
  })({
    virtualize: !!props.virtualize,
  }),
);

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

const placeholder = computed(() =>
  history.value[history.value.length - 1]?.placeholder
  || props.placeholder
  || t('commandPalette.placeholder'),
);

const groups = computed(() =>
  history.value?.length
    ? [history.value[history.value.length - 1] as G]
    : props.groups,
);

const items = computed(() =>
  groups.value?.filter((group) => {
    if (!group.id) {
      console.warn('[pohon] CommandPalette group is missing an `id` property');
      return false;
    }

    return !group.ignoreFilter;
  })?.flatMap((group) => group.items?.map((item) => ({
    ...item,
    group: group.id,
  })) || []) || [],
);

const { results: fuseResults } = useFuse<typeof items.value[number]>(searchTerm, items, fuse);

function getGroupWithItems(group: G, items: Array<T & { matches?: FuseResult<T>['matches'] }>) {
  if (group?.postFilter && isFunction(group.postFilter)) {
    items = group.postFilter(searchTerm.value, items);
  }

  return {
    ...group,
    items: items.slice(0, fuse.value.resultLimit).map((item) => {
      return {
        ...item,
        labelHtml: highlight<T>({ item, searchTerm: searchTerm.value, forceKey: props.labelKey }),
        suffixHtml: highlight<T>({ item, searchTerm: searchTerm.value, forceKey: undefined, omitKeys: [props.labelKey] }),
      };
    }),
  };
}

const filteredGroups = computed(() => {
  const groupsById = fuseResults.value.reduce((acc, result) => {
    const { item, matches } = result;
    if (!item.group) {
      return acc;
    }

    acc[item.group] ||= [];
    acc[item.group]?.push({ ...item, matches });

    return acc;
  }, {} as Record<string, Array<T & { matches?: FuseResult<T>['matches'] }>>);

  const fuseGroups = Object.entries(groupsById).map(([id, items]) => {
    const group = groups.value?.find((group) => group.id === id);
    if (!group) {
      return undefined;
    }

    return getGroupWithItems(group, items);
  }).filter((group) => !!group);

  const nonFuseGroups = groups.value
    ?.map((group, index) => ({ ...group, index }))
    ?.filter((group) => group.ignoreFilter && group.items?.length)
    ?.map((group) => ({ ...getGroupWithItems(group, group.items || []), index: group.index })) || [];

  return nonFuseGroups.reduce((acc, group) => {
    acc.splice(group.index, 0, group);
    return acc;
  }, [...fuseGroups]);
});

const filteredItems = computed(() =>
  filteredGroups.value?.flatMap((group) => group.items || []),
);

const listboxRootRef = useTemplateRef('listboxRootRef');

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

  listboxRootRef.value?.highlightFirstItem();
}

function navigateBack() {
  if (!history.value.length) {
    return;
  }

  history.value.pop();

  searchTerm.value = '';

  listboxRootRef.value?.highlightFirstItem();
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
    <AListboxItem
      :value="omit(item, ['matches' as any, 'group' as any, 'onSelect', 'labelHtml', 'suffixHtml', 'children'])"
      :disabled="item.disabled"
      as-child
      @select="onSelect($event, item as T)"
    >
      <PLink
        v-slot="{ active, ...slotProps }"
        v-bind="pickLinkProps(item)"
        custom
      >
        <PLinkBase
          v-bind="slotProps"
          :class="pohon.item({
            class: [props.pohon?.item, item.pohon?.item, item.class],
            active: active || item.active,
          })"
        >
          <slot
            :name="((item.slot || group?.slot || 'item') as keyof PCommandPaletteSlots<G, T>)"
            :item="(item as any)"
            :index="index"
            :pohon="pohon"
          >
            <slot
              :name="((item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`) as keyof PCommandPaletteSlots<G, T>)"
              :item="(item as any)"
              :index="index"
              :pohon="pohon"
            >
              <PIcon
                v-if="item.loading"
                :name="loadingIcon || appConfig.pohon.icons.loading"
                :class="pohon.itemLeadingIcon({
                  class: [props.pohon?.itemLeadingIcon, item.pohon?.itemLeadingIcon],
                  loading: true,
                })"
              />

              <PIcon
                v-else-if="item.icon"
                :name="item.icon"
                :class="pohon.itemLeadingIcon({
                  class: [props.pohon?.itemLeadingIcon, item.pohon?.itemLeadingIcon],
                  active: active || item.active,
                })"
              />
              <PAvatar
                v-else-if="item.avatar"
                :size="((item.pohon?.itemLeadingAvatarSize || props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
                v-bind="item.avatar"
                :class="pohon.itemLeadingAvatar({
                  class: [props.pohon?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar],
                  active: active || item.active,
                })"
              />
              <PChip
                v-else-if="item.chip"
                :size="((item.pohon?.itemLeadingChipSize || props.pohon?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
                inset
                standalone
                v-bind="item.chip"
                :class="pohon.itemLeadingChip({
                  class: [props.pohon?.itemLeadingChip, item.pohon?.itemLeadingChip],
                  active: active || item.active,
                })"
              />
            </slot>

            <span
              v-if="(item.prefix || (item.labelHtml || getProp({ object: item, path: props.labelKey as string })) || (item.suffixHtml || item.suffix) || !!slots[(item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`) as keyof PCommandPaletteSlots<G, T>]) || (getProp({ object: item, path: props.descriptionKey as string }) || !!slots[(item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof PCommandPaletteSlots<G, T>])"
              :class="pohon.itemWrapper({ class: [props.pohon?.itemWrapper, item.pohon?.itemWrapper] })"
            >
              <span :class="pohon.itemLabel({ class: [props.pohon?.itemLabel, item.pohon?.itemLabel], active: active || item.active })">
                <slot
                  :name="((item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`) as keyof PCommandPaletteSlots<G, T>)"
                  :item="(item as any)"
                  :index="index"
                  :pohon="pohon"
                >
                  <span
                    v-if="item.prefix"
                    :class="pohon.itemLabelPrefix({ class: [props.pohon?.itemLabelPrefix, item.pohon?.itemLabelPrefix] })"
                  >{{ item.prefix }}</span>

                  <span
                    :class="pohon.itemLabelBase({ class: [props.pohon?.itemLabelBase, item.pohon?.itemLabelBase], active: active || item.active })"
                    v-html="item.labelHtml || getProp({ object: item, path: props.labelKey as string })"
                  />

                  <span
                    :class="pohon.itemLabelSuffix({ class: [props.pohon?.itemLabelSuffix, item.pohon?.itemLabelSuffix], active: active || item.active })"
                    v-html="item.suffixHtml || item.suffix"
                  />
                </slot>
              </span>

              <span
                v-if="getProp({ object: item, path: props.descriptionKey as string })"
                :class="pohon.itemDescription({ class: [props.pohon?.itemDescription, item.pohon?.itemDescription] })"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof PCommandPaletteSlots<G, T>)"
                  :item="(item as any)"
                  :index="index"
                  :pohon="pohon"
                >
                  {{ getProp({ object: item, path: props.descriptionKey as string }) }}
                </slot>
              </span>
            </span>

            <span :class="pohon.itemTrailing({ class: [props.pohon?.itemTrailing, item.pohon?.itemTrailing] })">
              <slot
                :name="((item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`) as keyof PCommandPaletteSlots<G, T>)"
                :item="(item as any)"
                :index="index"
                :pohon="pohon"
              >
                <PIcon
                  v-if="item.children && item.children.length > 0"
                  :name="trailingIcon || appConfig.pohon.icons.chevronRight"
                  :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, item.pohon?.itemTrailingIcon] })"
                />

                <span
                  v-else-if="item.kbds?.length"
                  :class="pohon.itemTrailingKbds({ class: [props.pohon?.itemTrailingKbds, item.pohon?.itemTrailingKbds] })"
                >
                  <PKbd
                    v-for="(kbd, kbdIndex) in item.kbds"
                    :key="kbdIndex"
                    :size="((item.pohon?.itemTrailingKbdsSize || props.pohon?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as PKbdProps['size'])"
                    v-bind="isString(kbd) ? { value: kbd } : kbd"
                  />
                </span>

                <PIcon
                  v-else-if="group?.highlightedIcon"
                  :name="group.highlightedIcon"
                  :class="pohon.itemTrailingHighlightedIcon({ class: [props.pohon?.itemTrailingHighlightedIcon, item.pohon?.itemTrailingHighlightedIcon] })"
                />
              </slot>

              <AListboxItemIndicator
                v-if="!item.children?.length"
                as-child
              >
                <PIcon
                  :name="selectedIcon || appConfig.pohon.icons.check"
                  :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, item.pohon?.itemTrailingIcon] })"
                />
              </AListboxItemIndicator>
            </span>
          </slot>
        </PLinkBase>
      </PLink>
    </AListboxItem>
  </DefineItemTemplate>

  <AListboxRoot
    v-bind="rootProps"
    ref="listboxRootRef"
    :selection-behavior="selectionBehavior"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <AListboxFilter
      v-model="searchTerm"
      as-child
    >
      <PInput
        :placeholder="placeholder"
        variant="none"
        :autofocus="autofocus"
        v-bind="inputProps"
        :loading-icon="loadingIcon"
        :icon="icon || appConfig.pohon.icons.search"
        :class="pohon.input({ class: props.pohon?.input })"
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
              :icon="backIcon || appConfig.pohon.icons.arrowLeft"
              color="neutral"
              variant="link"
              :aria-label="t('commandPalette.back')"
              v-bind="(typeof back === 'object' ? back as Partial<PButtonProps> : {})"
              :class="pohon.back({ class: props.pohon?.back })"
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
              :icon="closeIcon || appConfig.pohon.icons.close"
              color="neutral"
              variant="ghost"
              :aria-label="t('commandPalette.close')"
              v-bind="(typeof close === 'object' ? close as Partial<PButtonProps> : {})"
              :class="pohon.close({ class: props.pohon?.close })"
              @click="emits('update:open', false)"
            />
          </slot>
        </template>
      </PInput>
    </AListboxFilter>

    <AListboxContent :class="pohon.content({ class: props.pohon?.content })">
      <div
        v-if="filteredGroups?.length"
        role="presentation"
        :class="pohon.viewport({ class: props.pohon?.viewport })"
      >
        <AListboxVirtualizer
          v-if="!!virtualize"
          v-slot="{ option: item, virtualItem }"
          :options="(filteredItems as any[])"
          :text-content="item => getProp({ object: item, path: props.labelKey as string })"
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
            :class="pohon.group({ class: props.pohon?.group })"
          >
            <AListboxGroupLabel
              v-if="getProp({ object: group, path: props.labelKey as string })"
              :class="pohon.label({ class: props.pohon?.label })"
            >
              {{ getProp({ object: group, path: props.labelKey as string }) }}
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
        :class="pohon.empty({ class: props.pohon?.empty })"
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
      :class="pohon.footer({ class: props.pohon?.footer })"
    >
      <slot
        name="footer"
        :pohon="pohon"
      />
    </div>
  </AListboxRoot>
</template>
