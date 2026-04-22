<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page';

type Page = ComponentConfig<typeof theme, AppConfig, 'page'>;

export interface PPageProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: Page['slots'];
}

export interface PPageSlots {
  left?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
  right?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive, APrimitiveSlot } from 'akar';
import { computed, onBeforeUpdate, shallowRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PPageProps>();
const slots = defineSlots<PPageSlots>();

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
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <APrimitiveSlot
      v-if="!!slots.left"
      data-slot="left"
      :class="pohon.left({ class: pohonProp?.left })"
    >
      <slot name="left" />
    </APrimitiveSlot>

    <div
      data-slot="center"
      :class="pohon.center({ class: pohonProp?.center })"
    >
      <slot />
    </div>

    <APrimitiveSlot
      v-if="!!slots.right"
      data-slot="right"
      :class="pohon.right({ class: pohonProp?.right })"
    >
      <slot name="right" />
    </APrimitiveSlot>
  </APrimitive>
</template>
