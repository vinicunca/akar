<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AListboxRootEmits, AListboxRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PAvatarProps, PChipProps, PIconProps, PInputProps } from '../types';
import type { ApplyModifiers, ModelModifiers } from '../types/input';
import type { ArrayOrNested, GetItemKeys, GetModelValue, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import { computed, toRaw, toRef } from 'vue';
import theme from '#build/pohon/listbox';

type Listbox = ComponentConfig<typeof theme, AppConfig, 'listbox'>;

export interface PListboxItem {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  chip?: PChipProps;
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item';
  disabled?: boolean;
  onSelect?: (event: Event) => void;
  class?: any;
  pohon?: Pick<Listbox['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatar' | 'itemLeadingAvatarSize' | 'itemLeadingChip' | 'itemLeadingChipSize' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
}

export interface PListboxProps<T extends ArrayOrNested<PListboxItem> = ArrayOrNested<PListboxItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>> extends Pick<AListboxRootProps, 'by' | 'disabled' | 'highlightOnHover' | 'name' | 'orientation' | 'required' | 'selectionBehavior'> {
  id?: string;
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'md'
   */
  size?: Listbox['variants']['size'];
  /**
   * The items to display in the list.
   */
  items?: T;
  /**
   * The controlled value of the Listbox. Can be bound with `v-model`.
   */
  modelValue?: ApplyModifiers<GetModelValue<T, VK, M>, Mod>;
  modelModifiers?: Mod;
  /**
   * The default value when not controlled.
   */
  defaultValue?: ApplyModifiers<GetModelValue<T, VK, M>, Mod>;
  /**
   * Whether multiple items can be selected.
   * @defaultValue false
   */
  multiple?: M & boolean;
  /**
   * When `items` is an array of objects, select the field to use as the value instead of the object itself.
   * @defaultValue undefined
   */
  valueKey?: VK;
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
   * Whether the list is in a loading state.
   */
  loading?: boolean;
  /**
   * The icon displayed when loading.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name'];
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
   * When `true`, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean;
  /**
   * The icon displayed when an item is selected.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  selectedIcon?: PIconProps['name'];
  /**
   * Enable virtualization for large lists.
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
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  class?: any;
  pohon?: Listbox['slots'];
}

export type ListboxEmits<T extends ArrayOrNested<PListboxItem> = ArrayOrNested<PListboxItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>> = Pick<AListboxRootEmits, 'entryFocus' | 'highlight' | 'leave'> & {
  'change': [event: Event];
  'update:modelValue': [value: ApplyModifiers<GetModelValue<T, VK, M>, Mod>];
};

type SlotProps<T> = (props: { item: T; index: number; pohon: Listbox['pohon'] }) => Array<VNode>;

export type PListboxSlots<T extends ArrayOrNested<PListboxItem> = ArrayOrNested<PListboxItem>> = {
  'loading'?: (props?: {}) => Array<VNode>;
  'empty'?: (props: { searchTerm: string }) => Array<VNode>;
  'item'?: SlotProps<NestedItem<T>>;
  'item-leading'?: SlotProps<NestedItem<T>>;
  'item-label'?: (props: { item: NestedItem<T>; index: number }) => Array<VNode>;
  'item-description'?: (props: { item: NestedItem<T>; index: number }) => Array<VNode>;
  'item-trailing'?: SlotProps<NestedItem<T>>;
};

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PListboxItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>">
import { isBoolean, isNullish, isObjectType, isString } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
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
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFilter } from '../composables/use-filter';
import { useFormField } from '../composables/use-form-field';
import { useLocale } from '../composables/use-locale';
import { getProp, isArrayOfArray, looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import { getEstimateSize } from '../utils/virtualizer';
import PAvatar from './Avatar.vue';
import PChip from './Chip.vue';
import PIcon from './Icon.vue';
import PInput from './Input.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PListboxProps<T, VK, M, Mod>>(),
  {
    labelKey: 'label',
    descriptionKey: 'description',
    highlightOnHover: true,
    filter: false,
    autofocusDelay: 0,
    virtualize: false,
  },
);
const emits = defineEmits<ListboxEmits<T, VK, M, Mod>>();
const slots = defineSlots<PListboxSlots<T>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as Listbox['AppConfig'];
const pohonProp = useComponentPohon('listbox', props);
const { filterGroups } = useFilter();

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'modelValue',
    'defaultValue',
    'multiple',
    'selectionBehavior',
    'highlightOnHover',
    'by',
    'orientation',
    'required',
  ),
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
        size.value || 'md',
        props.descriptionKey as string,
        !!slots['item-description'],
      ),
    },
  );
});
const inputProps = toRef(() => defu(
  isObjectType(props.filter) ? props.filter : {},
  { placeholder: t('listbox.search'), variant: 'none' },
) as Omit<PInputProps, 'modelValue' | 'defaultValue'>);

const {
  emitFormChange,
  emitFormInput,
  name,
  size,
  color,
  id,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputProps>(props, { bind: false });

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: PListboxItem; index: number }>({
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.listbox || {}) })({
  color: color.value,
  size: size.value,
  highlight: highlight.value,
  disabled: disabled.value,
  virtualize: !!props.virtualize,
}));

function onUpdate(value: any) {
  if (toRaw(props.modelValue) === value) {
    return;
  }

  if (props.modelModifiers?.trim && (isString(value) || isNullish(value))) {
    value = value?.trim() ?? null;
  }

  if (props.modelModifiers?.number) {
    value = looseToNumber(value);
  }

  if (props.modelModifiers?.nullable) {
    value ??= null;
  }

  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ??= undefined;
  }

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}

function onSelect(event: Event, item: PListboxItem) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  item.onSelect?.(event);
}

const groups = computed<Array<Array<PListboxItem>>>(() =>
  // eslint-disable-next-line no-nested-ternary
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

function isStructuralItem(item: PListboxItem): boolean {
  return !!item.type && ['label', 'separator'].includes(item.type);
}

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as Array<string>;

  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: isStructuralItem,
  });
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group) as Array<NestedItem<T>>);
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineItemTemplate v-slot="{ item, index }">
    <AListboxGroupLabel
      v-if="item.type === 'label'"
      data-slot="label"
      :class="pohon.label({ class: [pohonProp?.label, item.pohon?.label, item.class] })"
    >
      {{ getProp(item, props.labelKey as string) }}
    </AListboxGroupLabel>

    <div
      v-else-if="item.type === 'separator'"
      role="separator"
      data-slot="separator"
      :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator, item.class] })"
    />

    <AListboxItem
      v-else
      :value="props.valueKey ? getProp(item, props.valueKey as string) : item"
      :disabled="item.disabled"
      data-slot="item"
      :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item, item.class] })"
      @select="onSelect($event, item)"
    >
      <slot
        name="item"
        :item="(item as NestedItem<T>)"
        :index="index"
        :pohon="pohon"
      >
        <slot
          name="item-leading"
          :item="(item as NestedItem<T>)"
          :index="index"
          :pohon="pohon"
        >
          <PIcon
            v-if="item.icon"
            :name="item.icon"
            data-slot="itemLeadingIcon"
            :class="pohon.itemLeadingIcon({ class: [pohonProp?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
          />
          <PAvatar
            v-else-if="item.avatar"
            :size="((item.pohon?.itemLeadingAvatarSize || pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="item.avatar"
            data-slot="itemLeadingAvatar"
            :class="pohon.itemLeadingAvatar({ class: [pohonProp?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
          />
          <PChip
            v-else-if="item.chip"
            :size="((item.pohon?.itemLeadingChipSize || pohonProp?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="pohon.itemLeadingChip({ class: [pohonProp?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
          />
        </slot>

        <span
          v-if="getProp(item, props.labelKey as string) || getProp(item, props.descriptionKey as string) || !!slots['item-label'] || !!slots['item-description']"
          data-slot="itemWrapper"
          :class="pohon.itemWrapper({ class: [pohonProp?.itemWrapper, item.pohon?.itemWrapper] })"
        >
          <span
            v-if="getProp(item, props.labelKey as string) || !!slots['item-label']"
            data-slot="itemLabel"
            :class="pohon.itemLabel({ class: [pohonProp?.itemLabel, item.pohon?.itemLabel] })"
          >
            <slot
              name="item-label"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ getProp(item, props.labelKey as string) }}
            </slot>
          </span>

          <span
            v-if="getProp(item, props.descriptionKey as string) || !!slots['item-description']"
            data-slot="itemDescription"
            :class="pohon.itemDescription({ class: [pohonProp?.itemDescription, item.pohon?.itemDescription] })"
          >
            <slot
              name="item-description"
              :item="(item as NestedItem<T>)"
              :index="index"
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
            name="item-trailing"
            :item="(item as NestedItem<T>)"
            :index="index"
            :pohon="pohon"
          />

          <AListboxItemIndicator as-child>
            <PIcon
              :name="selectedIcon || appConfig.pohon.icons.check"
              data-slot="itemTrailingIcon"
              :class="pohon.itemTrailingIcon({ class: [pohonProp?.itemTrailingIcon, item.pohon?.itemTrailingIcon] })"
            />
          </AListboxItemIndicator>
        </span>
      </slot>
    </AListboxItem>
  </DefineItemTemplate>

  <AListboxRoot
    :id="id"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :disabled="disabled"
    :name="name"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <AListboxFilter
      v-if="filter"
      v-model="searchTerm"
      as-child
    >
      <PInput
        :autofocus="autofocus"
        :autofocus-delay="autofocusDelay"
        :size="size"
        v-bind="inputProps"
        data-slot="input"
        :class="pohon.input({ class: pohonProp?.input })"
      />
    </AListboxFilter>

    <AListboxContent
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <div
        v-if="loading"
        data-slot="loading"
        :class="pohon.loading({ class: pohonProp?.loading })"
      >
        <slot name="loading">
          <PIcon
            :name="loadingIcon || appConfig.pohon.icons.loading"
            data-slot="loadingIcon"
            :class="pohon.loadingIcon({ class: pohonProp?.loadingIcon })"
          />
        </slot>
      </div>
      <div
        v-else-if="!filteredItems.length"
        data-slot="empty"
        :class="pohon.empty({ class: pohonProp?.empty })"
      >
        <slot
          name="empty"
          :search-term="searchTerm"
        >
          {{ searchTerm ? t('listbox.noMatch', { searchTerm }) : t('listbox.noData') }}
        </slot>
      </div>

      <AListboxVirtualizer
        v-else-if="!!virtualize"
        v-slot="{ option: item, virtualItem }"
        :options="(filteredItems as any[])"
        :text-content="(item: any) => getProp(item, props.labelKey as string)"
        v-bind="virtualizerProps"
      >
        <ReuseItemTemplate
          :item="item"
          :index="virtualItem.index"
        />
      </AListboxVirtualizer>

      <template v-else>
        <AListboxGroup
          v-for="(group, groupIndex) in filteredGroups"
          :key="`group-${groupIndex}`"
          data-slot="group"
          :class="pohon.group({ class: pohonProp?.group })"
        >
          <ReuseItemTemplate
            v-for="(item, index) in group"
            :key="`group-${groupIndex}-${index}`"
            :item="item"
            :index="index"
          />
        </AListboxGroup>
      </template>
    </AListboxContent>
  </AListboxRoot>
</template>
