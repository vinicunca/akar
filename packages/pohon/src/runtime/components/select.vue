<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ASelectArrowProps,
  ASelectContentEmits,
  ASelectContentProps,
  ASelectRootEmits,
  ASelectRootProps,
} from 'akar';
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
import theme from '#build/pohon/select';

type Select = ComponentConfig<typeof theme, AppConfig, 'select'>;

export type PSelectValue = AcceptableValue;
export type PSelectItem = PSelectValue | {
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
  value?: PSelectValue;
  disabled?: boolean;
  onSelect?: (event?: Event) => void;
  class?: any;
  pohon?: Pick<Select['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

export interface PSelectProps<T extends ArrayOrNested<PSelectItem> = ArrayOrNested<PSelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false> extends Omit<ASelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, UseComponentIconsProps {
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
  trailingIcon?: PIconProps['name'];
  /**
   * The icon displayed when an item is selected.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  selectedIcon?: PIconProps['name'];
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<ASelectContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ASelectContentEmits>>;
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean | Omit<ASelectArrowProps, 'as' | 'asChild'>;
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
  /**
   * When `items` is an array of objects, select the field to use as the description.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>;
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

export type PSelectEmits<A extends ArrayOrNested<PSelectItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Omit<ASelectRootEmits, 'update:modelValue'> & {
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
} & GetModelValueEmits<A, VK, M>;

type SlotProps<T extends PSelectItem> = (props: { item: T; index: number; pohon: Select['pohon'] }) => any;

export interface PSelectSlots<
  A extends ArrayOrNested<PSelectItem> = ArrayOrNested<PSelectItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: Select['pohon'] }) => any;
  'default': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: Select['pohon'] }) => any;
  'trailing': (props: { modelValue?: GetModelValue<A, VK, M>; open: boolean; pohon: Select['pohon'] }) => any;
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': (props: { item: T; index: number }) => any;
  'item-description': (props: { item: T; index: number }) => any;
  'item-trailing': SlotProps<T>;
  'content-top': (props?: object) => any;
  'content-bottom': (props?: object) => any;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PSelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false">
import { useAppConfig } from '#imports';
import { isNonNullish } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ASelectArrow,
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectItemText,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectSeparator,
  ASelectTrigger,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, onMounted, ref, toRef } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { usePortal } from '../composables/use-portal';
import { getDisplayValue, getProp, isArrayOfArray } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PSelectProps<T, VK, M>>(),
  {
    valueKey: 'value' as never,
    labelKey: 'label',
    descriptionKey: 'description',
    portal: true,
    autofocusDelay: 0,
  },
);
const emits = defineEmits<PSelectEmits<T, VK, M>>();
const slots = defineSlots<PSelectSlots<T, VK, M>>();
const appConfig = useAppConfig() as Select['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'open',
    'defaultOpen',
    'disabled',
    'autocomplete',
    'required',
    'multiple',
  ),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() =>
  defu(
    props.content,
    {
      side: 'bottom',
      sideOffset: 8,
      collisionPadding: 8,
      position: 'popper',
    },
  ) as ASelectContentProps,
);
const arrowProps = toRef(() => props.arrow as ASelectArrowProps);

const {
  emitFormChange,
  emitFormInput,
  emitFormBlur,
  emitFormFocus,
  size: formGroupSize,
  color,
  id,
  name,
  highlight,
  disabled,
  ariaAttrs,
} = useFormField<PInputProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputProps>(props);
const {
  isLeading,
  isTrailing,
  leadingIconName,
  trailingIconName,
} = useComponentIcons(
  toRef(() => defu(props, { trailingIcon: appConfig.pohon.icons.chevronDown })),
);

const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.select || {}),
  })({
    color: color.value,
    variant: props.variant,
    size: selectSize?.value,
    loading: props.loading,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    fieldGroup: orientation.value,
  }),
);

const groups = computed<Array<Array<PSelectItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

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

const triggerRef = ref<InstanceType<typeof ASelectTrigger> | null>(null);

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

function isSelectItem(item: PSelectItem): item is Exclude<PSelectItem, PSelectValue> {
  return typeof item === 'object' && item !== null;
}

defineExpose({
  triggerRef,
});
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ASelectRoot
    v-slot="{ modelValue, open }"
    :name="name"
    v-bind="rootProps"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :default-value="(defaultValue as Exclude<PSelectItem, boolean> | Exclude<PSelectItem, boolean>[])"
    :model-value="(modelValue as Exclude<PSelectItem, boolean> | Exclude<PSelectItem, boolean>[])"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <ASelectTrigger
      :id="id"
      ref="triggerRef"
      :class="pohon.base({ class: [props.pohon?.base, props.class] })"
      data-pohon="select-base"
      v-bind="{ ...$attrs, ...ariaAttrs }"
    >
      <span
        v-if="isLeading || !!avatar || !!slots.leading"
        :class="pohon.leading({ class: props.pohon?.leading })"
        data-pohon="select-leading"
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
            data-pohon="select-leading-icon"
          />
          <PAvatar
            v-else-if="!!avatar"
            :size="((props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="avatar"
            :class="pohon.itemLeadingAvatar({ class: props.pohon?.itemLeadingAvatar })"
            data-pohon="select-leading-avatar"
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
            data-pohon="select-value"
          >
            {{ displayedModelValue }}
          </span>
          <span
            v-else
            :class="pohon.placeholder({ class: props.pohon?.placeholder })"
            data-pohon="select-placeholder"
          >
            {{ placeholder ?? '&nbsp;' }}
          </span>
        </template>
      </slot>

      <span
        v-if="isTrailing || !!slots.trailing"
        :class="pohon.trailing({ class: props.pohon?.trailing })"
        data-pohon="select-trailing"
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
            data-pohon="select-trailing-icon"
          />
        </slot>
      </span>
    </ASelectTrigger>

    <ASelectPortal v-bind="portalProps">
      <ASelectContent
        :class="pohon.content({ class: props.pohon?.content })"
        v-bind="contentProps"
        data-pohon="select-content"
      >
        <slot name="content-top" />

        <div
          role="presentation"
          :class="pohon.viewport({ class: props.pohon?.viewport })"
          data-pohon="select-viewport"
        >
          <ASelectGroup
            v-for="(group, groupIndex) in groups"
            :key="`group-${groupIndex}`"
            :class="pohon.group({ class: props.pohon?.group })"
            data-pohon="select-group"
          >
            <template
              v-for="(item, index) in group"
              :key="`group-${groupIndex}-${index}`"
            >
              <ASelectLabel
                v-if="isSelectItem(item) && item.type === 'label'"
                :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label, item.class] })"
                data-pohon="select-label"
              >
                {{ getProp({ object: item, path: props.labelKey as string }) }}
              </ASelectLabel>

              <ASelectSeparator
                v-else-if="isSelectItem(item) && item.type === 'separator'"
                :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator, item.class] })"
                data-pohon="select-separator"
              />

              <ASelectItem
                v-else
                :class="pohon.item({ class: [props.pohon?.item, isSelectItem(item) && item.pohon?.item, isSelectItem(item) && item.class] })"
                :disabled="isSelectItem(item) && item.disabled"
                :value="isSelectItem(item) ? getProp({ object: item, path: props.valueKey as string }) : item"
                data-pohon="select-item"
                @select="isSelectItem(item) && item.onSelect?.($event)"
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
                      data-pohon="select-item-leading-icon"
                    />
                    <PAvatar
                      v-else-if="isSelectItem(item) && item.avatar"
                      :size="((item.pohon?.itemLeadingAvatarSize || props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
                      v-bind="item.avatar"
                      :class="pohon.itemLeadingAvatar({ class: [props.pohon?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
                      data-pohon="select-item-leading-avatar"
                    />
                    <PChip
                      v-else-if="isSelectItem(item) && item.chip"
                      :size="((item.pohon?.itemLeadingChipSize || props.pohon?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as PChipProps['size'])"
                      inset
                      standalone
                      v-bind="item.chip"
                      :class="pohon.itemLeadingChip({ class: [props.pohon?.itemLeadingChip, item.pohon?.itemLeadingChip] })"
                      data-pohon="select-item-leading-chip"
                    />
                  </slot>

                  <span
                    :class="pohon.itemWrapper({
                      class: [
                        props.pohon?.itemWrapper, isSelectItem(item) && item.pohon?.itemWrapper,
                      ],
                    })"
                    data-pohon="select-item-wrapper"
                  >
                    <ASelectItemText
                      :class="pohon.itemLabel({
                        class: [
                          props.pohon?.itemLabel, isSelectItem(item) && item.pohon?.itemLabel,
                        ],
                      })"
                      data-pohon="select-item-label"
                    >
                      <slot
                        name="item-label"
                        :item="(item as NestedItem<T>)"
                        :index="index"
                      >
                        {{ isSelectItem(item) ? getProp({ object: item, path: props.labelKey as string }) : item }}
                      </slot>
                    </ASelectItemText>

                    <span
                      v-if="isSelectItem(item) && (getProp({ object: item, path: props.descriptionKey as string }) || !!slots['item-description'])"
                      :class="pohon.itemDescription({
                        class: [
                          props.pohon?.itemDescription, isSelectItem(item) && item.pohon?.itemDescription,
                        ],
                      })"
                      data-pohon="select-item-description"
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
                    :class="pohon.itemTrailing({
                      class: [props.pohon?.itemTrailing, isSelectItem(item) && item.pohon?.itemTrailing],
                    })"
                    data-pohon="select-item-trailing"
                  >
                    <slot
                      name="item-trailing"
                      :item="(item as NestedItem<T>)"
                      :index="index"
                      :pohon="pohon"
                    />

                    <ASelectItemIndicator as-child>
                      <PIcon
                        :name="selectedIcon || appConfig.pohon.icons.check"
                        :class="pohon.itemTrailingIcon({
                          class: [props.pohon?.itemTrailingIcon, isSelectItem(item) && item.pohon?.itemTrailingIcon],
                        })"
                        data-pohon="select-item-trailing-icon"
                      />
                    </ASelectItemIndicator>
                  </span>
                </slot>
              </ASelectItem>
            </template>
          </ASelectGroup>
        </div>

        <slot name="content-bottom" />

        <ASelectArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="pohon.arrow({ class: props.pohon?.arrow })"
          data-pohon="select-arrow"
        />
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
