<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SelectArrowProps, SelectContentEmits, SelectContentProps, SelectRootEmits, SelectRootProps } from 'akar';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { IconProps, InputProps, PAvatarProps, PChipProps } from '../types';
import type { AcceptableValue, ArrayOrNested, EmitsToProps, GetItemKeys, GetItemValue, GetModelValue, GetModelValueEmits, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/select';

type Select = ComponentConfig<typeof theme, AppConfig, 'select'>;

export type SelectValue = AcceptableValue;
export type SelectItem = SelectValue | {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  avatar?: PAvatarProps;
  chip?: PChipProps;
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item';
  value?: SelectValue;
  disabled?: boolean;
  onSelect?: (event?: Event) => void;
  class?: any;
  pohon?: Pick<Select['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemLabel' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

export interface SelectProps<T extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false> extends Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, UseComponentIconsProps {
  id?: string;
  /** The placeholder text when the select is empty. */
  placeholder?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: Select['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: Select['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Select['variants']['size'];
  /**
   * The icon displayed to open the menu.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
  /**
   * The icon displayed when an item is selected.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  selectedIcon?: IconProps['name'];
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<SelectContentEmits>>;
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean | Omit<SelectArrowProps, 'as' | 'asChild'>;
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @defaultValue 'value'
   */
  valueKey?: VK;
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  items?: T;
  /** The value of the Select when initially rendered. Use when you do not need to control the state of the Select. */
  defaultValue?: GetModelValue<T, VK, M>;
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, M>;
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean;
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  class?: any;
  pohon?: Select['slots'];
}

export type SelectEmits<A extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Omit<SelectRootEmits, 'update:modelValue'> & {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
} & GetModelValueEmits<A, VK, M>;

type SlotProps<T extends SelectItem> = (props: { item: T; index: number }) => any;

export interface SelectSlots<
  A extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading': (props: {
    modelValue?: GetModelValue<A, VK, M>;
    open: boolean;
    pohon: { [K in keyof Required<Select['slots']>]: (props?: Record<string, any>) => string };
  }) => any;
  'default': (props: {
    modelValue?: GetModelValue<A, VK, M>;
    open: boolean;
  }) => any;
  'trailing': (props: {
    modelValue?: GetModelValue<A, VK, M>;
    open: boolean;
    pohon: { [K in keyof Required<Select['slots']>]: (props?: Record<string, any>) => string };
  }) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': SlotProps<T>;
  'item-trailing': SlotProps<T>;
  'content-top': (props?: object) => any;
  'content-bottom': (props?: object) => any;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false">
import { useAppConfig } from '#imports';
import { isNonNullish } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { SelectItem as RSelectItem, SelectArrow, SelectContent, SelectGroup, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectSeparator, SelectTrigger, useForwardPropsEmits } from 'akar';
import { defu } from 'defu';
import { computed, onMounted, ref, toRef } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFormField } from '../composables/use-form-field';
import { useFieldGroup } from '../composables/useFieldGroup';
import { usePortal } from '../composables/usePortal';
import { get, getDisplayValue, isArrayOfArray } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PChip from './Chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SelectProps<T, VK, M>>(), {
  valueKey: 'value' as never,
  labelKey: 'label',
  portal: true,
  autofocusDelay: 0,
});
const emits = defineEmits<SelectEmits<T, VK, M>>();
const slots = defineSlots<SelectSlots<T, VK, M>>();

const appConfig = useAppConfig() as Select['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps);
const arrowProps = toRef(() => props.arrow as SelectArrowProps);

const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<InputProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.pohon.icons.chevronDown })));

const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.select || {}) })({
  color: color.value,
  variant: props.variant,
  size: selectSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
}));

const groups = computed<Array<Array<SelectItem>>>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

const items = computed(() => groups.value.flatMap((group) => group) as Array<T>);

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

const triggerRef = ref<InstanceType<typeof SelectTrigger> | null>(null);

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
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);

  emitFormChange();
  emitFormInput();
}
function onUpdateOpen(value: boolean) {
  if (!value) {
    const event = new FocusEvent('blur');
    emits('blur', event);
    emitFormBlur();
  } else {
    const event = new FocusEvent('focus');
    emits('focus', event);
    emitFormFocus();
  }
}

function isSelectItem(item: SelectItem): item is Exclude<SelectItem, SelectValue> {
  return typeof item === 'object' && item !== null;
}

defineExpose({
  triggerRef,
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <SelectRoot
    v-slot="{ modelValue, open }"
    :name="name"
    v-bind="rootProps"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :default-value="(defaultValue as Exclude<SelectItem, boolean> | Exclude<SelectItem, boolean>[])"
    :model-value="(modelValue as Exclude<SelectItem, boolean> | Exclude<SelectItem, boolean>[])"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <SelectTrigger
      :id="id"
      ref="triggerRef"
      :class="pohon.base({ class: [props.pohon?.base, props.class] })"
      v-bind="{ ...$attrs, ...ariaAttrs }"
    >
      <span
        v-if="isLeading || !!avatar || !!slots.leading"
        :class="pohon.leading({ class: props.pohon?.leading })"
      >
        <slot
          name="leading"
          :model-value="(modelValue as GetModelValue<T, VK, M>)"
          :open="open"
          :ui="ui"
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

      <slot
        :model-value="(modelValue as GetModelValue<T, VK, M>)"
        :open="open"
      >
        <template
          v-for="displayedModelValue in [displayValue(modelValue as GetModelValue<T, VK, M>)]"
          :key="displayedModelValue"
        >
          <span
            v-if="isNonNullish(displayedModelValue)"
            :class="pohon.value({ class: props.pohon?.value })"
          >
            {{ displayedModelValue }}
          </span>
          <span
            v-else
            :class="pohon.placeholder({ class: props.pohon?.placeholder })"
          >
            {{ placeholder ?? '&nbsp;' }}
          </span>
        </template>
      </slot>

      <span
        v-if="isTrailing || !!slots.trailing"
        :class="pohon.trailing({ class: props.pohon?.trailing })"
      >
        <slot
          name="trailing"
          :model-value="(modelValue as GetModelValue<T, VK, M>)"
          :open="open"
          :ui="ui"
        >
          <PIcon
            v-if="trailingIconName"
            :name="trailingIconName"
            :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon })"
          />
        </slot>
      </span>
    </SelectTrigger>

    <SelectPortal v-bind="portalProps">
      <SelectContent
        :class="pohon.content({ class: props.pohon?.content })"
        v-bind="contentProps"
      >
        <slot name="content-top" />

        <div
          role="presentation"
          :class="pohon.viewport({ class: props.pohon?.viewport })"
        >
          <SelectGroup
            v-for="(group, groupIndex) in groups"
            :key="`group-${groupIndex}`"
            :class="pohon.group({ class: props.pohon?.group })"
          >
            <template
              v-for="(item, index) in group"
              :key="`group-${groupIndex}-${index}`"
            >
              <SelectLabel
                v-if="isSelectItem(item) && item.type === 'label'"
                :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label, item.class] })"
              >
                {{ get(item, props.labelKey as string) }}
              </SelectLabel>

              <SelectSeparator
                v-else-if="isSelectItem(item) && item.type === 'separator'"
                :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator, item.class] })"
              />

              <RSelectItem
                v-else
                :class="pohon.item({ class: [props.pohon?.item, isSelectItem(item) && item.pohon?.item, isSelectItem(item) && item.class] })"
                :disabled="isSelectItem(item) && item.disabled"
                :value="isSelectItem(item) ? get(item, props.valueKey as string) : item"
                @select="isSelectItem(item) && item.onSelect?.($event)"
              >
                <slot
                  name="item"
                  :item="(item as NestedItem<T>)"
                  :index="index"
                >
                  <slot
                    name="item-leading"
                    :item="(item as NestedItem<T>)"
                    :index="index"
                  >
                    <PIcon
                      v-if="isSelectItem(item) && item.icon"
                      :name="item.icon"
                      :class="pohon.itemLeadingIcon({ class: [props.pohon?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
                    />
                    <PAvatar
                      v-else-if="isSelectItem(item) && item.avatar"
                      :size="((item.pohon?.itemLeadingAvatarSize || props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
                      v-bind="item.avatar"
                      :class="pohon.itemLeadingAvatar({ class: [props.pohon?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
                    />
                    <PChip
                      v-else-if="isSelectItem(item) && item.chip"
                      :size="((item.pohon?.itemLeadingChipSize || props.pohon?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
                      inset
                      standalone
                      v-bind="item.chip"
                      :class="pohon.itemLeadingChip({ class: [props.pohon?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
                    />
                  </slot>

                  <SelectItemText :class="pohon.itemLabel({ class: [props.pohon?.itemLabel, isSelectItem(item) && item.pohon?.itemLabel] })">
                    <slot
                      name="item-label"
                      :item="(item as NestedItem<T>)"
                      :index="index"
                    >
                      {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
                    </slot>
                  </SelectItemText>

                  <span :class="pohon.itemTrailing({ class: [props.pohon?.itemTrailing, isSelectItem(item) && item.pohon?.itemTrailing] })">
                    <slot
                      name="item-trailing"
                      :item="(item as NestedItem<T>)"
                      :index="index"
                    />

                    <SelectItemIndicator as-child>
                      <PIcon
                        :name="selectedIcon || appConfig.pohon.icons.check"
                        :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, isSelectItem(item) && item.pohon?.itemTrailingIcon] })"
                      />
                    </SelectItemIndicator>
                  </span>
                </slot>
              </RSelectItem>
            </template>
          </SelectGroup>
        </div>

        <slot name="content-bottom" />

        <SelectArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="pohon.arrow({ class: props.pohon?.arrow })"
        />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
