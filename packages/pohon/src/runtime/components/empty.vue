<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
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
  header: (props?: object) => any;
  leading: (props: { pohon: Empty['pohon'] }) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  body: (props?: object) => any;
  actions: (props?: object) => any;
  footer: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';

const props = defineProps<PEmptyProps>();
const slots = defineSlots<PEmptySlots>();

const appConfig = useAppConfig() as Empty['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.empty || {}),
  })({
    variant: props.variant,
    size: props.size,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="empty-root"
  >
    <div
      v-if="!!slots.header || (icon || avatar || !!slots.leading) || (title || !!slots.title) || (description || !!slots.description)"
      :class="pohon.header({ class: props.pohon?.header })"
      data-pohon="empty-header"
    >
      <slot name="header">
        <slot
          name="leading"
          :pohon="pohon"
        >
          <PAvatar
            v-if="icon || avatar"
            :icon="icon"
            v-bind="typeof avatar === 'object' ? avatar : {}"
            :class="pohon.avatar({ class: props.pohon?.avatar })"
            data-pohon="empty-avatar"
          />
        </slot>

        <h2
          v-if="title || !!slots.title"
          :class="pohon.title({ class: props.pohon?.title })"
          data-pohon="empty-title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <div
          v-if="description || !!slots.description"
          :class="pohon.description({ class: props.pohon?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div
      v-if="!!slots.body || (actions?.length || !!slots.actions)"
      :class="pohon.body({ class: props.pohon?.body })"
      data-pohon="empty-body"
    >
      <slot name="body">
        <div
          v-if="actions?.length || !!slots.actions"
          :class="pohon.actions({ class: props.pohon?.actions })"
          data-pohon="empty-actions"
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
      :class="pohon.footer({ class: props.pohon?.footer })"
      data-pohon="empty-footer"
    >
      <slot name="footer" />
    </div>
  </APrimitive>
</template>
