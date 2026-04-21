<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { AvatarProps, PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/alert';

type Alert = ComponentConfig<typeof theme, AppConfig, 'alert'>;

export interface AlertProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  title?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: AvatarProps;
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
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  class?: any;
  pohon?: Alert['slots'];
}

export interface AlertEmits {
  'update:open': [value: boolean];
}

export interface AlertSlots {
  leading?: (props: { pohon: Alert['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  close?: (props: { pohon: Alert['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';

const props = withDefaults(defineProps<AlertProps>(), {
  orientation: 'vertical',
});
const emits = defineEmits<AlertEmits>();
const slots = defineSlots<AlertSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Alert['AppConfig'];
const pohonProp = useComponentPohon('alert', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.alert || {}) })({
  color: props.color,
  variant: props.variant,
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
}));
</script>

<template>
  <Primitive
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <slot
      name="leading"
      :pohon="pohon"
    >
      <PAvatar
        v-if="avatar"
        :size="((pohonProp?.avatarSize || pohon.avatarSize()) as AvatarProps['size'])"
        v-bind="avatar"
        data-slot="avatar"
        :class="pohon.avatar({ class: pohonProp?.avatar })"
      />
      <PIcon
        v-else-if="icon"
        :name="icon"
        data-slot="icon"
        :class="pohon.icon({ class: pohonProp?.icon })"
      />
    </slot>

    <div
      data-slot="wrapper"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
    >
      <div
        v-if="title || !!slots.title"
        data-slot="title"
        :class="pohon.title({ class: pohonProp?.title })"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="description || !!slots.description"
        data-slot="description"
        :class="pohon.description({ class: pohonProp?.description })"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <div
        v-if="orientation === 'vertical' && (actions?.length || !!slots.actions)"
        data-slot="actions"
        :class="pohon.actions({ class: pohonProp?.actions })"
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
      data-slot="actions"
      :class="pohon.actions({ class: pohonProp?.actions, orientation: 'horizontal' })"
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
          v-bind="(typeof close === 'object' ? close : {})"
          data-slot="close"
          :class="pohon.close({ class: pohonProp?.close })"
          @click="emits('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
