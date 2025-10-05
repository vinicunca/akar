<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps, ARadioGroupRootEmits, ARadioGroupRootProps } from 'akar';
import type { AcceptableValue, GetItemKeys, GetModelValue } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/radio-group';

type RadioGroup = ComponentConfig<typeof theme, AppConfig, 'radioGroup'>;

export type PRadioGroupValue = AcceptableValue;
export type PRadioGroupItem = PRadioGroupValue | {
  label?: string;
  description?: string;
  disabled?: boolean;
  value?: PRadioGroupValue;
  class?: any;
  pohon?: Pick<RadioGroup['slots'], 'item' | 'container' | 'base' | 'indicator' | 'wrapper' | 'label' | 'description'>;
  [key: string]: any;
};

export interface PRadioGroupProps<T extends Array<PRadioGroupItem> = Array<PRadioGroupItem>, VK extends GetItemKeys<T> = 'value'> extends Pick<ARadioGroupRootProps, 'disabled' | 'loop' | 'name' | 'required'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  legend?: string;
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
  /** The controlled value of the RadioGroup. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, false>;
  /** The value of the RadioGroup when initially rendered. Use when you do not need to control the state of the RadioGroup. */
  defaultValue?: GetModelValue<T, VK, false>;
  /**
   * @defaultValue 'md'
   */
  size?: RadioGroup['variants']['size'];
  /**
   * @defaultValue 'list'
   */
  variant?: RadioGroup['variants']['variant'];
  /**
   * @defaultValue 'primary'
   */
  color?: RadioGroup['variants']['color'];
  /**
   * The orientation the radio buttons are laid out.
   * @defaultValue 'vertical'
   */
  orientation?: ARadioGroupRootProps['orientation'];
  /**
   * Position of the indicator.
   * @defaultValue 'start'
   */
  indicator?: RadioGroup['variants']['indicator'];
  class?: any;
  pohon?: RadioGroup['slots'];
}

export type PRadioGroupEmits = ARadioGroupRootEmits & {
  change: [event: Event];
};

type NormalizeItem<T extends PRadioGroupItem> = Exclude<T & { id: string }, PRadioGroupValue>;

type SlotProps<T extends PRadioGroupItem> = (props: { item: NormalizeItem<T>; modelValue?: PRadioGroupValue }) => any;

export interface PRadioGroupSlots<T extends Array<PRadioGroupItem> = Array<PRadioGroupItem>> {
  legend: (props?: object) => any;
  label: SlotProps<T[number]>;
  description: SlotProps<T[number]>;
}
</script>

<script setup lang="ts" generic="T extends PRadioGroupItem[], VK extends GetItemKeys<T> = 'value'">
import { useAppConfig } from '#imports';
import { isBigInt, isNumber, isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ALabel,
  ARadioGroupIndicator,
  ARadioGroupItem,
  ARadioGroupRoot,
  useForwardPropsEmits,
} from 'akar';
import { computed, useId } from 'vue';
import { useFormField } from '../composables/use-form-field';
import { getProp } from '../utils';
import { uv } from '../utils/uv';

const props = withDefaults(
  defineProps<PRadioGroupProps<T, VK>>(),
  {
    valueKey: 'value' as never,
    labelKey: 'label',
    descriptionKey: 'description',
    orientation: 'vertical',
  },
);
const emits = defineEmits<PRadioGroupEmits>();
const slots = defineSlots<PRadioGroupSlots<T>>();

const appConfig = useAppConfig() as RadioGroup['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'loop', 'required'), emits);

const {
  emitFormChange,
  emitFormInput,
  color,
  name,
  size,
  id: _id,
  disabled,
  ariaAttrs,
} = useFormField<PRadioGroupProps<T>>(props, { bind: false });
const id = _id.value ?? useId();

const pohon = computed(() =>
  uv({ extend: uv(theme), ...(appConfig.pohon?.radioGroup || {}) })({
    size: size.value,
    color: color.value,
    disabled: disabled.value,
    required: props.required,
    orientation: props.orientation,
    variant: props.variant,
    indicator: props.indicator,
  }),
);

function normalizeItem(item: any) {
  if (item === null) {
    return {
      id: `${id}:null`,
      value: undefined,
      label: undefined,
    };
  }

  if (isString(item) || isNumber(item) || isBigInt(item)) {
    return {
      id: `${id}:${item}`,
      value: String(item),
      label: String(item),
    };
  }

  const value = getProp({ object: item, path: props.valueKey as string });
  const label = getProp({ object: item, path: props.labelKey as string });
  const description = getProp({ object: item, path: props.descriptionKey as string });

  return {
    ...(item),
    value,
    label,
    description,
    id: `${id}:${value}`,
  };
}

const normalizedItems = computed(() => {
  if (!props.items) {
    return [];
  }

  return props.items.map(normalizeItem);
});

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <ARadioGroupRoot
    :id="id"
    v-bind="rootProps"
    :model-value="(modelValue as Exclude<PRadioGroupItem, boolean> | Exclude<PRadioGroupItem, boolean>[])"
    :default-value="(defaultValue as Exclude<PRadioGroupItem, boolean> | Exclude<PRadioGroupItem, boolean>[])"
    :orientation="orientation"
    :name="name"
    :disabled="disabled"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <fieldset
      :class="pohon.fieldset({ class: props.pohon?.fieldset })"
      v-bind="ariaAttrs"
    >
      <legend
        v-if="legend || !!slots.legend"
        :class="pohon.legend({ class: props.pohon?.legend })"
      >
        <slot name="legend">
          {{ legend }}
        </slot>
      </legend>

      <component
        :is="(!variant || variant === 'list') ? 'div' : ALabel"
        v-for="item in normalizedItems"
        :key="item.value"
        :class="pohon.item({ class: [props.pohon?.item, item.pohon?.item, item.class] })"
      >
        <div :class="pohon.container({ class: [props.pohon?.container, item.pohon?.container] })">
          <ARadioGroupItem
            :id="item.id"
            :value="item.value"
            :disabled="item.disabled"
            :class="pohon.base({ class: [props.pohon?.base, item.pohon?.base], disabled: item.disabled })"
          >
            <ARadioGroupIndicator :class="pohon.indicator({ class: [props.pohon?.indicator, item.pohon?.indicator] })" />
          </ARadioGroupItem>
        </div>

        <div
          v-if="(item.label || !!slots.label) || (item.description || !!slots.description)"
          :class="pohon.wrapper({ class: [props.pohon?.wrapper, item.pohon?.wrapper] })"
        >
          <component
            :is="(!variant || variant === 'list') ? ALabel : 'p'"
            v-if="item.label || !!slots.label"
            :for="item.id"
            :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label] })"
          >
            <slot
              name="label"
              :item="item"
              :model-value="(modelValue as PRadioGroupValue)"
            >
              {{ item.label }}
            </slot>
          </component>
          <p
            v-if="item.description || !!slots.description"
            :class="pohon.description({ class: [props.pohon?.description, item.pohon?.description] })"
          >
            <slot
              name="description"
              :item="item"
              :model-value="(modelValue as PRadioGroupValue)"
            >
              {{ item.description }}
            </slot>
          </p>
        </div>
      </component>
    </fieldset>
  </ARadioGroupRoot>
</template>
