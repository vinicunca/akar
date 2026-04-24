<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PIconProps, PLinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/page-card';

type PageCard = ComponentConfig<typeof theme, AppConfig, 'pageCard'>;

export interface PPageCardProps {
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
  title?: string;
  description?: string;
  /**
   * The orientation of the page card.
   * @defaultValue 'vertical'
   */
  orientation?: PageCard['variants']['orientation'];
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean;
  /**
   * Display a line around the page card.
   */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: PageCard['variants']['highlightColor'];
  /**
   * Display a spotlight effect that follows your mouse cursor and highlights borders on hover.
   */
  spotlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  spotlightColor?: PageCard['variants']['spotlightColor'];
  /**
   * @defaultValue 'outline'
   */
  variant?: PageCard['variants']['variant'];
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  pohon?: PageCard['slots'];
}

export interface PPageCardSlots {
  header?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  leading?: (props: { pohon: PageCard['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { pausableFilter, useMouseInElement } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed, ref, watch } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PPageCardProps>(), {
  orientation: 'vertical',
});
const slots = defineSlots<PPageCardSlots>();

const cardRef = ref<HTMLElement>();
const motionControl = pausableFilter();

const appConfig = useAppConfig() as PageCard['AppConfig'];
const pohonProp = useComponentPohon('pageCard', props);
const { elementX, elementY } = useMouseInElement(cardRef, {
  eventFilter: motionControl.eventFilter,
});

const spotlight = computed(() => props.spotlight && (elementX.value !== 0 || elementY.value !== 0));

watch(() => props.spotlight, (value) => {
  if (value) {
    motionControl.resume();
  } else {
    motionControl.pause();
  }
}, { immediate: true });

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pageCard || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  variant: props.variant,
  to: !!props.to || !!props.onClick,
  title: !!props.title || !!slots.title,
  highlight: props.highlight,
  highlightColor: props.highlightColor,
  spotlight: spotlight.value,
  spotlightColor: props.spotlightColor,
}));

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Card link').trim();
});
</script>

<template>
  <APrimitive
    ref="cardRef"
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    :style="spotlight && { '--spotlight-x': `${elementX}px`, '--spotlight-y': `${elementY}px` }"
    @click="onClick"
  >
    <div
      v-if="props.spotlight"
      data-slot="spotlight"
      :class="pohon.spotlight({ class: pohonProp?.spotlight })"
    />

    <div
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <div
        v-if="!!slots.header || (icon || !!slots.leading) || !!slots.body || (title || !!slots.title) || (description || !!slots.description) || !!slots.footer"
        data-slot="wrapper"
        :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      >
        <div
          v-if="!!slots.header"
          data-slot="header"
          :class="pohon.header({ class: pohonProp?.header })"
        >
          <slot name="header" />
        </div>

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
          v-if="!!slots.body || (title || !!slots.title) || (description || !!slots.description)"
          data-slot="body"
          :class="pohon.body({ class: pohonProp?.body })"
        >
          <slot name="body">
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
          v-if="!!slots.footer"
          data-slot="footer"
          :class="pohon.footer({ class: pohonProp?.footer })"
        >
          <slot name="footer" />
        </div>
      </div>

      <slot />
    </div>

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
  </APrimitive>
</template>
