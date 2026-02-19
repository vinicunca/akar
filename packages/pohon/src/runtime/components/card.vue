<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/card';

type Card = ComponentConfig<typeof theme, AppConfig, 'card'>;

export interface PCardProps {
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

export interface PCardSlots {
  header: (props?: object) => any;
  default: (props?: object) => any;
  footer: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PCardProps>();
const slots = defineSlots<PCardSlots>();

const appConfig = useAppConfig() as Card['AppConfig'];
const pohonProp = useComponentPohon('card', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.card || {}),
  })({
    variant: props.variant,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="card-root"
  >
    <div
      v-if="!!slots.header"
      :class="pohon.header({ class: pohonProp?.header })"
      data-pohon="card-header"
    >
      <slot name="header" />
    </div>

    <div
      v-if="!!slots.default"
      :class="pohon.body({ class: pohonProp?.body })"
      data-pohon="card-body"
    >
      <slot />
    </div>

    <div
      v-if="!!slots.footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
      data-pohon="card-footer"
    >
      <slot name="footer" />
    </div>
  </APrimitive>
</template>
