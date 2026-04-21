<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComboboxArrowProps, ComboboxContentEmits, ComboboxContentProps, ComboboxRootEmits, ComboboxRootProps } from 'akar';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { AAvatarProps, ChipProps, InputProps, PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ApplyModifiers, ModelModifiers } from '../types/input';
import type { AcceptableValue, ArrayOrNested, EmitsToProps, GetItemKeys, GetItemValue, GetModelValue, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/select-menu';

type SelectMenu = ComponentConfig<typeof theme, AppConfig, 'selectMenu'>;

export type SelectMenuValue = AcceptableValue;

export type PSelectMenuItem = SelectMenuValue | {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: AAvatarProps;
  chip?: ChipProps;
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item';
  disabled?: boolean;
  onSelect?: (e: Event) => void;
  class?: any;
  pohon?: Pick<SelectMenu['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

type ExcludeItem = { type: 'label' | 'separator' };
type IsClearUsed<M extends boolean, C extends boolean | object> = M extends false
  ? (C extends true ? null : C extends object ? null : never)
  : never;

export interface PSelectMenuProps<T extends ArrayOrNested<PSelectMenuItem> = ArrayOrNested<PSelectMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>, C extends boolean | object = false> extends Pick<ComboboxRootProps<T>, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect' | 'resetModelValueOnClear' | 'highlightOnHover' | 'by'>, UseComponentIconsProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  id?: string;
  /** The placeholder text when the select is empty. */
  placeholder?: string;
  /**
   * Whether to display the search input or not.
   * Can be an object to pass additional props to the input.
   * `{ placeholder: 'Search...', variant: 'none' }`{lang="ts-type"}
   * @defaultValue true
   */
  searchInput?: boolean | Omit<InputProps, 'modelValue' | 'defaultValue'>;
  /**
   * @defaultValue 'primary'
   */
  color?: SelectMenu['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: SelectMenu['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: SelectMenu['variants']['size'];
  required?: boolean;
  /**
   * The icon displayed to open the menu.
   * @defaultValue appConfig.pohon.icons.chevronDown
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
   * Display a clear button to reset the model value.
   * Can be an object to pass additional props to the Button.
   * @defaultValue false
   */
  clear?: (C & boolean) | (C & Partial<Omit<PButtonProps, PLinkPropsKeys>>);
  /**
   * The icon displayed in the clear button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  clearIcon?: PIconProps['name'];
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<ComboboxContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ComboboxContentEmits>>;
  /**
   * Display an arrow alongside the menu.
   * `{ rounded: true }`{lang="ts-type"}
   * @defaultValue false
   */
  arrow?: boolean | Omit<ComboboxArrowProps, 'as' | 'asChild'>;
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
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
  valueKey?: VK;
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  /**
   * When `items` is an array of objects, select the field to use as the description.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>;
  items?: T;
  /** The value of the SelectMenu when initially rendered. Use when you do not need to control the state of the SelectMenu. */
  defaultValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
  /** The controlled value of the SelectMenu. Can be binded-with with `v-model`. */
  modelValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
  modelModifiers?: Mod;
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean;
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /**
   * Determines if custom user input that does not exist in options can be added.
   * @defaultValue false
   */
  createItem?: boolean | 'always' | { position?: 'top' | 'bottom'; when?: 'empty' | 'always' };
  /**
   * Fields to filter items by.
   * @defaultValue [labelKey]
   */
  filterFields?: Array<string>;
  /**
   * When `true`, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  class?: any;
  pohon?: SelectMenu['slots'];
}

export interface SelectMenuEmits<
  A extends ArrayOrNested<PSelectMenuItem>,
  VK extends GetItemKeys<A> | undefined,
  M extends boolean,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  C extends boolean | object = false,
> extends Pick<ComboboxRootEmits, 'update:open'> {
  'change': [event: Event];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
  'create': [item: string];
  'clear': [];
  /** Event handler when highlighted element changes. */
  'highlight': [payload: {
    ref: HTMLElement;
    value: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
  } | undefined];
  'update:modelValue': [value: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>];
}

type SlotProps<T extends PSelectMenuItem> = (props: { item: T; index: number; pohon: SelectMenu['pohon'] }) => Array<VNode>;

export interface SelectMenuSlots<
  A extends ArrayOrNested<PSelectMenuItem> = ArrayOrNested<PSelectMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  C extends boolean | object = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading'?: (props: {
    modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
    open: boolean;
    pohon: SelectMenu['pohon'];
  }) => Array<VNode>;
  'default'?: (props: {
    modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
    open: boolean;
    pohon: SelectMenu['pohon'];
  }) => Array<VNode>;
  'trailing'?: (props: {
    modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
    open: boolean;
    pohon: SelectMenu['pohon'];
  }) => Array<VNode>;
  'empty'?: (props: { searchTerm: string }) => Array<VNode>;
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; index: number }) => Array<VNode>;
  'item-description'?: (props: { item: T; index: number }) => Array<VNode>;
  'item-trailing'?: SlotProps<T>;
  'content-top'?: (props?: {}) => Array<VNode>;
  'content-bottom'?: (props?: {}) => Array<VNode>;
  'create-item-label'?: (props: { item: string }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PSelectMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>, C extends boolean | object = false">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import { ComboboxAnchor, ComboboxArrow, ComboboxCancel, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxPortal, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxVirtualizer, FocusScope, useForwardPropsEmits } from 'akar';
import { defu } from 'defu';
import { computed, onMounted, toRaw, toRef, useTemplateRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { useComponentIcons } from '../composables/useComponentIcons';
import { FieldGroupReset, useFieldGroup } from '../composables/useFieldGroup';
import { useFilter } from '../composables/useFilter';
import { useFormField } from '../composables/useFormField';
import { usePortal } from '../composables/usePortal';
import { compare, get, getDisplayValue, isArrayOfArray, looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import { getEstimateSize } from '../utils/virtualizer';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import UChip from './Chip.vue';
import PIcon from './icon.vue';
import UInput from './Input.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PSelectMenuProps<T, VK, M, Mod, C>>(), {
  portal: true,
  searchInput: true,
  labelKey: 'label',
  descriptionKey: 'description',
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true,
  resetModelValueOnClear: true,
  autofocusDelay: 0,
  virtualize: false,
});
const emits = defineEmits<SelectMenuEmits<T, VK, M, Mod, C>>();
const slots = defineSlots<SelectMenuSlots<T, VK, M, Mod, C>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as SelectMenu['AppConfig'];
const pohonProp = useComponentPohon('selectMenu', props);
const { filterGroups } = useFilter();
const rootProps = useForwardPropsEmits(reactivePick(props, 'modelValue', 'defaultValue', 'open', 'defaultOpen', 'required', 'multiple', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'highlightOnHover', 'by'), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as ComboboxContentProps);
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as ComboboxArrowProps);
const clearProps = computed(() => typeof props.clear === 'object' ? props.clear : {} as Partial<Omit<PButtonProps, PLinkPropsKeys>>);

const virtualizerProps = toRef(() => {
  if (!props.virtualize) {
    return false;
  }

  return defu(typeof props.virtualize === 'boolean' ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, selectSize.value || 'md', props.descriptionKey as string, !!slots['item-description']),
  });
});
const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t('selectMenu.search'), variant: 'none' }) as Omit<InputProps, 'modelValue' | 'defaultValue'>);

const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<InputProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.pohon.icons.chevronDown })));

const selectSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: PSelectMenuItem; index: number }>({
  props: {
    item: {
      type: [Object, String, Number, Boolean],
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.selectMenu || {}) })({
  color: color.value,
  variant: props.variant,
  size: selectSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
  virtualize: !!props.virtualize,
}));

function displayValue(value: GetItemValue<T, VK, ExcludeItem> | Array<GetItemValue<T, VK, ExcludeItem>>): string | undefined {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value
      .map((item) => getDisplayValue<Array<T>, GetItemValue<T, VK, ExcludeItem>>(items.value, item, {
        labelKey: props.labelKey,
        valueKey: props.valueKey,
        by: props.by,
      }))
      .filter((v): v is string => v != null && v !== '');

    return displayedValues.length > 0 ? displayedValues.join(', ') : undefined;
  }

  return getDisplayValue<Array<T>, GetItemValue<T, VK, ExcludeItem>>(items.value, value as GetItemValue<T, VK, ExcludeItem>, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
    by: props.by,
  });
}

const groups = computed<Array<Array<PSelectMenuItem>>>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

const items = computed(() => groups.value.flatMap((group) => group) as Array<T>);

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as Array<string>;

  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: (item: PSelectMenuItem) => isSelectItem(item) && !!item.type && ['label', 'separator'].includes(item.type),
  });
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));

const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value) {
    return false;
  }

  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } as NestedItem<T> : searchTerm.value;

  if ((typeof props.createItem === 'object' && props.createItem.when === 'always') || props.createItem === 'always') {
    return !filteredItems.value.some((item) => compare(item, newItem, (props.by ?? props.valueKey) as string | undefined));
  }

  return !filteredItems.value.length;
});
const createItemPosition = computed(() => typeof props.createItem === 'object' ? props.createItem.position : 'bottom');

const triggerRef = useTemplateRef('triggerRef');

function autoFocus() {
  if (props.autofocus) {
    triggerRef.value?.$el?.focus({
      focusVisible: true,
    });
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

function onUpdate(value: any) {
  if (toRaw(props.modelValue) === value) {
    return;
  }

  if (props.modelModifiers?.trim && (typeof value === 'string' || value === null || value === undefined)) {
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

  if (props.resetSearchTermOnSelect) {
    searchTerm.value = '';
  }
}

function onUpdateOpen(value: boolean) {
  let timeoutId;

  if (!value) {
    const event = new FocusEvent('blur');

    emits('blur', event);
    emitFormBlur();

    // Since we use `displayValue` prop inside ComboboxInput we should reset searchTerm manually
    // https://akar.com/docs/components/combobox#api-reference
    if (props.resetSearchTermOnBlur) {
      const STATE_ANIMATION_DELAY_MS = 100;

      timeoutId = setTimeout(() => {
        searchTerm.value = '';
      }, STATE_ANIMATION_DELAY_MS);
    }
  } else {
    const event = new FocusEvent('focus');
    emits('focus', event);
    emitFormFocus();
    clearTimeout(timeoutId);
  }
}

function onCreate(e: Event) {
  e.preventDefault();
  e.stopPropagation();

  emits('create', searchTerm.value);
}

function onSelect(e: Event, item: PSelectMenuItem) {
  if (!isSelectItem(item)) {
    return;
  }

  if (item.disabled) {
    e.preventDefault();
    return;
  }

  item.onSelect?.(e);
}

function isSelectItem(item: PSelectMenuItem): item is Exclude<PSelectMenuItem, SelectMenuValue> {
  return typeof item === 'object' && item !== null;
}

function isModelValueEmpty(modelValue: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>): boolean {
  if (props.multiple && Array.isArray(modelValue)) {
    return modelValue.length === 0;
  }
  return modelValue === undefined || modelValue === null || modelValue === '';
}

function onClear() {
  emits('clear');
}

const viewportRef = useTemplateRef('viewportRef');

defineExpose({
  triggerRef: toRef(() => triggerRef.value?.$el as HTMLButtonElement),
  viewportRef: toRef(() => viewportRef.value),
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineCreateItemTemplate>
    <ComboboxItem
      data-slot="item"
      :class="pohon.item({ class: pohonProp?.item })"
      :value="searchTerm"
      @select="onCreate"
    >
      <span
        data-slot="itemLabel"
        :class="pohon.itemLabel({ class: pohonProp?.itemLabel })"
      >
        <slot
          name="create-item-label"
          :item="searchTerm"
        >
          {{ t('selectMenu.create', { label: searchTerm }) }}
        </slot>
      </span>
    </ComboboxItem>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <ComboboxLabel
      v-if="isSelectItem(item) && item.type === 'label'"
      data-slot="label"
      :class="pohon.label({ class: [pohonProp?.label, item.pohon?.label, item.class] })"
    >
      {{ get(item, props.labelKey as string) }}
    </ComboboxLabel>

    <ComboboxSeparator
      v-else-if="isSelectItem(item) && item.type === 'separator'"
      data-slot="separator"
      :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator, item.class] })"
    />

    <ComboboxItem
      v-else
      data-slot="item"
      :class="pohon.item({ class: [pohonProp?.item, isSelectItem(item) && item.pohon?.item, isSelectItem(item) && item.class] })"
      :disabled="isSelectItem(item) && item.disabled"
      :value="props.valueKey && isSelectItem(item) ? get(item, props.valueKey as string) : item"
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
            v-if="isSelectItem(item) && item.icon"
            :name="item.icon"
            data-slot="itemLeadingIcon"
            :class="pohon.itemLeadingIcon({ class: [pohonProp?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
          />
          <PAvatar
            v-else-if="isSelectItem(item) && item.avatar"
            :size="((item.pohon?.itemLeadingAvatarSize || pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as AAvatarProps['size'])"
            v-bind="item.avatar"
            data-slot="itemLeadingAvatar"
            :class="pohon.itemLeadingAvatar({ class: [pohonProp?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
          />
          <UChip
            v-else-if="isSelectItem(item) && item.chip"
            :size="((item.pohon?.itemLeadingChipSize || pohonProp?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as ChipProps['size'])"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="pohon.itemLeadingChip({ class: [pohonProp?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
          />
        </slot>

        <span
          data-slot="itemWrapper"
          :class="pohon.itemWrapper({ class: [pohonProp?.itemWrapper, isSelectItem(item) && item.pohon?.itemWrapper] })"
        >
          <span
            data-slot="itemLabel"
            :class="pohon.itemLabel({ class: [pohonProp?.itemLabel, isSelectItem(item) && item.pohon?.itemLabel] })"
          >
            <slot
              name="item-label"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
            </slot>
          </span>

          <span
            v-if="isSelectItem(item) && (get(item, props.descriptionKey as string) || !!slots['item-description'])"
            data-slot="itemDescription"
            :class="pohon.itemDescription({ class: [pohonProp?.itemDescription, isSelectItem(item) && item.pohon?.itemDescription] })"
          >
            <slot
              name="item-description"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ get(item, props.descriptionKey as string) }}
            </slot>
          </span>
        </span>

        <span
          data-slot="itemTrailing"
          :class="pohon.itemTrailing({ class: [pohonProp?.itemTrailing, isSelectItem(item) && item.pohon?.itemTrailing] })"
        >
          <slot
            name="item-trailing"
            :item="(item as NestedItem<T>)"
            :index="index"
            :pohon="pohon"
          />

          <ComboboxItemIndicator as-child>
            <PIcon
              :name="selectedIcon || appConfig.pohon.icons.check"
              data-slot="itemTrailingIcon"
              :class="pohon.itemTrailingIcon({ class: [pohonProp?.itemTrailingIcon, isSelectItem(item) && item.pohon?.itemTrailingIcon] })"
            />
          </ComboboxItemIndicator>
        </span>
      </slot>
    </ComboboxItem>
  </DefineItemTemplate>

  <ComboboxRoot
    :id="id"
    v-slot="{ modelValue, open }"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    ignore-filter
    as-child
    :name="name"
    :disabled="disabled"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger
        ref="triggerRef"
        data-slot="base"
        :class="pohon.base({ class: [pohonProp?.base, props.class] })"
        tabindex="0"
      >
        <span
          v-if="isLeading || !!avatar || !!slots.leading"
          data-slot="leading"
          :class="pohon.leading({ class: pohonProp?.leading })"
        >
          <slot
            name="leading"
            :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
            :open="open"
            :pohon="pohon"
          >
            <PIcon
              v-if="isLeading && leadingIconName"
              :name="leadingIconName"
              data-slot="leadingIcon"
              :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
            />
            <PAvatar
              v-else-if="!!avatar"
              :size="((pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as AAvatarProps['size'])"
              v-bind="avatar"
              data-slot="itemLeadingAvatar"
              :class="pohon.itemLeadingAvatar({ class: pohonProp?.itemLeadingAvatar })"
            />
          </slot>
        </span>

        <slot
          :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
          :open="open"
          :pohon="pohon"
        >
          <template
            v-for="displayedModelValue in [displayValue(modelValue as any)]"
            :key="displayedModelValue"
          >
            <span
              v-if="displayedModelValue !== undefined && displayedModelValue !== null"
              data-slot="value"
              :class="pohon.value({ class: pohonProp?.value })"
            >
              {{ displayedModelValue }}
            </span>
            <span
              v-else
              data-slot="placeholder"
              :class="pohon.placeholder({ class: pohonProp?.placeholder })"
            >
              {{ placeholder ?? '&nbsp;' }}
            </span>
          </template>
        </slot>

        <span
          v-if="isTrailing || !!slots.trailing || !!clear"
          data-slot="trailing"
          :class="pohon.trailing({ class: pohonProp?.trailing })"
        >
          <slot
            name="trailing"
            :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
            :open="open"
            :pohon="pohon"
          >
            <ComboboxCancel
              v-if="!!clear && !isModelValueEmpty(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
              as-child
            >
              <PButton
                as="span"
                :icon="clearIcon || appConfig.pohon.icons.close"
                :size="selectSize"
                variant="link"
                color="neutral"
                tabindex="-1"
                v-bind="clearProps"
                data-slot="trailingClear"
                :class="pohon.trailingClear({ class: pohonProp?.trailingClear })"
                @click.stop="onClear"
              />
            </ComboboxCancel>

            <PIcon
              v-else-if="trailingIconName"
              :name="trailingIconName"
              data-slot="trailingIcon"
              :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
            />
          </slot>
        </span>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal v-bind="portalProps">
      <FieldGroupReset>
        <ComboboxContent
          data-slot="content"
          :class="pohon.content({ class: pohonProp?.content })"
          v-bind="contentProps"
        >
          <FocusScope
            trapped
            data-slot="focusScope"
            :class="pohon.focusScope({ class: pohonProp?.focusScope })"
          >
            <slot name="content-top" />

            <ComboboxInput
              v-if="!!searchInput"
              v-model="searchTerm"
              :display-value="() => searchTerm"
              as-child
            >
              <UInput
                autofocus
                autocomplete="off"
                :size="selectSize"
                v-bind="searchInputProps"
                :model-modifiers="{
                  trim: modelModifiers?.trim,
                }"
                data-slot="input"
                :class="pohon.input({ class: pohonProp?.input })"
                @change.stop
              />
            </ComboboxInput>

            <ComboboxEmpty
              data-slot="empty"
              :class="pohon.empty({ class: pohonProp?.empty })"
            >
              <slot
                name="empty"
                :search-term="searchTerm"
              >
                {{ searchTerm ? t('selectMenu.noMatch', { searchTerm }) : t('selectMenu.noData') }}
              </slot>
            </ComboboxEmpty>

            <div
              ref="viewportRef"
              role="presentation"
              data-slot="viewport"
              :class="pohon.viewport({ class: pohonProp?.viewport })"
            >
              <template v-if="!!virtualize">
                <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

                <ComboboxVirtualizer
                  v-slot="{ option: item, virtualItem }"
                  :options="(filteredItems as any[])"
                  :text-content="item => isSelectItem(item) ? get(item, props.labelKey as string) : String(item)"
                  v-bind="virtualizerProps"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :index="virtualItem.index"
                  />
                </ComboboxVirtualizer>

                <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
              </template>

              <template v-else>
                <ComboboxGroup
                  v-if="createItem && createItemPosition === 'top'"
                  data-slot="group"
                  :class="pohon.group({ class: pohonProp?.group })"
                >
                  <ReuseCreateItemTemplate />
                </ComboboxGroup>

                <ComboboxGroup
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
                </ComboboxGroup>

                <ComboboxGroup
                  v-if="createItem && createItemPosition === 'bottom'"
                  data-slot="group"
                  :class="pohon.group({ class: pohonProp?.group })"
                >
                  <ReuseCreateItemTemplate />
                </ComboboxGroup>
              </template>
            </div>

            <slot name="content-bottom" />
          </FocusScope>

          <ComboboxArrow
            v-if="!!arrow"
            v-bind="arrowProps"
            data-slot="arrow"
            :class="pohon.arrow({ class: pohonProp?.arrow })"
          />
        </ComboboxContent>
      </FieldGroupReset>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
