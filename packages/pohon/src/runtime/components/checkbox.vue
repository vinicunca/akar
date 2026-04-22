<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ACheckboxRootEmits, ACheckboxRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PIconProps } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/checkbox';

type Checkbox = ComponentConfig<typeof theme, AppConfig, 'checkbox'>;

export interface PCheckboxProps<T = boolean> extends Pick<ACheckboxRootProps<T>, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue' | 'modelValue' | 'trueValue' | 'falseValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
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

export interface PCheckboxEmits<T = boolean> extends ACheckboxRootEmits<T> {
  change: [event: Event];
}

export interface PCheckboxSlots {
  label?: (props: { label: string | undefined }) => Array<VNode>;
  description?: (props: { description: string | undefined }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T = boolean">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  ACheckboxIndicator,
  ACheckboxRoot,
  ALabel,
  APrimitive,
  useForwardPropsEmits,
} from 'akar';
import { computed, useAttrs, useId } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/use-form-field';
import { useResolvedVariants } from '../composables/use-resolved-variants';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PCheckboxProps<T>>();
const emits = defineEmits<PCheckboxEmits<T>>();
const slots = defineSlots<PCheckboxSlots>();
const appConfig = useAppConfig() as Checkbox['AppConfig'];
const pohonProp = useComponentPohon('checkbox', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'required', 'value', 'defaultValue', 'modelValue', 'trueValue', 'falseValue'), emits);

const {
  id: _id,
  emitFormChange,
  emitFormInput,
  size,
  color,
  name,
  disabled,
  ariaAttrs,
} = useFormField<PCheckboxProps<T>>(props);
const id = _id.value ?? useId();

const { variant } = useResolvedVariants('checkbox', props, theme, ['variant']);

const attrs = useAttrs();
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs;
  return rest;
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.checkbox || {}) })({
  size: size.value,
  color: color.value,
  variant: variant.value,
  indicator: props.indicator,
  required: props.required,
  disabled: disabled.value,
}));

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
    :as="variant === 'list' ? as : ALabel"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <ACheckboxRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled"
        data-slot="base"
        :class="pohon.base({ class: pohonProp?.base })"
        @update:model-value="onUpdate"
      >
        <template #default="{ state }">
          <ACheckboxIndicator
            data-slot="indicator"
            :class="pohon.indicator({ class: pohonProp?.indicator })"
          >
            <PIcon
              v-if="state === 'indeterminate'"
              :name="indeterminateIcon || appConfig.pohon.icons.minus"
              data-slot="icon"
              :class="pohon.icon({ class: pohonProp?.icon })"
            />
            <PIcon
              v-else
              :name="icon || appConfig.pohon.icons.check"
              data-slot="icon"
              :class="pohon.icon({ class: pohonProp?.icon })"
            />
          </ACheckboxIndicator>
        </template>
      </ACheckboxRoot>
    </div>

    <div
      v-if="(label || !!slots.label) || (description || !!slots.description)"
      data-slot="wrapper"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
    >
      <component
        :is="variant === 'list' ? ALabel : 'p'"
        v-if="label || !!slots.label"
        :for="id"
        data-slot="label"
        :class="pohon.label({ class: pohonProp?.label })"
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
        data-slot="description"
        :class="pohon.description({ class: pohonProp?.description })"
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
