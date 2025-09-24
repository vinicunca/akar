<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ACheckboxGroupRootEmits, ACheckboxGroupRootProps, APrimitiveProps } from 'akar';
import type { CheckboxProps } from '../types';
import type { AcceptableValue, GetItemKeys, GetModelValue } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/checkbox-group';

type CheckboxGroup = ComponentConfig<typeof theme, AppConfig, 'checkboxGroup'>;

export type CheckboxGroupValue = AcceptableValue;
export type CheckboxGroupItem = CheckboxGroupValue | {
  label?: string;
  description?: string;
  disabled?: boolean;
  value?: string;
  class?: any;
  pohon?: Pick<CheckboxGroup['slots'], 'item'> & Omit<Required<CheckboxProps>['pohon'], 'root'>;
  [key: string]: any;
};

export interface CheckboxGroupProps<
  T extends Array<CheckboxGroupItem> = Array<CheckboxGroupItem>,
  VK extends GetItemKeys<T> = 'value',
> extends
  Pick<ACheckboxGroupRootProps, 'disabled' | 'loop' | 'name' | 'required'>,
  Pick<CheckboxProps, 'color' | 'indicator' | 'icon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
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
  /** The controlled value of the CheckboxGroup. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, true>;
  /** The value of the CheckboxGroup when initially rendered. Use when you do not need to control the state of the CheckboxGroup. */
  defaultValue?: GetModelValue<T, VK, true>;
  /**
   * @defaultValue 'md'
   */
  size?: CheckboxGroup['variants']['size'];
  /**
   * @defaultValue 'list'
   */
  variant?: CheckboxGroup['variants']['variant'];
  /**
   * The orientation the checkbox buttons are laid out.
   * @defaultValue 'vertical'
   */
  orientation?: ACheckboxGroupRootProps['orientation'];
  class?: any;
  pohon?: CheckboxGroup['slots'] & CheckboxProps['pohon'];
}

export type CheckboxGroupEmits<T extends Array<CheckboxGroupItem> = Array<CheckboxGroupItem>> = ACheckboxGroupRootEmits<T[number]> & {
  change: [event: Event];
};

type SlotProps<T extends CheckboxGroupItem> = (props: { item: T & { id: string } }) => any;

export interface CheckboxGroupSlots<T extends Array<CheckboxGroupItem> = Array<CheckboxGroupItem>> {
  legend: (props?: object) => any;
  label: SlotProps<T[number]>;
  description: SlotProps<T[number]>;
}
</script>

<script setup lang="ts" generic="T extends CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'">
import { useAppConfig } from '#imports';
import { isNumber, isString, omit } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { ACheckboxGroupRoot, useForwardProps, useForwardPropsEmits } from 'akar';
import { computed, useId } from 'vue';
import { useFormField } from '../composables/use-form-field';
import { getProp } from '../utils';
import { uv } from '../utils/uv';
import PCheckbox from './checkbox.vue';

const props = withDefaults(defineProps<CheckboxGroupProps<T, VK>>(), {
  labelKey: 'label',
  descriptionKey: 'description',
  valueKey: 'value' as never,
  orientation: 'vertical',
});
const emits = defineEmits<CheckboxGroupEmits<T>>();
const slots = defineSlots<CheckboxGroupSlots<T>>();

const appConfig = useAppConfig() as CheckboxGroup['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'loop', 'required'), emits);
const checkboxProps = useForwardProps(reactivePick(props, 'variant', 'indicator', 'icon'));
const getProxySlots = () => omit(slots, ['legend']);

const { emitFormChange, emitFormInput, color, name, size, id: _id, disabled, ariaAttrs } = useFormField<CheckboxGroupProps<T>>(props, { bind: false });
const id = _id.value ?? useId();

const pohon = computed(() => uv({ extend: theme, ...(appConfig.pohon?.checkboxGroup || {}) })({
  size: size.value,
  required: props.required,
  orientation: props.orientation,
  color: props.color,
  variant: props.variant,
}));

function normalizeItem(item: any) {
  if (item === null) {
    return {
      id: `${id}:null`,
      value: undefined,
      label: undefined,
    };
  }

  if (isString(item) || isNumber(item)) {
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
    ...item,
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

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ACheckboxGroupRoot
    :id="id"
    v-bind="rootProps"
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

      <PCheckbox
        v-for="item in normalizedItems"
        :key="item.value"
        v-bind="{ ...item, ...checkboxProps }"
        :color="color"
        :size="size"
        :name="name"
        :disabled="item.disabled || disabled"
        :ui="{ ...(props.pohon ? omit(props.pohon, ['root']) : undefined), ...(item.ui || {}) }"
        :class="pohon.item({ class: [props.pohon?.item, item.ui?.item, item.class] })"
      >
        <template
          v-for="(_, name) in getProxySlots()"
          #[name]
        >
          <slot
            :name="(name as keyof CheckboxGroupSlots<T>)"
            :item="item"
          />
        </template>
      </PCheckbox>
    </fieldset>
  </ACheckboxGroupRoot>
</template>
