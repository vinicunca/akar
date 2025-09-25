<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps } from 'akar';
import type { IconProps, PAvatarProps, PButtonProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/alert';

type Alert = ComponentConfig<typeof theme, AppConfig, 'alert'>;

export interface PAlertProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  title?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  avatar?: PAvatarProps;
  /**
   * @defaultValue 'primary'
   */
  color?: Alert['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: Alert['variants']['variant'];
  /**
   * The orientation between the content and the actions.
   * @defaultValue 'vertical'
   */
  orientation?: Alert['variants']['orientation'];
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: Array<PButtonProps>;
  /**
   * Display a close button to dismiss the alert.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: boolean | Partial<PButtonProps>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: IconProps['name'];
  class?: any;
  pohon?: Alert['slots'];
}

export interface PAlertEmits {
  'update:open': [value: boolean];
}

export interface PAlertSlots {
  leading: (props?: object) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  actions: (props?: object) => any;
  close: (props: { pohon: { [K in keyof Required<Alert['slots']>]: (props?: Record<string, any>) => string } }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PAlertProps>(),
  {
    orientation: 'vertical',
  },
);
const emits = defineEmits<PAlertEmits>();
const slots = defineSlots<PAlertSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Alert['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.alert || {}),
  })({
    color: props.color,
    variant: props.variant,
    orientation: props.orientation,
    title: !!props.title || !!slots.title,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <slot name="leading">
      <PAvatar
        v-if="avatar"
        :size="((props.pohon?.avatarSize || pohon.avatarSize()) as PAvatarProps['size'])"
        v-bind="avatar"
        :class="pohon.avatar({ class: props.pohon?.avatar })"
      />
      <PIcon
        v-else-if="icon"
        :name="icon"
        :class="pohon.icon({ class: props.pohon?.icon })"
      />
    </slot>

    <div :class="pohon.wrapper({ class: props.pohon?.wrapper })">
      <div
        v-if="title || !!slots.title"
        :class="pohon.title({ class: props.pohon?.title })"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="description || !!slots.description"
        :class="pohon.description({ class: props.pohon?.description })"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <div
        v-if="orientation === 'vertical' && (actions?.length || !!slots.actions)"
        :class="pohon.actions({ class: props.pohon?.actions })"
      >
        <slot name="actions">
          <PButton
            v-for="(action, index) in actions"
            :key="index"
            size="xs"
            v-bind="action"
          />
        </slot>
      </div>
    </div>

    <div
      v-if="(orientation === 'horizontal' && (actions?.length || !!slots.actions)) || close"
      :class="pohon.actions({ class: props.pohon?.actions, orientation: 'horizontal' })"
    >
      <template v-if="orientation === 'horizontal' && (actions?.length || !!slots.actions)">
        <slot name="actions">
          <PButton
            v-for="(action, index) in actions"
            :key="index"
            size="xs"
            v-bind="action"
          />
        </slot>
      </template>

      <slot
        name="close"
        :pohon="pohon"
      >
        <PButton
          v-if="close"
          :icon="closeIcon || appConfig.pohon.icons.close"
          color="neutral"
          variant="link"
          :aria-label="t('alert.close')"
          v-bind="typeof close === 'object' ? close as Partial<PButtonProps> : {}"
          :class="pohon.close({ class: props.pohon?.close })"
          @click="emits('update:open', false)"
        />
      </slot>
    </div>
  </APrimitive>
</template>
