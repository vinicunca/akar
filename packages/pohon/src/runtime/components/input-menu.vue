<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AComboboxArrowProps,
  AComboboxContentEmits,
  AComboboxContentProps,
  AComboboxRootEmits,
  AComboboxRootProps,
} from 'akar';
import type { InputHTMLAttributes } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PChipProps, PIconProps, PInputProps } from '../types';
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
  onSelect?: (event?: Event) => void;
  class?: any;
  pohon?: Pick<InputMenu['slots'], 'tagsItem' | 'tagsItemText' | 'tagsItemDelete' | 'tagsItemDeleteIcon' | 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChip' | 'itemLeadingChipSize' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

export interface PInputMenuProps<T extends ArrayOrNested<PInputMenuItem> = ArrayOrNested<PInputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false> extends Pick<AComboboxRootProps<T>, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect' | 'highlightOnHover' | 'openOnClick' | 'openOnFocus'>, UseComponentIconsProps {
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
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<AComboboxContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<AComboboxContentEmits>>;
  /**
   * Display an arrow alongside the menu.
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
  defaultValue?: GetModelValue<T, VK, M>;
  /** The controlled value of the InputMenu. Can be binded-with with `v-model`. */
  modelValue?: GetModelValue<T, VK, M>;
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
  class?: any;
  pohon?: InputMenu['slots'];
}

export type PInputMenuEmits<A extends ArrayOrNested<PInputMenuItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Pick<AComboboxRootEmits, 'update:open'> & {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  create: [item: string];
  /** Event handler when highlighted element changes. */
  highlight: [payload: {
    ref: HTMLElement;
    value: GetModelValue<A, VK, M>;
  } | undefined];
  removeTag: [item: GetModelValue<A, VK, M>];
} & GetModelValueEmits<A, VK, M>;

type SlotProps<T extends PInputMenuItem> = (props: { item: T; index: number; pohon: InputMenu['pohon'] }) => any;

export interface PInputMenuSlots<
  A extends ArrayOrNested<PInputMenuItem> = ArrayOrNested<PInputMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: InputMenu['pohon'] }) => any;
  'trailing': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: InputMenu['pohon'] }) => any;
  'empty': (props: { searchTerm?: string }) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; index: number }) => any;
  'item-description': (props: { item: T; index: number }) => any;
  'item-trailing': SlotProps<T>;
  'tags-item-text': (props: { item: T; index: number }) => any;
  'tags-item-delete': SlotProps<T>;
  'content-top': (props?: object) => any;
  'content-bottom': (props?: object) => any;
  'create-item-label': (props: { item: string }) => any;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PInputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false">
import { useAppConfig } from '#imports';
import { isBoolean, isNonNullish, isNullish } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
import {
  AComboboxAnchor,
  AComboboxArrow,
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
  ATagsInputInput,
  ATagsInputItem,
  ATagsInputItemDelete,
  ATagsInputItemText,
  ATagsInputRoot,
  useFilter,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { isEqual } from 'ohash/utils';
import { computed, nextTick, onMounted, ref, toRaw, toRef } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { compare, getDisplayValue, getProp, isArrayOfArray } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PInputMenuProps<T, VK, M>>(),
  {
    type: 'text',
    autofocusDelay: 0,
    portal: true,
    labelKey: 'label',
    descriptionKey: 'description',
    resetSearchTermOnBlur: true,
    resetSearchTermOnSelect: true,
    virtualize: false,
  },
);
const emits = defineEmits<PInputMenuEmits<T, VK, M>>();
const slots = defineSlots<PInputMenuSlots<T, VK, M>>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const appConfig = useAppConfig() as InputMenu['AppConfig'];
const { contains } = useFilter({ sensitivity: 'base' });

const rootProps = useForwardPropsEmits(
  reactivePick(
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
    'highlightOnHover',
    'openOnClick',
    'openOnFocus',
  ),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as AComboboxContentProps);
const arrowProps = toRef(() => props.arrow as AComboboxArrowProps);
const virtualizerProps = toRef(() =>
  !!props.virtualize && defu(
    isBoolean(props.virtualize) ? {} : props.virtualize,
    {
      estimateSize: ({
        xs: 24,
        sm: 28,
        md: 32,
        lg: 36,
        xl: 40,
      })[props.size || 'md'],
    },
  ));

const {
  emitFormBlur,
  emitFormFocus,
  emitFormChange,
  emitFormInput,
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

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{
  item: PInputMenuItem;
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
    ...(appConfig.pohon?.inputMenu || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: inputSize?.value,
    loading: props.loading,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    multiple: props.multiple,
    fieldGroup: orientation.value,
    virtualize: !!props.virtualize,
  }),
);

const items = computed(() => groups.value.flatMap((group) => group) as Array<T>);

function displayValue(value: GetItemValue<T, VK>): string {
  return getDisplayValue<Array<T>, GetItemValue<T, VK>>({
    items: items.value,
    value,
    options: {
      labelKey: props.labelKey,
      valueKey: props.valueKey,
    },
  }) ?? '';
}

const groups = computed<Array<Array<PInputMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as Array<string>;

  return groups.value.map((items) => items.filter((item) => {
    if (isNullish(item)) {
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
    !isInputItem(item) || (!item.type || !['label', 'separator'].includes(item.type)),
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

const inputRef = ref<InstanceType<typeof AComboboxInput> | null>(null);

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
  }
}

onMounted(() => {
  nextTick(() => {
    searchTerm.value = '';
  });

  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

function onUpdate(value: any) {
  if (toRaw(props.modelValue) === value) {
    return;
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
    // https://akar.com/docs/components/combobox#api-reference
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

function onRemoveTag(event: any, modelValue: GetModelValue<T, VK, true>) {
  if (props.multiple) {
    const modelValue = props.modelValue as GetModelValue<T, VK, true>;
    const filteredValue = modelValue.filter((value) => !isEqual(value, event));
    emits('update:modelValue', filteredValue as GetModelValue<T, VK, M>);
    emits('removeTag', event);
    onUpdate(filteredValue);
  }
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

defineExpose({
  inputRef,
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineCreateItemTemplate>
    <AComboboxItem
      :class="pohon.item({ class: props.pohon?.item })"
      :value="searchTerm"
      @select.prevent="emits('create', searchTerm)"
    >
      <span :class="pohon.itemLabel({ class: props.pohon?.itemLabel })">
        <slot
          name="create-item-label"
          :item="searchTerm"
        >
          {{ t('inputMenu.create', { label: searchTerm }) }}
        </slot>
      </span>
    </AComboboxItem>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <AComboboxLabel
      v-if="isInputItem(item) && item.type === 'label'"
      :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label, item.class] })"
    >
      {{ getProp({ object: item, path: props.labelKey as string }) }}
    </AComboboxLabel>

    <AComboboxSeparator
      v-else-if="isInputItem(item) && item.type === 'separator'"
      :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator, item.class] })"
    />

    <AComboboxItem
      v-else
      :class="pohon.item({ class: [props.pohon?.item, isInputItem(item) && item.pohon?.item, isInputItem(item) && item.class] })"
      :disabled="isInputItem(item) && item.disabled"
      :value="props.valueKey && isInputItem(item) ? getProp({ object: item, path: props.valueKey as string }) : item"
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
            :class="pohon.itemLeadingIcon({ class: [props.pohon?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
          />

          <PAvatar
            v-else-if="isInputItem(item) && item.avatar"
            :size="((item.pohon?.itemLeadingAvatarSize || props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="item.avatar"
            :class="pohon.itemLeadingAvatar({ class: [props.pohon?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
          />
          <PChip
            v-else-if="isInputItem(item) && item.chip"
            :size="((item.pohon?.itemLeadingChipSize || props.pohon?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
            inset
            standalone
            v-bind="item.chip"
            :class="pohon.itemLeadingChip({ class: [props.pohon?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
          />
        </slot>

        <span
          :class="pohon.itemWrapper({
            class: [
              props.pohon?.itemWrapper, isInputItem(item) && item.pohon?.itemWrapper],
          })"
        >
          <span
            :class="pohon.itemLabel({
              class: [
                props.pohon?.itemLabel, isInputItem(item) && item.pohon?.itemLabel],
            })"
          >
            <slot
              name="item-label"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ isInputItem(item) ? getProp({ object: item, path: props.labelKey as string }) : item }}
            </slot>
          </span>

          <span
            v-if="isInputItem(item) && (getProp({ object: item, path: props.descriptionKey as string }) || !!slots['item-description'])"
            :class="pohon.itemDescription({ class: [props.pohon?.itemDescription, isInputItem(item) && item.pohon?.itemDescription] })"
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

        <span :class="pohon.itemTrailing({ class: [props.pohon?.itemTrailing, isInputItem(item) && item.pohon?.itemTrailing] })">
          <slot
            name="item-trailing"
            :item="(item as NestedItem<T>)"
            :index="index"
            :pohon="pohon"
          />

          <AComboboxItemIndicator as-child>
            <PIcon
              :name="selectedIcon || appConfig.pohon.icons.check"
              :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, isInputItem(item) && item.pohon?.itemTrailingIcon] })"
            />
          </AComboboxItemIndicator>
        </span>
      </slot>
    </AComboboxItem>
  </DefineItemTemplate>

  <AComboboxRoot
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :as-child="!!multiple"
    ignore-filter
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
    @keydown.enter="$event.preventDefault()"
  >
    <AComboboxAnchor
      :as-child="!multiple"
      :class="pohon.base({ class: props.pohon?.base })"
    >
      <ATagsInputRoot
        v-if="multiple"
        v-slot="{ modelValue: tags }"
        :model-value="(modelValue as string[])"
        :disabled="disabled"
        :required="required"
        delimiter=""
        as-child
        @blur="onBlur"
        @focus="onFocus"
        @remove-tag="onRemoveTag($event, modelValue as GetModelValue<T, VK, true>)"
      >
        <ATagsInputItem
          v-for="(item, index) in tags"
          :key="index"
          :value="item"
          :class="pohon.tagsItem({ class: [props.pohon?.tagsItem, isInputItem(item) && item.pohon?.tagsItem] })"
        >
          <ATagsInputItemText
            :class="pohon.tagsItemText({
              class: [props.pohon?.tagsItemText, isInputItem(item) && item.pohon?.tagsItemText],
            })"
          >
            <slot
              name="tags-item-text"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ displayValue(item as GetItemValue<T, VK>) }}
            </slot>
          </ATagsInputItemText>

          <ATagsInputItemDelete
            :class="pohon.tagsItemDelete({
              class: [props.pohon?.tagsItemDelete, isInputItem(item) && item.pohon?.tagsItemDelete],
            })"
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
                :class="pohon.tagsItemDeleteIcon({
                  class: [props.pohon?.tagsItemDeleteIcon, isInputItem(item) && item.pohon?.tagsItemDeleteIcon],
                })"
              />
            </slot>
          </ATagsInputItemDelete>
        </ATagsInputItem>

        <AComboboxInput
          v-model="searchTerm"
          as-child
        >
          <ATagsInputInput
            :id="id"
            ref="inputRef"
            v-bind="{ ...$attrs, ...ariaAttrs }"
            :placeholder="placeholder"
            :class="pohon.tagsInput({ class: props.pohon?.tagsInput })"
            @keydown.enter.prevent
          />
        </AComboboxInput>
      </ATagsInputRoot>

      <AComboboxInput
        v-else
        :id="id"
        ref="inputRef"
        :display-value="displayValue"
        v-bind="{ ...$attrs, ...ariaAttrs }"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        @blur="onBlur"
        @focus="onFocus"
        @update:model-value="searchTerm = $event"
      />

      <span
        v-if="isLeading || !!avatar || !!slots.leading"
        :class="pohon.leading({ class: props.pohon?.leading })"
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
          />
          <PAvatar
            v-else-if="!!avatar"
            :size="((props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="avatar"
            :class="pohon.itemLeadingAvatar({ class: props.pohon?.itemLeadingAvatar })"
          />
        </slot>
      </span>

      <AComboboxTrigger
        v-if="isTrailing || !!slots.trailing"
        :class="pohon.trailing({ class: props.pohon?.trailing })"
      >
        <slot
          name="trailing"
          :model-value="(modelValue as GetModelValue<T, VK, M>)"
          :open="open"
          :pohon="pohon"
        >
          <PIcon
            v-if="trailingIconName"
            :name="trailingIconName"
            :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
          />
        </slot>
      </AComboboxTrigger>
    </AComboboxAnchor>

    <AComboboxPortal v-bind="portalProps">
      <AComboboxContent
        :class="pohon.content({ class: props.pohon?.content })"
        v-bind="contentProps"
        @focus-outside.prevent
      >
        <slot name="content-top" />

        <AComboboxEmpty :class="pohon.empty({ class: props.pohon?.empty })">
          <slot
            name="empty"
            :search-term="searchTerm"
          >
            {{ searchTerm ? t('inputMenu.noMatch', { searchTerm }) : t('inputMenu.noData') }}
          </slot>
        </AComboboxEmpty>

        <div
          role="presentation"
          :class="pohon.viewport({ class: props.pohon?.viewport })"
        >
          <template v-if="!!virtualize">
            <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

            <AComboboxVirtualizer
              v-slot="{ option: item, virtualItem }"
              :options="(filteredItems as any[])"
              :text-content="item => isInputItem(item) ? getProp({ object: item, path: props.labelKey as string }) : String(item)"
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
            >
              <ReuseCreateItemTemplate />
            </AComboboxGroup>

            <AComboboxGroup
              v-for="(group, groupIndex) in filteredGroups"
              :key="`group-${groupIndex}`"
              :class="pohon.group({ class: props.pohon?.group })"
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
            >
              <ReuseCreateItemTemplate />
            </AComboboxGroup>
          </template>
        </div>

        <slot name="content-bottom" />

        <AComboboxArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="pohon.arrow({ class: props.pohon?.arrow })"
        />
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>
</template>
