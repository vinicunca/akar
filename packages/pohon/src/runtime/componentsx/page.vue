<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page';

type Page = ComponentConfig<typeof theme, AppConfig, 'page'>;

export interface PageProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: Page['slots'];
}

export interface PageSlots {
  left?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  right?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive, Slot } from 'akar';
import { computed, onBeforeUpdate, shallowRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PageProps>();
const slots = defineSlots<PageSlots>();

const appConfig = useAppConfig() as Page['AppConfig'];
const pohonProp = useComponentPohon('page', props);

const hasLeft = shallowRef(!!slots.left);
const hasRight = shallowRef(!!slots.right);

onBeforeUpdate(() => {
  hasLeft.value = !!slots.left;
  hasRight.value = !!slots.right;
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.page || {}) })({
  left: hasLeft.value,
  right: hasRight.value,
}));
</script>

<template>
  <Primitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <Slot
      v-if="!!slots.left"
      data-slot="left"
      :class="pohon.left({ class: pohonProp?.left })"
    >
      <slot name="left" />
    </Slot>

    <div
      data-slot="center"
      :class="pohon.center({ class: pohonProp?.center })"
    >
      <slot />
    </div>

    <Slot
      v-if="!!slots.right"
      data-slot="right"
      :class="pohon.right({ class: pohonProp?.right })"
    >
      <slot name="right" />
    </Slot>
  </Primitive>
</template>
