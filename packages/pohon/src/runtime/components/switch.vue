<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ASwitchRootProps } from 'akar';
import type { PIconProps } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/switch';

type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>;

export interface PSwitchProps extends Pick<ASwitchRootProps, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
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

export type PSwitchEmits = {
  change: [event: Event];
};

export interface PSwitchSlots {
  label: (props: { label?: string }) => any;
  description: (props: { description?: string }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  ALabel,
  APrimitive,
  ASwitchRoot,
  ASwitchThumb,
  useForwardProps,
} from 'akar';
import { computed, useAttrs, useId } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFormField } from '../composables/use-form-field';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PSwitchProps>();
const emits = defineEmits<PSwitchEmits>();
const slots = defineSlots<PSwitchSlots>();
const modelValue = defineModel<boolean>({ default: undefined });

const appConfig = useAppConfig() as Switch['AppConfig'];
const pohonProp = useComponentPohon('switch', props);

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
} = useFormField<PSwitchProps>(props);
const id = _id.value ?? useId();

const attrs = useAttrs();
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs;
  return rest;
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.switch || {}),
  })({
    size: size.value,
    color: color.value,
    required: props.required,
    loading: props.loading,
    disabled: disabled.value || props.loading,
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

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="switch-root"
  >
    <div
      :class="pohon.container({ class: pohonProp?.container })"
      data-pohon="switch-container"
    >
      <ASwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        v-model="modelValue"
        :name="name"
        :disabled="disabled || loading"
        :class="pohon.base({ class: pohonProp?.base })"
        data-pohon="switch-base"
        @update:model-value="onUpdate"
      >
        <ASwitchThumb
          :class="pohon.thumb({ class: pohonProp?.thumb })"
          data-pohon="switch-thumb"
        >
          <PIcon
            v-if="loading"
            :name="loadingIcon || appConfig.pohon.icons.loading"
            :class="pohon.icon({ class: pohonProp?.icon, checked: true, unchecked: true })"
            data-pohon="switch-icon"
          />
          <template v-else>
            <PIcon
              v-if="checkedIcon"
              :name="checkedIcon"
              :class="pohon.icon({ class: pohonProp?.icon, checked: true })"
              data-pohon="switch-icon"
            />
            <PIcon
              v-if="uncheckedIcon"
              :name="uncheckedIcon"
              :class="pohon.icon({ class: pohonProp?.icon, unchecked: true })"
              data-pohon="switch-icon"
            />
          </template>
        </ASwitchThumb>
      </ASwitchRoot>
    </div>
    <div
      v-if="(label || !!slots.label) || (description || !!slots.description)"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      data-pohon="switch-wrapper"
    >
      <ALabel
        v-if="label || !!slots.label"
        :for="id"
        :class="pohon.label({ class: pohonProp?.label })"
        data-pohon="switch-label"
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
        :class="pohon.description({ class: pohonProp?.description })"
        data-pohon="switch-description"
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
