<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PIconProps, PLinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-feature';

type PageFeature = ComponentConfig<typeof theme, AppConfig, 'pageFeature'>;

export interface PPageFeatureProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed next to the title when `orientation` is `horizontal` and above the title when `orientation` is `vertical`.
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  title?: string;
  description?: string;
  /**
   * The orientation of the page feature.
   * @defaultValue 'horizontal'
   */
  orientation?: PageFeature['variants']['orientation'];
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  pohon?: PageFeature['slots'];
}

export interface PPageFeatureSlots {
  leading?: (props: { pohon: PageFeature['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PPageFeatureProps>(), {
  orientation: 'horizontal',
});
const slots = defineSlots<PPageFeatureSlots>();

const appConfig = useAppConfig() as PageFeature['AppConfig'];
const pohonProp = useComponentPohon('pageFeature', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageFeature || {}) })({
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
  to: !!props.to || !!props.onClick,
}));

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Feature link').trim();
});
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @click="onClick"
  >
    <div
      v-if="icon || !!slots.leading"
      data-slot="leading"
      :class="pohon.leading({ class: pohonProp?.leading })"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="icon"
          :name="icon"
          data-slot="leadingIcon"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon })"
        />
      </slot>
    </div>

    <div
      data-slot="wrapper"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
    >
      <PLink
        v-if="to"
        :aria-label="ariaLabel"
        v-bind="{ to, target, ...$attrs }"
        class="peer focus:outline-none"
        raw
      >
        <span
          class="inset-0 absolute"
          aria-hidden="true"
        />
      </PLink>

      <slot>
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
  </APrimitive>
</template>
