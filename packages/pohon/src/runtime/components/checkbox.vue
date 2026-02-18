<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ACheckboxRootProps } from 'akar';
import type { PIconProps } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/checkbox';

type Checkbox = ComponentConfig<typeof theme, AppConfig, 'checkbox'>;

export interface PCheckboxProps extends Pick<ACheckboxRootProps, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'value' | 'name'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  label?: string;
  description?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: Checkbox['variants']['color'];
  /**
   * @defaultValue 'list'
   */
  variant?: Checkbox['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Checkbox['variants']['size'];
  /**
   * Position of the indicator.
   * @defaultValue 'start'
   */
  indicator?: Checkbox['variants']['indicator'];
  /**
   * The icon displayed when checked.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * The icon displayed when the checkbox is indeterminate.
   * @defaultValue appConfig.pohon.icons.minus
   * @IconifyIcon
   */
  indeterminateIcon?: PIconProps['name'];
  class?: any;
  pohon?: Checkbox['slots'];
}

export type PCheckboxEmits = {
  change: [event: Event];
};

export interface PCheckboxSlots {
  label: (props: { label?: string }) => any;
  description: (props: { description?: string }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  ACheckboxIndicator,
  ACheckboxRoot,
  ALabel,
  APrimitive,
  useForwardProps,
} from 'akar';
import { computed, useId } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PCheckboxProps>();
const emits = defineEmits<PCheckboxEmits>();
const slots = defineSlots<PCheckboxSlots>();
const modelValue = defineModel<boolean | 'indeterminate'>({ default: undefined });

const appConfig = useAppConfig() as Checkbox['AppConfig'];
const pohonProp = useComponentPohon('checkbox', props);

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'));

const {
  id: _id,
  emitFormChange,
  emitFormInput,
  size,
  color,
  name,
  disabled,
  ariaAttrs,
} = useFormField<PCheckboxProps>(props);
const id = _id.value ?? useId();

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.checkbox || {}),
  })({
    size: size.value,
    color: color.value,
    variant: props.variant,
    indicator: props.indicator,
    required: props.required,
    disabled: disabled.value,
  }),
);

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
  <APrimitive
    :as="(!variant || variant === 'list') ? as : ALabel"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="checkbox-root"
  >
    <div
      :class="pohon.container({ class: pohonProp?.container })"
      data-pohon="checkbox-container"
    >
      <ACheckboxRoot
        :id="id"
        v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
        v-model="modelValue"
        :name="name"
        :disabled="disabled"
        :class="pohon.base({ class: pohonProp?.base })"
        data-pohon="checkbox-base"
        @update:model-value="onUpdate"
      >
        <template #default="{ modelValue }">
          <ACheckboxIndicator
            :class="pohon.indicator({ class: pohonProp?.indicator })"
            data-pohon="checkbox-indicator"
          >
            <PIcon
              v-if="modelValue === 'indeterminate'"
              :name="indeterminateIcon || appConfig.pohon.icons.minus"
              :class="pohon.icon({ class: pohonProp?.icon })"
              data-pohon="checkbox-icon"
            />

            <PIcon
              v-else
              :name="icon || appConfig.pohon.icons.check"
              :class="pohon.icon({ class: pohonProp?.icon })"
              data-pohon="checkbox-icon"
            />
          </ACheckboxIndicator>
        </template>
      </ACheckboxRoot>
    </div>

    <div
      v-if="(label || !!slots.label) || (description || !!slots.description)"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      data-pohon="checkbox-wrapper"
    >
      <component
        :is="(!variant || variant === 'list') ? ALabel : 'p'"
        v-if="label || !!slots.label"
        :for="id"
        :class="pohon.label({ class: pohonProp?.label })"
        data-pohon="checkbox-label"
      >
        <slot
          name="label"
          :label="label"
        >
          {{ label }}
        </slot>
      </component>
      <p
        v-if="description || !!slots.description"
        :class="pohon.description({ class: pohonProp?.description })"
        data-pohon="checkbox-description"
      >
        <slot
          name="description"
          :description="description"
        >
          {{ description }}
        </slot>
      </p>
    </div>
  </APrimitive>
</template>
