<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AComboboxArrowProps,
  AComboboxContentEmits,
  AComboboxContentProps,
  AComboboxRootEmits,
  AComboboxRootProps,
} from 'akar';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PButtonProps, PChipProps, PIconProps, PInputProps, PLinkPropsKeys } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ModelModifiers } from '../types/input';
import type {
  AcceptableValue,
  ArrayOrNested,
  EmitsToProps,
  GetItemKeys,
  GetItemValue,
  GetModelValue,
  GetModelValueEmits,
  NestedItem,
} from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/select-menu';

type SelectMenu = ComponentConfig<typeof theme, AppConfig, 'selectMenu'>;

export type PSelectMenuValue = AcceptableValue;
export type PSelectMenuItem = PSelectMenuValue | {
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
  onSelect?: (event?: Event) => void;
  class?: any;
  pohon?: Pick<SelectMenu['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

export interface PSelectMenuProps<T extends ArrayOrNested<PSelectMenuItem> = ArrayOrNested<PSelectMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false> extends Pick<AComboboxRootProps<T>, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetModelValueOnClear' | 'resetSearchTermOnSelect' | 'highlightOnHover'>, UseComponentIconsProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  id?: string;
  /** The placeholder text when the select is empty. */
  placeholder?: string;
  /**
   * Whether to display the search input or not.
   * Can be an object to pass additional props to the input.
   * `{ placeholder: 'Search...', variant: 'none' }`{lang="ts-type"}
   * @defaultValue true
   */
  searchInput?: boolean | PInputProps;
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
  clear?: boolean | Partial<Omit<PButtonProps, PLinkPropsKeys>>;
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
  content?: Omit<AComboboxContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<AComboboxContentEmits>>;
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   * @IconifyIcon
   */
  arrow?: boolean | Omit<AComboboxArrowProps, 'as' | 'asChild'>;
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
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
  defaultValue?: GetModelValue<T, VK, M>;
  /** The controlled value of the SelectMenu. Can be binded-with `v-model`. */
  modelValue?: GetModelValue<T, VK, M>;
  modelModifiers?: Omit<ModelModifiers<GetModelValue<T, VK, M>>, 'lazy'>;
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

export type PSelectMenuEmits<A extends ArrayOrNested<PSelectMenuItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Pick<AComboboxRootEmits, 'update:open'> & {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  create: [item: string];
  clear: [];
  /** Event handler when highlighted element changes. */
  highlight: [payload: {
    ref: HTMLElement;
    value: GetModelValue<A, VK, M>;
  } | undefined];
} & GetModelValueEmits<A, VK, M>;

type SlotProps<T extends PSelectMenuItem> = (props: { item: T; index: number; pohon: SelectMenu['pohon'] }) => any;

export interface PSelectMenuSlots<
  A extends ArrayOrNested<PSelectMenuItem> = ArrayOrNested<PSelectMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: SelectMenu['pohon'] }) => any;
  'default': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: SelectMenu['pohon'] }) => any;
  'trailing': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: SelectMenu['pohon'] }) => any;
  'empty': (props: { searchTerm?: string }) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; index: number }) => any;
  'item-description': (props: { item: T; index: number }) => any;
  'item-trailing': SlotProps<T>;
  'content-top': (props?: object) => any;
  'content-bottom': (props?: object) => any;
  'create-item-label': (props: { item: string }) => any;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PSelectMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false">
import { useAppConfig } from '#imports';
import { isBoolean, isNonNullish } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  AComboboxAnchor,
  AComboboxArrow,
  AComboboxCancel,
  AComboboxContent,
  AComboboxEmpty,
  AComboboxGroup,
  AComboboxInput,
  AComboboxItem,
  AComboboxItemIndicator,
  AComboboxLabel,
  AComboboxPortal,
  AComboboxRoot,
  AComboboxSeparator,
  AComboboxTrigger,
  AComboboxVirtualizer,
  AFocusScope,
  useFilter,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, onMounted, toRaw, toRef, useTemplateRef } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { compare, getDisplayValue, getProp, isArrayOfArray, looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import getEstimateSize from '../utils/virtualizer';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';
import PInput from './input.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PSelectMenuProps<T, VK, M>>(),
  {
    portal: true,
    searchInput: true,
    labelKey: 'label',
    descriptionKey: 'description',
    resetSearchTermOnBlur: true,
    resetSearchTermOnSelect: true,
    resetModelValueOnClear: true,
    autofocusDelay: 0,
    virtualize: false,
  },
);
const emits = defineEmits<PSelectMenuEmits<T, VK, M>>();
const slots = defineSlots<PSelectMenuSlots<T, VK, M>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as SelectMenu['AppConfig'];
const { contains } = useFilter({ sensitivity: 'base' });

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'modelValue',
    'defaultValue',
    'open',
    'defaultOpen',
    'required',
    'multiple',
    'resetSearchTermOnBlur',
    'resetSearchTermOnSelect',
    'resetModelValueOnClear',
    'highlightOnHover',
  ),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() =>
  defu(
    props.content,
    { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' },
  ) as AComboboxContentProps,
);
const arrowProps = toRef(() => props.arrow as AComboboxArrowProps);
const clearProps = computed(() =>
  typeof props.clear === 'object'
    ? props.clear
    : {} as Partial<Omit<PButtonProps, PLinkPropsKeys>>,
);

const virtualizerProps = toRef(() => {
  if (!props.virtualize) {
    return false;
  }

  return defu(isBoolean(props.virtualize) ? {} : props.virtualize, {
    estimateSize: getEstimateSize({
      items: filteredItems.value,
      size: selectSize.value || 'md',
      descriptionKey: props.descriptionKey as string,
      hasDescriptionSlot: !!slots['item-description'],
    }),
  });
});

const searchInputProps = toRef(() =>
  defu(
    props.searchInput,
    { placeholder: t('selectMenu.search'), variant: 'none' },
  ) as PInputProps,
);

const {
  emitFormBlur,
  emitFormFocus,
  emitFormInput,
  emitFormChange,
  size: formGroupSize,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.pohon.icons.chevronDown })));

const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{
  item: PSelectMenuItem;
  index: number;
}>({
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

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.selectMenu || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: selectSize?.value,
    loading: props.loading,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    fieldGroup: orientation.value,
    virtualize: !!props.virtualize,
  }),
);

function displayValue(value: GetItemValue<T, VK> | Array<GetItemValue<T, VK>>): string | undefined {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value
      .map((item) => getDisplayValue<Array<T>, GetItemValue<T, VK>>({
        items: items.value,
        value: item,
        options: {
          labelKey: props.labelKey,
          valueKey: props.valueKey,
        },
      }))
      .filter((v): v is string => v != null && v !== '');

    return displayedValues.length > 0 ? displayedValues.join(', ') : undefined;
  }

  return getDisplayValue<Array<T>, GetItemValue<T, VK>>({
    items: items.value,
    value: value as GetItemValue<T, VK>,
    options: {
      labelKey: props.labelKey,
      valueKey: props.valueKey,
    },
  });
}

const groups = computed<Array<Array<PSelectMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

const items = computed(() => groups.value.flatMap((group) => group) as Array<T>);

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as Array<string>;

  return groups.value.map((items) => items.filter((item) => {
    if (item === undefined || item === null) {
      return false;
    }

    if (typeof item !== 'object') {
      return contains({ string: String(item), substring: searchTerm.value });
    }

    if (item.type && ['label', 'separator'].includes(item.type)) {
      return true;
    }

    return fields.some((field) => {
      const value = getProp({ object: item, path: field });
      return isNonNullish(value) && contains({ string: String(value), substring: searchTerm.value });
    });
  })).filter((group) => group.filter((item) =>
    !isSelectItem(item) || (!item.type || !['label', 'separator'].includes(item.type)),
  ).length > 0);
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));

const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value) {
    return false;
  }

  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } as NestedItem<T> : searchTerm.value;

  if ((typeof props.createItem === 'object' && props.createItem.when === 'always') || props.createItem === 'always') {
    return !filteredItems.value.find((item) => compare({
      value: item,
      currentValue: newItem,
      comparator: props.valueKey as string,
    }));
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

  if (props.modelModifiers?.trim) {
    value = value?.trim() ?? null;
  }

  if (props.modelModifiers?.number) {
    value = looseToNumber(value);
  }

  if (props.modelModifiers?.nullable) {
    value ??= null;
  }

  if (props.modelModifiers?.optional) {
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
    // https://akar.vinicunca.dev/docs/akar/components/combobox#api-reference
    if (props.resetSearchTermOnBlur) {
      const STATE_ANIMATION_DELAY_MS = 100;

      // eslint-disable-next-line sonar/no-dead-store
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

function onCreate(event: Event) {
  event.preventDefault();
  event.stopPropagation();

  emits('create', searchTerm.value);
}

function onSelect(event: Event, item: PSelectMenuItem) {
  if (!isSelectItem(item)) {
    return;
  }

  if (item.disabled) {
    event.preventDefault();
    return;
  }

  item.onSelect?.(event);
}

function isSelectItem(item: PSelectMenuItem): item is Exclude<PSelectMenuItem, PSelectMenuValue> {
  return typeof item === 'object' && item !== null;
}

function isModelValueEmpty(modelValue: GetModelValue<T, VK, M>): boolean {
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
    <AComboboxItem
      :class="pohon.item({ class: props.pohon?.item })"
      :value="searchTerm"
      data-pohon="select-menu-item"
      @select="onCreate"
    >
      <span
        :class="pohon.itemLabel({ class: props.pohon?.itemLabel })"
        data-pohon="select-menu-item-label"
      >
        <slot
          name="create-item-label"
          :item="searchTerm"
        >
          {{ t('selectMenu.create', { label: searchTerm }) }}
        </slot>
      </span>
    </AComboboxItem>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <AComboboxLabel
      v-if="isSelectItem(item) && item.type === 'label'"
      data-pohon="select-menu-label"
      :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label, item.class] })"
    >
      {{ getProp({ object: item, path: props.labelKey as string }) }}
    </AComboboxLabel>

    <AComboboxSeparator
      v-else-if="isSelectItem(item) && item.type === 'separator'"
      :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator, item.class] })"
    />

    <AComboboxItem
      v-else
      :class="pohon.item({ class: [props.pohon?.item, isSelectItem(item) && item.pohon?.item, isSelectItem(item) && item.class] })"
      data-pohon="select-menu-item"
      :disabled="isSelectItem(item) && item.disabled"
      :value="props.valueKey && isSelectItem(item) ? getProp({ object: item, path: props.valueKey as string }) : item"
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
            :class="pohon.itemLeadingIcon({ class: [props.pohon?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
            data-pohon="select-menu-item-leading-icon"
          />
          <PAvatar
            v-else-if="isSelectItem(item) && item.avatar"
            :size="((item.pohon?.itemLeadingAvatarSize || props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="item.avatar"
            :class="pohon.itemLeadingAvatar({ class: [props.pohon?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
            data-pohon="select-menu-item-leading-avatar"
          />

          <PChip
            v-else-if="isSelectItem(item) && item.chip"
            :size="((props.pohon?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
            inset
            standalone
            v-bind="item.chip"
            :class="pohon.itemLeadingChip({ class: [props.pohon?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
            data-pohon="select-menu-item-leading-chip"
          />
        </slot>

        <span
          :class="pohon.itemWrapper({
            class: [
              props.pohon?.itemWrapper, isSelectItem(item) && item.pohon?.itemWrapper,
            ],
          })"
          data-pohon="select-menu-item-wrapper"
        >
          <span
            :class="pohon.itemLabel({
              class: [
                props.pohon?.itemLabel, isSelectItem(item) && item.pohon?.itemLabel,
              ],
            })"
            data-pohon="select-menu-item-label"
          >
            <slot
              name="item-label"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ isSelectItem(item) ? getProp({ object: item, path: props.labelKey as string }) : item }}
            </slot>
          </span>

          <span
            v-if="isSelectItem(item) && (getProp({ object: item, path: props.descriptionKey as string }) || !!slots['item-description'])"
            :class="pohon.itemDescription({
              class: [
                props.pohon?.itemDescription, isSelectItem(item) && item.pohon?.itemDescription,
              ],
            })"
            data-pohon="select-menu-item-description"
          >
            <slot
              name="item-description"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ getProp({ object: item, path: props.descriptionKey as string }) }}
            </slot>
          </span>
        </span>

        <span
          :class="pohon.itemTrailing({ class: [props.pohon?.itemTrailing, isSelectItem(item) && item.pohon?.itemTrailing] })"
          data-pohon="select-menu-item-trailing"
        >
          <slot
            name="item-trailing"
            :item="(item as NestedItem<T>)"
            :index="index"
            :pohon="pohon"
          />

          <AComboboxItemIndicator as-child>
            <PIcon
              :name="selectedIcon || appConfig.pohon.icons.check"
              :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, isSelectItem(item) && item.pohon?.itemTrailingIcon] })"
              data-pohon="select-menu-item-trailing-icon"
            />
          </AComboboxItemIndicator>
        </span>
      </slot>
    </AComboboxItem>
  </DefineItemTemplate>

  <AComboboxRoot
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
    <AComboboxAnchor as-child>
      <AComboboxTrigger
        ref="triggerRef"
        :class="pohon.base({ class: [props.pohon?.base, props.class] })"
        data-pohon="select-menu-base"
        tabindex="0"
      >
        <span
          v-if="isLeading || !!avatar || !!slots.leading"
          :class="pohon.leading({ class: props.pohon?.leading })"
          data-pohon="select-menu-leading"
        >
          <slot
            name="leading"
            :model-value="(modelValue as GetModelValue<T, VK, M>)"
            :open="open"
            :pohon="pohon"
          >
            <PIcon
              v-if="isLeading && leadingIconName"
              :name="leadingIconName"
              :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon })"
              data-pohon="select-menu-leading-icon"
            />
            <PAvatar
              v-else-if="!!avatar"
              :size="((props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
              v-bind="avatar"
              :class="pohon.itemLeadingAvatar({ class: props.pohon?.itemLeadingAvatar })"
              data-pohon="select-menu-leading-avatar"
            />
          </slot>
        </span>

        <slot
          :model-value="(modelValue as GetModelValue<T, VK, M>)"
          :open="open"
          :pohon="pohon"
        >
          <template
            v-for="displayedModelValue in [displayValue(modelValue as GetModelValue<T, VK, M>)]"
            :key="displayedModelValue"
          >
            <span
              v-if="isNonNullish(displayedModelValue)"
              :class="pohon.value({ class: props.pohon?.value })"
              data-pohon="select-menu-value"
            >
              {{ displayedModelValue }}
            </span>
            <span
              v-else
              :class="pohon.placeholder({ class: props.pohon?.placeholder })"
              data-pohon="select-menu-placeholder"
            >
              {{ placeholder ?? '&nbsp;' }}
            </span>
          </template>
        </slot>

        <span
          v-if="isTrailing || !!slots.trailing || !!clear"
          :class="pohon.trailing({ class: props.pohon?.trailing })"
          data-pohon="select-menu-trailing"
        >
          <slot
            name="trailing"
            :model-value="(modelValue as GetModelValue<T, VK, M>)"
            :open="open"
            :pohon="pohon"
          >

            <AComboboxCancel
              v-if="!!clear && !isModelValueEmpty(modelValue as GetModelValue<T, VK, M>)"
              as-child
            >
              <PButton
                as="span"
                :icon="clearIcon || appConfig.pohon.icons.close"
                :size="inputSize"
                variant="link"
                color="neutral"
                tabindex="-1"
                v-bind="clearProps"
                data-pohon="select-menu-trailing-clear"
                :class="pohon.trailingClear({ class: props.pohon?.trailingClear })"
                @click.stop="onClear"
              />
            </AComboboxCancel>

            <PIcon
              v-else-if="trailingIconName"
              :name="trailingIconName"
              data-pohon="select-menu-trailing-icon"
              :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
            />
          </slot>
        </span>
      </AComboboxTrigger>
    </AComboboxAnchor>

    <AComboboxPortal v-bind="portalProps">
      <AComboboxContent
        :class="pohon.content({ class: props.pohon?.content })"
        v-bind="contentProps"
        data-pohon="select-menu-content"
      >
        <AFocusScope
          trapped
          :class="pohon.focusScope({ class: props.pohon?.focusScope })"
          data-pohon="select-menu-focus-scope"
        >
          <slot name="content-top" />

          <AComboboxInput
            v-if="!!searchInput"
            v-model="searchTerm"
            :display-value="() => searchTerm"
            as-child
          >
            <PInput
              autofocus
              autocomplete="off"
              :size="inputSize"
              v-bind="searchInputProps"
              :class="pohon.input({ class: props.pohon?.input })"
              data-pohon="select-menu-input"
              @change.stop
            />
          </AComboboxInput>

          <AComboboxEmpty
            :class="pohon.empty({ class: props.pohon?.empty })"
            data-pohon="select-menu-empty"
          >
            <slot
              name="empty"
              :search-term="searchTerm"
            >
              {{ searchTerm ? t('selectMenu.noMatch', { searchTerm }) : t('selectMenu.noData') }}
            </slot>
          </AComboboxEmpty>

          <div
            ref="viewportRef"
            role="presentation"
            :class="pohon.viewport({ class: props.pohon?.viewport })"
            data-pohon="select-menu-viewport"
          >
            <template v-if="!!virtualize">
              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

              <AComboboxVirtualizer
                v-slot="{ option: item, virtualItem }"
                :options="(filteredItems as any[])"
                :text-content="item => isSelectItem(item) ? getProp({ object: item, path: props.labelKey as string }) : String(item)"
                v-bind="virtualizerProps"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="virtualItem.index"
                />
              </AComboboxVirtualizer>

              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
            </template>

            <template v-else>
              <AComboboxGroup
                v-if="createItem && createItemPosition === 'top'"
                :class="pohon.group({ class: props.pohon?.group })"
                data-pohon="select-menu-group"
              >
                <ReuseCreateItemTemplate />
              </AComboboxGroup>

              <AComboboxGroup
                v-for="(group, groupIndex) in filteredGroups"
                :key="`group-${groupIndex}`"
                :class="pohon.group({ class: props.pohon?.group })"
                data-pohon="select-menu-group"
              >
                <ReuseItemTemplate
                  v-for="(item, index) in group"
                  :key="`group-${groupIndex}-${index}`"
                  :item="item"
                  :index="index"
                />
              </AComboboxGroup>

              <AComboboxGroup
                v-if="createItem && createItemPosition === 'bottom'"
                :class="pohon.group({ class: props.pohon?.group })"
                data-pohon="select-menu-group"
              >
                <ReuseCreateItemTemplate />
              </AComboboxGroup>
            </template>
          </div>

          <slot name="content-bottom" />
        </AFocusScope>

        <AComboboxArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="pohon.arrow({ class: props.pohon?.arrow })"
          data-pohon="select-menu-arrow"
        />
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
