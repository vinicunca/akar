<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/card';

type Card = ComponentConfig<typeof theme, AppConfig, 'card'>;

export interface PCardProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  title?: string;
  description?: string;
  /**
   * @defaultValue 'outline'
   */
  variant?: Card['variants']['variant'];
  class?: any;
  pohon?: Card['slots'];
}

export interface PCardSlots {
  header?: (props?: {}) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PCardProps>();
const slots = defineSlots<PCardSlots>();

const appConfig = useAppConfig() as Card['AppConfig'];
const pohonProp = useComponentPohon('card', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.card || {}) })({
  variant: props.variant,
}));
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot name="header">
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
      </slot>
    </div>

    <div
      v-if="!!slots.default"
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <slot />
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
