<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/card';

type Card = ComponentConfig<typeof theme, AppConfig, 'card'>;

export interface CardProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'outline'
   */
  variant?: Card['variants']['variant'];
  class?: any;
  pohon?: Card['slots'];
}

export interface CardSlots {
  header?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<CardProps>();
const slots = defineSlots<CardSlots>();

const appConfig = useAppConfig() as Card['AppConfig'];
const pohonProp = useComponentPohon('card', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.card || {}) })({
  variant: props.variant,
}));
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!slots.header"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot name="header" />
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
  </Primitive>
</template>
