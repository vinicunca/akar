<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AComboboxArrowProps,
  AComboboxContentEmits,
  AComboboxContentProps,
  AComboboxRootEmits,
  AComboboxRootProps,
} from 'akar';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PButtonProps, PChipProps, PIconProps, PInputProps, PLinkPropsKeys } from '../types';
import type { InputHTMLAttributes } from '../types/html';
import type { ApplyModifiers, ModelModifiers } from '../types/input';
import type {
  AcceptableValue,
  ArrayOrNested,
  EmitsToProps,
  GetItemKeys,
  GetItemValue,
  GetModelValue,
  NestedItem,
} from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/input-menu';

type InputMenu = ComponentConfig<typeof theme, AppConfig, 'inputMenu'>;

export type PInputMenuValue = AcceptableValue;

export type PInputMenuItem = PInputMenuValue | {
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
  pohon?: Pick<InputMenu['slots'], 'tagsItem' | 'tagsItemText' | 'tagsItemDelete' | 'tagsItemDeleteIcon' | 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChip' | 'itemLeadingChipSize' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

type ExcludeItem = { type: 'label' | 'separator' };
type IsClearUsed<M extends boolean, C extends boolean | object> = M extends false
  ? (C extends true ? null : C extends object ? null : never)
  : never;

export interface PInputMenuProps<T extends ArrayOrNested<PInputMenuItem> = ArrayOrNested<PInputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>, C extends boolean | object = false> extends Pick<AComboboxRootProps<T>, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect' | 'resetModelValueOnClear' | 'highlightOnHover' | 'openOnClick' | 'openOnFocus' | 'by'>, UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'autocomplete' | 'disabled' | 'name' | 'type' | 'placeholder' | 'autofocus' | 'maxlength' | 'minlength' | 'pattern' | 'size' | 'min' | 'max' | 'step'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  id?: string;
  type?: InputHTMLAttributes['type'];
  /** The placeholder text when the input is empty. */
  placeholder?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: InputMenu['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: InputMenu['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: InputMenu['variants']['size'];
  required?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
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
   * The icon displayed to delete a tag.
   * Works only when `multiple` is `true`.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  deleteIcon?: PIconProps['name'];
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
  content?: Omit<AComboboxContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<AComboboxContentEmits>>;
  /**
   * Display an arrow alongside the menu.
   * `{ rounded: true }`{lang="ts-type"}
   * @defaultValue false
   */
  arrow?: boolean | Omit<AComboboxArrowProps, 'as' | 'asChild'>;
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
  /** The value of the InputMenu when initially rendered. Use when you do not need to control the state of the InputMenu. */
  defaultValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
  /** The controlled value of the InputMenu. Can be binded-with with `v-model`. */
  modelValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>;
  modelModifiers?: Mod;
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean;
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /** Keep the mobile text size on all breakpoints. */
  fixed?: boolean;
  /**
   * When `true`, the input accepts free-form text with optional suggestions.
   * The `modelValue` becomes the input text (string) instead of a selected item.
   * @defaultValue false
   */
  autocomplete?: boolean;
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
  class?: any;
  pohon?: InputMenu['slots'];
}

export interface PInputMenuEmits<
  A extends ArrayOrNested<PInputMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  C extends boolean | object = false,
> extends Pick<AComboboxRootEmits, 'update:open'> {
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
  'removeTag': [item: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>];
  /** Event handler called when the value changes. */
  'update:modelValue': [value: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>];
}

type SlotProps<T extends PInputMenuItem> = (props: { item: T; index: number; pohon: InputMenu['pohon'] }) => Array<VNode>;

export interface PInputMenuSlots<
  A extends ArrayOrNested<PInputMenuItem> = ArrayOrNested<PInputMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  C extends boolean | object = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading'?: (props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>; open: boolean; pohon: InputMenu['pohon'] }) => Array<VNode>;
  'trailing'?: (props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>; open: boolean; pohon: InputMenu['pohon'] }) => Array<VNode>;
  'empty'?: (props: { searchTerm: string }) => Array<VNode>;
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; index: number }) => Array<VNode>;
  'item-description'?: (props: { item: T; index: number }) => Array<VNode>;
  'item-trailing'?: SlotProps<T>;
  'tags-item-text'?: (props: { item: T; index: number }) => Array<VNode>;
  'tags-item-delete'?: SlotProps<T>;
  'content-top'?: (props?: {}) => Array<VNode>;
  'content-bottom'?: (props?: {}) => Array<VNode>;
  'create-item-label'?: (props: { item: string }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PInputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>, C extends boolean | object = false">
import { useAppConfig } from '#imports';
import { isBoolean, isNullish, isString } from '@vinicunca/perkakas';
import { createReusableTemplate, reactiveOmit, reactivePick } from '@vueuse/core';
import {
  ATagsInputInput,
  ATagsInputItem,
  ATagsInputItemDelete,
  ATagsInputItemText,
  ATagsInputRoot,
  useForwardPropsEmits,
} from 'akar';
import { AAutocomplete, ACombobox } from 'akar/namespaced';
import { defu } from 'defu';
import { isEqual } from 'ohash/utils';
import { computed, nextTick, onMounted, toRaw, toRef, useTemplateRef, watch } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset, useFieldGroup } from '../composables/use-field-group';
import { useFilter } from '../composables/use-filter';
import { useFormField } from '../composables/use-form-field';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { compare, getDisplayValue, getProp, isArrayOfArray, looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import { getEstimateSize } from '../utils/virtualizer';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PInputMenuProps<T, VK, M, Mod, C>>(),
  {
    type: 'text',
    autofocusDelay: 0,
    portal: true,
    labelKey: 'label',
    descriptionKey: 'description',
    resetSearchTermOnBlur: true,
    resetSearchTermOnSelect: true,
    resetModelValueOnClear: true,
    virtualize: false,
  },
);
const emits = defineEmits<PInputMenuEmits<T, VK, M, Mod, C>>();
const slots = defineSlots<PInputMenuSlots<T, VK, M, Mod, C>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as InputMenu['AppConfig'];
const pohonProp = useComponentPohon('inputMenu', props);

const { filterGroups } = useFilter();

const rootPropsPick = reactivePick(
  props,
  'as',
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
  'openOnClick',
  'openOnFocus',
  'by',
);
const rootProps = useForwardPropsEmits(props.autocomplete ? reactiveOmit(rootPropsPick, 'multiple', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'by') : rootPropsPick, emits);
const Component = computed(() => props.autocomplete ? AAutocomplete : ACombobox);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as AComboboxContentProps);
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as AComboboxArrowProps);
const clearProps = computed(() => typeof props.clear === 'object' ? props.clear : {} as Partial<Omit<PButtonProps, PLinkPropsKeys>>);
const virtualizerProps = toRef(() => {
  if (!props.virtualize) {
    return false;
  }

  return defu(
    isBoolean(props.virtualize) ? {} : props.virtualize,
    {
      estimateSize: getEstimateSize(
        filteredItems.value,
        inputSize.value || 'md',
        props.descriptionKey as string,
        !!slots['item-description'],
      ),
    },
  );
});

const {
  emitFormBlur,
  emitFormFocus,
  emitFormChange,
  emitFormInput,
  size: formFieldSize,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.pohon.icons.chevronDown })));

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: PInputMenuItem; index: number }>({
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

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.inputMenu || {}) })({
  color: color.value,
  variant: props.variant,
  size: inputSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  multiple: props.multiple,
  fieldGroup: orientation.value,
  virtualize: !!props.virtualize,
}));

const items = computed(() => groups.value.flatMap((group) => group) as Array<T>);

function displayValue(value: GetItemValue<T, VK, ExcludeItem>): string {
  return getDisplayValue<Array<T>, GetItemValue<T, VK, ExcludeItem>>(items.value, value, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
    by: props.by,
  }) ?? '';
}

const groups = computed<Array<Array<PInputMenuItem>>>(() =>
  // eslint-disable-next-line no-nested-ternary
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as Array<string>;

  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: (item: PInputMenuItem) => isInputItem(item) && !!item.type && ['label', 'separator'].includes(item.type),
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

const inputRef = useTemplateRef('inputRef');

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
  }
}

onMounted(() => {
  nextTick(() => {
    if (props.autocomplete) {
      searchTerm.value = String(props.modelValue ?? props.defaultValue ?? '');
    } else {
      searchTerm.value = '';
    }
  });

  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

watch(() => props.modelValue, (newValue) => {
  if (props.autocomplete) {
    searchTerm.value = String(newValue ?? '');
  }
});

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

  if (props.autocomplete) {
    searchTerm.value = String(value ?? '');
  } else if (props.resetSearchTermOnSelect) {
    searchTerm.value = '';
  }
}

function onInputUpdate(value: string) {
  if (!props.autocomplete) {
    searchTerm.value = value;
  }
}

function onBlur(event: FocusEvent) {
  emits('blur', event);
  emitFormBlur();
}

function onFocus(event: FocusEvent) {
  emits('focus', event);
  emitFormFocus();
}

function onUpdateOpen(value: boolean) {
  let timeoutId;

  if (!value) {
    const event = new FocusEvent('blur');

    emits('blur', event);
    emitFormBlur();

    // Since we use `displayValue` prop inside ComboboxInput we should reset searchTerm manually
    // https://akar.vinicunca.dev/docs/akar/components/combobox#api-reference
    if (!props.autocomplete && props.resetSearchTermOnBlur) {
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

function onRemoveTag(event: any, modelValue: GetModelValue<T, VK, true, ExcludeItem>) {
  if (props.multiple) {
    const filteredValue = modelValue.filter((value) => !isEqual(value, event));
    emits('update:modelValue', filteredValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>);
    emits('removeTag', event);
    onUpdate(filteredValue);
  }
}

function onCreate(event: Event) {
  event.preventDefault();
  event.stopPropagation();

  emits('create', searchTerm.value);
}

function onSelect(event: Event, item: PInputMenuItem) {
  if (!isInputItem(item)) {
    return;
  }

  if (item.disabled) {
    event.preventDefault();
    return;
  }

  item.onSelect?.(event);
}

function isInputItem(item: PInputMenuItem): item is Exclude<PInputMenuItem, PInputMenuValue> {
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
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
  viewportRef: toRef(() => viewportRef.value),
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineCreateItemTemplate>
    <Component.Item
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
          {{ t('inputMenu.create', { label: searchTerm }) }}
        </slot>
      </span>
    </Component.Item>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <Component.Label
      v-if="isInputItem(item) && item.type === 'label'"
      data-slot="label"
      :class="pohon.label({ class: [pohonProp?.label, item.pohon?.label, item.class] })"
    >
      {{ getProp(item, props.labelKey as string) }}
    </Component.Label>

    <Component.Separator
      v-else-if="isInputItem(item) && item.type === 'separator'"
      data-slot="separator"
      :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator, item.class] })"
    />

    <Component.Item
      v-else
      data-slot="item"
      :class="pohon.item({ class: [pohonProp?.item, isInputItem(item) && item.pohon?.item, isInputItem(item) && item.class] })"
      :disabled="isInputItem(item) && item.disabled"
      :value="props.valueKey && isInputItem(item) ? getProp(item, props.valueKey as string) : item"
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
            v-if="isInputItem(item) && item.icon"
            :name="item.icon"
            data-slot="itemLeadingIcon"
            :class="pohon.itemLeadingIcon({ class: [pohonProp?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
          />
          <PAvatar
            v-else-if="isInputItem(item) && item.avatar"
            :size="((item.pohon?.itemLeadingAvatarSize || pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="item.avatar"
            data-slot="itemLeadingAvatar"
            :class="pohon.itemLeadingAvatar({ class: [pohonProp?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
          />
          <PChip
            v-else-if="isInputItem(item) && item.chip"
            :size="((item.pohon?.itemLeadingChipSize || pohonProp?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="pohon.itemLeadingChip({ class: [pohonProp?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
          />
        </slot>

        <span
          data-slot="itemWrapper"
          :class="pohon.itemWrapper({ class: [pohonProp?.itemWrapper, isInputItem(item) && item.pohon?.itemWrapper] })"
        >
          <span
            data-slot="itemLabel"
            :class="pohon.itemLabel({ class: [pohonProp?.itemLabel, isInputItem(item) && item.pohon?.itemLabel] })"
          >
            <slot
              name="item-label"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ isInputItem(item) ? getProp(item, props.labelKey as string) : item }}
            </slot>
          </span>

          <span
            v-if="isInputItem(item) && (getProp(item, props.descriptionKey as string) || !!slots['item-description'])"
            data-slot="itemDescription"
            :class="pohon.itemDescription({ class: [pohonProp?.itemDescription, isInputItem(item) && item.pohon?.itemDescription] })"
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
          :class="pohon.itemTrailing({ class: [pohonProp?.itemTrailing, isInputItem(item) && item.pohon?.itemTrailing] })"
        >
          <slot
            name="item-trailing"
            :item="(item as NestedItem<T>)"
            :index="index"
            :pohon="pohon"
          />

          <Component.ItemIndicator
            v-if="!autocomplete"
            as-child
          >
            <PIcon
              :name="selectedIcon || appConfig.pohon.icons.check"
              data-slot="itemTrailingIcon"
              :class="pohon.itemTrailingIcon({ class: [pohonProp?.itemTrailingIcon, isInputItem(item) && item.pohon?.itemTrailingIcon] })"
            />
          </Component.ItemIndicator>
        </span>
      </slot>
    </Component.Item>
  </DefineItemTemplate>

  <Component.Root
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    :as-child="!!multiple && !autocomplete"
    ignore-filter
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <Component.Anchor
      :as-child="!multiple"
      data-slot="base"
      :class="pohon.base({ class: pohonProp?.base })"
    >
      <ATagsInputRoot
        v-if="multiple && !autocomplete"
        v-slot="{ modelValue: tags }"
        :model-value="(modelValue as string[])"
        :disabled="disabled"
        :required="required"
        delimiter=""
        as-child
        @blur="onBlur"
        @focus="onFocus"
        @remove-tag="onRemoveTag($event, modelValue as GetModelValue<T, VK, true, ExcludeItem>)"
      >
        <ATagsInputItem
          v-for="(item, index) in tags"
          :key="index"
          :value="item"
          data-slot="tagsItem"
          :class="pohon.tagsItem({ class: [pohonProp?.tagsItem, isInputItem(item) && item.pohon?.tagsItem] })"
        >
          <ATagsInputItemText
            data-slot="tagsItemText"
            :class="pohon.tagsItemText({ class: [pohonProp?.tagsItemText, isInputItem(item) && item.pohon?.tagsItemText] })"
          >
            <slot
              name="tags-item-text"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ displayValue(item as GetItemValue<T, VK, ExcludeItem>) }}
            </slot>
          </ATagsInputItemText>

          <ATagsInputItemDelete
            data-slot="tagsItemDelete"
            :class="pohon.tagsItemDelete({ class: [pohonProp?.tagsItemDelete, isInputItem(item) && item.pohon?.tagsItemDelete] })"
            :disabled="disabled"
          >
            <slot
              name="tags-item-delete"
              :item="(item as NestedItem<T>)"
              :index="index"
              :pohon="pohon"
            >
              <PIcon
                :name="deleteIcon || appConfig.pohon.icons.close"
                data-slot="tagsItemDeleteIcon"
                :class="pohon.tagsItemDeleteIcon({ class: [pohonProp?.tagsItemDeleteIcon, isInputItem(item) && item.pohon?.tagsItemDeleteIcon] })"
              />
            </slot>
          </ATagsInputItemDelete>
        </ATagsInputItem>

        <Component.Input
          v-model="searchTerm"
          as-child
        >
          <ATagsInputInput
            :id="id"
            ref="inputRef"
            v-bind="{ ...$attrs, ...ariaAttrs }"
            :placeholder="placeholder"
            data-slot="tagsInput"
            :class="pohon.tagsInput({ class: pohonProp?.tagsInput })"
            @change.stop
          />
        </Component.Input>
      </ATagsInputRoot>

      <Component.Input
        v-else
        :id="id"
        ref="inputRef"
        v-bind="{ ...(!autocomplete ? { displayValue } : {}), ...$attrs, ...ariaAttrs }"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        @blur="onBlur"
        @focus="onFocus"
        @change.stop
        @update:model-value="onInputUpdate"
      />

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
            :size="((pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="avatar"
            data-slot="itemLeadingAvatar"
            :class="pohon.itemLeadingAvatar({ class: pohonProp?.itemLeadingAvatar })"
          />
        </slot>
      </span>

      <Component.Trigger
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
          <Component.Cancel
            v-if="!!clear && !isModelValueEmpty(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
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
              data-slot="trailingClear"
              :class="pohon.trailingClear({ class: pohonProp?.trailingClear })"
              @click.stop="onClear"
            />
          </Component.Cancel>

          <PIcon
            v-else-if="trailingIconName"
            :name="trailingIconName"
            data-slot="trailingIcon"
            :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
          />
        </slot>
      </Component.Trigger>
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <FieldGroupReset>
        <Component.Content
          data-slot="content"
          :class="pohon.content({ class: pohonProp?.content })"
          v-bind="contentProps"
          @focus-outside.prevent
        >
          <slot name="content-top" />

          <Component.Empty
            data-slot="empty"
            :class="pohon.empty({ class: pohonProp?.empty })"
          >
            <slot
              name="empty"
              :search-term="searchTerm"
            >
              {{ searchTerm ? t('inputMenu.noMatch', { searchTerm }) : t('inputMenu.noData') }}
            </slot>
          </Component.Empty>

          <div
            ref="viewportRef"
            role="presentation"
            data-slot="viewport"
            :class="pohon.viewport({ class: pohonProp?.viewport })"
          >
            <template v-if="!!virtualize">
              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

              <Component.Virtualizer
                v-slot="{ option: item, virtualItem }"
                :options="(filteredItems as any[])"
                :text-content="item => isInputItem(item) ? getProp(item, props.labelKey as string) : String(item)"
                v-bind="virtualizerProps"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="virtualItem.index"
                />
              </Component.Virtualizer>

              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
            </template>

            <template v-else>
              <Component.Group
                v-if="createItem && createItemPosition === 'top'"
                data-slot="group"
                :class="pohon.group({ class: pohonProp?.group })"
              >
                <ReuseCreateItemTemplate />
              </Component.Group>

              <Component.Group
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
              </Component.Group>

              <Component.Group
                v-if="createItem && createItemPosition === 'bottom'"
                data-slot="group"
                :class="pohon.group({ class: pohonProp?.group })"
              >
                <ReuseCreateItemTemplate />
              </Component.Group>
            </template>
          </div>

          <slot name="content-bottom" />

          <Component.Arrow
            v-if="!!arrow"
            v-bind="arrowProps"
            data-slot="arrow"
            :class="pohon.arrow({ class: pohonProp?.arrow })"
          />
        </Component.Content>
      </FieldGroupReset>
    </Component.Portal>
  </Component.Root>
</template>
