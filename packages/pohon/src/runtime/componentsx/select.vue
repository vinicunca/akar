<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ASelectArrowProps, ASelectContentEmits, ASelectContentProps, ASelectRootEmits, ASelectRootProps } from 'akar';
import type { VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PChipProps, PIconProps, PInputProps } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ApplyModifiers, ModelModifiers } from '../types/input';
import type { AcceptableValue, ArrayOrNested, EmitsToProps, GetItemKeys, GetModelValue, NestedItem } from '../types/utils';
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
  onSelect?: (event: Event) => void;
  class?: any;
  pohon?: Pick<Select['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>;
  [key: string]: any;
};

type ExcludeItem = { type: 'label' | 'separator' };

export interface PSelectProps<T extends ArrayOrNested<PSelectItem> = ArrayOrNested<PSelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>> extends Omit<ASelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, UseComponentIconsProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
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
   * `{ rounded: true }`{lang="ts-type"}
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
  defaultValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>;
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>;
  modelModifiers?: Mod;
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean;
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  class?: any;
  pohon?: Select['slots'];
}

export interface PSelectEmits<
  A extends ArrayOrNested<PSelectItem>,
  VK extends GetItemKeys<A> | undefined,
  M extends boolean,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
> extends Omit<ASelectRootEmits, 'update:modelValue'> {
  'change': [event: Event];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
  'update:modelValue': [value: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod>];
}

type SlotProps<T extends PSelectItem> = (props: { item: T; index: number; pohon: Select['pohon'] }) => Array<VNode>;

export interface PSelectSlots<
  A extends ArrayOrNested<PSelectItem> = ArrayOrNested<PSelectItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  T extends NestedItem<A> = NestedItem<A>,
> {
  'leading'?: (props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod>; open: boolean; pohon: Select['pohon'] }) => Array<VNode>;
  'default'?: (props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod>; open: boolean; pohon: Select['pohon'] }) => Array<VNode>;
  'trailing'?: (props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod>; open: boolean; pohon: Select['pohon'] }) => Array<VNode>;
  'item'?: SlotProps<T>;
  'item-leading'?: SlotProps<T>;
  'item-label'?: (props: { item: T; index: number }) => Array<VNode>;
  'item-description'?: (props: { item: T; index: number }) => Array<VNode>;
  'item-trailing'?: SlotProps<T>;
  'content-top'?: (props?: {}) => Array<VNode>;
  'content-bottom'?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PSelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>">
import { useAppConfig } from '#imports';
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
  ASelectValue,
  ASelectViewport,
  useForwardPropsEmits,
} from 'akar';
import { defu } from 'defu';
import { computed, onMounted, toRef, useTemplateRef } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { FieldGroupReset, useFieldGroup } from '../composables/use-field-group';
import { useFormField } from '../composables/use-form-field';
import { usePortal } from '../composables/use-portal';
import { useResolvedVariants } from '../composables/use-resolved-variants';
import { getDisplayValue, getProp, isArrayOfArray, looseToNumber } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PChip from './chip.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PSelectProps<T, VK, M, Mod>>(), {
  valueKey: 'value' as never,
  labelKey: 'label',
  descriptionKey: 'description',
  portal: true,
  autofocusDelay: 0,
});
const emits = defineEmits<PSelectEmits<T, VK, M, Mod>>();
const slots = defineSlots<PSelectSlots<T, VK, M, Mod>>();

const appConfig = useAppConfig() as Select['AppConfig'];
const pohonProp = useComponentPohon('select', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emits);
const portalProps = usePortal(toRef(() => props.portal));
const { position } = useResolvedVariants('select', props, theme, ['position'], {
  position: () => props.content?.position,
});
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: position.value }) as ASelectContentProps);
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }) as ASelectArrowProps);

const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<PInputProps>(props);
const { orientation, size: fieldGroupSize } = useFieldGroup<PInputProps>(props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.pohon.icons.chevronDown })));

const selectSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const isItemAligned = computed(() => position.value === 'item-aligned');

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.select || {}) })({
  color: color.value,
  variant: props.variant,
  size: selectSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
  position: position.value,
}));

const groups = computed<Array<Array<PSelectItem>>>(() =>
  // eslint-disable-next-line no-nested-ternary
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);

const items = computed(() => groups.value.flatMap((group) => group) as Array<T>);

function displayValue(value: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | Array<ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>>): string | undefined {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value
      .map((item) => getDisplayValue<Array<T>, ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>>(items.value, item, {
        labelKey: props.labelKey,
        valueKey: props.valueKey,
      }))
      .filter((v): v is string => v != null && v !== '');

    return displayedValues.length > 0 ? displayedValues.join(', ') : undefined;
  }

  return getDisplayValue<Array<T>, ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>>(items.value, value as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
  });
}

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

const viewportRef = useTemplateRef('viewportRef');

defineExpose({
  triggerRef: toRef(() => triggerRef.value?.$el as HTMLButtonElement),
  viewportRef: toRef(() => {
    const instance = viewportRef.value;
    return (instance && typeof instance === 'object' && '$el' in instance ? instance.$el : instance) as HTMLElement | null;
  }),
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
      data-slot="base"
      :class="pohon.base({ class: [pohonProp?.base, props.class] })"
      v-bind="{ ...$attrs, ...ariaAttrs }"
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
            :size="((pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
            v-bind="avatar"
            data-slot="itemLeadingAvatar"
            :class="pohon.itemLeadingAvatar({ class: pohonProp?.itemLeadingAvatar })"
          />
        </slot>
      </span>

      <template
        v-for="displayedModelValue in [displayValue(modelValue as any)]"
        :key="displayedModelValue"
      >
        <ASelectValue
          :data-slot="displayedModelValue != null ? 'value' : 'placeholder'"
          :class="displayedModelValue != null ? pohon.value({ class: pohonProp?.value }) : pohon.placeholder({ class: pohonProp?.placeholder })"
        >
          <slot
            :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
            :open="open"
            :pohon="pohon"
          >
            {{ displayedModelValue ?? (placeholder ?? '&nbsp;') }}
          </slot>
        </ASelectValue>
      </template>

      <span
        v-if="isTrailing || !!slots.trailing"
        data-slot="trailing"
        :class="pohon.trailing({ class: pohonProp?.trailing })"
      >
        <slot
          name="trailing"
          :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)"
          :open="open"
          :pohon="pohon"
        >
          <PIcon
            v-if="trailingIconName"
            :name="trailingIconName"
            data-slot="trailingIcon"
            :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon })"
          />
        </slot>
      </span>
    </ASelectTrigger>

    <ASelectPortal v-bind="portalProps">
      <FieldGroupReset>
        <ASelectContent
          data-slot="content"
          :class="pohon.content({ class: pohonProp?.content })"
          v-bind="contentProps"
        >
          <slot name="content-top" />

          <component
            :is="isItemAligned ? ASelectViewport : 'div'"
            ref="viewportRef"
            role="presentation"
            data-slot="viewport"
            :class="pohon.viewport({ class: pohonProp?.viewport })"
          >
            <ASelectGroup
              v-for="(group, groupIndex) in groups"
              :key="`group-${groupIndex}`"
              data-slot="group"
              :class="pohon.group({ class: pohonProp?.group })"
            >
              <template
                v-for="(item, index) in group"
                :key="`group-${groupIndex}-${index}`"
              >
                <ASelectLabel
                  v-if="isSelectItem(item) && item.type === 'label'"
                  data-slot="label"
                  :class="pohon.label({ class: [pohonProp?.label, item.pohon?.label, item.class] })"
                >
                  {{ getProp(item, props.labelKey as string) }}
                </ASelectLabel>

                <ASelectSeparator
                  v-else-if="isSelectItem(item) && item.type === 'separator'"
                  data-slot="separator"
                  :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator, item.class] })"
                />

                <ASelectItem
                  v-else
                  data-slot="item"
                  :class="pohon.item({ class: [pohonProp?.item, isSelectItem(item) && item.pohon?.item, isSelectItem(item) && item.class] })"
                  :disabled="isSelectItem(item) && item.disabled"
                  :value="isSelectItem(item) ? getProp(item, props.valueKey as string) : item"
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
                        data-slot="itemLeadingIcon"
                        :class="pohon.itemLeadingIcon({ class: [pohonProp?.itemLeadingIcon, item.pohon?.itemLeadingIcon] })"
                      />
                      <PAvatar
                        v-else-if="isSelectItem(item) && item.avatar"
                        :size="((item.pohon?.itemLeadingAvatarSize || pohonProp?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
                        v-bind="item.avatar"
                        data-slot="itemLeadingAvatar"
                        :class="pohon.itemLeadingAvatar({ class: [pohonProp?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar] })"
                      />
                      <PChip
                        v-else-if="isSelectItem(item) && item.chip"
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
                      :class="pohon.itemWrapper({ class: [pohonProp?.itemWrapper, isSelectItem(item) && item.pohon?.itemWrapper] })"
                    >
                      <ASelectItemText
                        data-slot="itemLabel"
                        :class="pohon.itemLabel({ class: [pohonProp?.itemLabel, isSelectItem(item) && item.pohon?.itemLabel] })"
                      >
                        <slot
                          name="item-label"
                          :item="(item as NestedItem<T>)"
                          :index="index"
                        >
                          {{ isSelectItem(item) ? getProp(item, props.labelKey as string) : item }}
                        </slot>
                      </ASelectItemText>

                      <span
                        v-if="isSelectItem(item) && (getProp(item, props.descriptionKey as string) || !!slots['item-description'])"
                        data-slot="itemDescription"
                        :class="pohon.itemDescription({ class: [pohonProp?.itemDescription, isSelectItem(item) && item.pohon?.itemDescription] })"
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
                      :class="pohon.itemTrailing({ class: [pohonProp?.itemTrailing, isSelectItem(item) && item.pohon?.itemTrailing] })"
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
                          data-slot="itemTrailingIcon"
                          :class="pohon.itemTrailingIcon({ class: [pohonProp?.itemTrailingIcon, isSelectItem(item) && item.pohon?.itemTrailingIcon] })"
                        />
                      </ASelectItemIndicator>
                    </span>
                  </slot>
                </ASelectItem>
              </template>
            </ASelectGroup>
          </component>

          <slot name="content-bottom" />

          <ASelectArrow
            v-if="!!arrow"
            v-bind="arrowProps"
            data-slot="arrow"
            :class="pohon.arrow({ class: pohonProp?.arrow })"
          />
        </ASelectContent>
      </FieldGroupReset>
    </ASelectPortal>
  </ASelectRoot>
</template>
