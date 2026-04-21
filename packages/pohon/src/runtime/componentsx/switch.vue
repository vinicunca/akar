<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ASwitchRootEmits, ASwitchRootProps } from 'akar';
import type { VNode } from 'vue';
import type { PIconProps } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/switch';

type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>;

export interface PSwitchProps<T = boolean> extends Pick<ASwitchRootProps<T>, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue' | 'modelValue' | 'trueValue' | 'falseValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'primary'
   */
  color?: Switch['variants']['color'];
  /**
   * @defaultValue 'md'
   */
  size?: Switch['variants']['size'];
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean;
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name'];
  /**
   * Display an icon when the switch is checked.
   * @IconifyIcon
   */
  checkedIcon?: PIconProps['name'];
  /**
   * Display an icon when the switch is unchecked.
   * @IconifyIcon
   */
  uncheckedIcon?: PIconProps['name'];
  label?: string;
  description?: string;
  class?: any;
  pohon?: Switch['slots'];
}

export interface PSwitchEmits<T = boolean> extends ASwitchRootEmits<T> {
  change: [event: Event];
}

export interface PSwitchSlots {
  label?: (props: { label: string | undefined }) => Array<VNode>;
  description?: (props: { description: string | undefined }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="T = boolean">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { ALabel, APrimitive, ASwitchRoot, ASwitchThumb, useForwardPropsEmits } from 'akar';
import { computed, useAttrs, useId } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PSwitchProps<T>>();
const emits = defineEmits<PSwitchEmits<T>>();
const slots = defineSlots<PSwitchSlots>();
const appConfig = useAppConfig() as Switch['AppConfig'];
const pohonProp = useComponentPohon('switch', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'required', 'value', 'defaultValue', 'modelValue', 'trueValue', 'falseValue'), emits);

const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<PSwitchProps<T>>(props);
const id = _id.value ?? useId();

const attrs = useAttrs();
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs;
  return rest;
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.switch || {}) })({
  size: size.value,
  color: color.value,
  required: props.required,
  loading: props.loading,
  disabled: disabled.value || props.loading,
}));

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <ASwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled || loading"
        data-slot="base"
        :class="pohon.base({ class: pohonProp?.base })"
        @update:model-value="onUpdate"
      >
        <ASwitchThumb
          data-slot="thumb"
          :class="pohon.thumb({ class: pohonProp?.thumb })"
        >
          <PIcon
            v-if="loading"
            :name="loadingIcon || appConfig.pohon.icons.loading"
            data-slot="icon"
            :class="pohon.icon({ class: pohonProp?.icon, checked: true, unchecked: true })"
          />
          <template v-else>
            <PIcon
              v-if="checkedIcon"
              :name="checkedIcon"
              data-slot="icon"
              :class="pohon.icon({ class: pohonProp?.icon, checked: true })"
            />
            <PIcon
              v-if="uncheckedIcon"
              :name="uncheckedIcon"
              data-slot="icon"
              :class="pohon.icon({ class: pohonProp?.icon, unchecked: true })"
            />
          </template>
        </ASwitchThumb>
      </ASwitchRoot>
    </div>
    <div
      v-if="(label || !!slots.label) || (description || !!slots.description)"
      data-slot="wrapper"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
    >
      <ALabel
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
      </ALabel>
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
