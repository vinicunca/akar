<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PAvatarProps, PButtonProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/empty';

type Empty = ComponentConfig<typeof theme, AppConfig, 'empty'>;

export interface PEmptyProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  title?: string;
  description?: string;
  /**
   * Display a list of Button in the body.
   */
  actions?: Array<PButtonProps>;
  /**
   * @defaultValue 'outline'
   */
  variant?: Empty['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Empty['variants']['size'];
  class?: any;
  pohon?: Empty['slots'];
}

export interface PEmptySlots {
  header?: (props?: {}) => Array<VNode>;
  leading?: (props: { pohon: Empty['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isObjectType } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';

const props = defineProps<PEmptyProps>();
const slots = defineSlots<PEmptySlots>();

const appConfig = useAppConfig() as Empty['AppConfig'];
const pohonProp = useComponentPohon('empty', props);

const pohon = computed(() => uv({
  extend: uv(theme),
  ...(appConfig.pohon?.empty || {}),
})({
  variant: props.variant,
  size: props.size,
}));
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!slots.header || (icon || avatar || !!slots.leading) || (title || !!slots.title) || (description || !!slots.description)"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot name="header">
        <slot
          name="leading"
          :pohon="pohon"
        >
          <PAvatar
            v-if="icon || avatar"
            :icon="icon"
            v-bind="isObjectType(avatar) ? avatar : {}"
            data-slot="avatar"
            :class="pohon.avatar({ class: pohonProp?.avatar })"
          />
        </slot>

        <h2
          v-if="title || !!slots.title"
          data-slot="title"
          :class="pohon.title({ class: pohonProp?.title })"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <div
          v-if="description || !!slots.description"
          data-slot="description"
          :class="pohon.description({ class: pohonProp?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div
      v-if="!!slots.body || (actions?.length || !!slots.actions)"
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <slot name="body">
        <div
          v-if="actions?.length || !!slots.actions"
          data-slot="actions"
          :class="pohon.actions({ class: pohonProp?.actions })"
        >
          <slot name="actions">
            <PButton
              v-for="(action, index) in actions"
              :key="index"
              :size="size"
              v-bind="action"
            />
          </slot>
        </div>
      </slot>
    </div>

    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot name="footer" />
    </div>
  </APrimitive>
</template>
