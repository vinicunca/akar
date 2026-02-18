<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PAvatarProps, PIconProps } from '../types';
import type { DynamicSlots } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/timeline';

type Timeline = ComponentConfig<typeof theme, AppConfig, 'timeline'>;

export interface PTimelineItem {
  date?: string;
  title?: string;
  description?: string;
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  value?: string | number;
  slot?: string;
  class?: any;
  pohon?: Pick<Timeline['slots'], 'item' | 'container' | 'indicator' | 'separator' | 'wrapper' | 'date' | 'title' | 'description'>;
  [key: string]: any;
}

export interface PTimelineProps<T extends PTimelineItem = PTimelineItem> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  items: Array<T>;
  /**
   * @defaultValue 'md'
   */
  size?: Timeline['variants']['size'];
  /**
   * @defaultValue 'primary'
   */
  color?: Timeline['variants']['color'];
  /**
   * The orientation of the Timeline.
   * @defaultValue 'vertical'
   */
  orientation?: Timeline['variants']['orientation'];
  defaultValue?: string | number;
  reverse?: boolean;
  class?: any;
  pohon?: Timeline['slots'];
}

type SlotProps<T extends PTimelineItem> = (props: { item: T }) => any;

export type PTimelineSlots<T extends PTimelineItem = PTimelineItem> = {
  indicator: SlotProps<T>;
  wrapper: SlotProps<T>;
  date: SlotProps<T>;
  title: SlotProps<T>;
  description: SlotProps<T>;
} & DynamicSlots<T, 'indicator' | 'wrapper' | 'date' | 'title' | 'description', { item: T }>;

</script>

<script setup lang="ts" generic="T extends PTimelineItem">
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { APrimitive, ASeparator } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';

const props = withDefaults(
  defineProps<PTimelineProps<T>>(),
  {
    orientation: 'vertical',
  },
);
const slots = defineSlots<PTimelineSlots<T>>();

const modelValue = defineModel<string | number>();

const appConfig = useAppConfig() as Timeline['AppConfig'];
const pohonProp = useComponentPohon('timeline', props);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.timeline || {}),
  })({
    orientation: props.orientation,
    size: props.size,
    color: props.color,
    reverse: props.reverse,
  }),
);

const currentStepIndex = computed(() => {
  const value = modelValue.value ?? props.defaultValue;

  if (isString(value)) {
    return props.items.findIndex((item) => item.value === value) ?? -1;
  }

  if (props.reverse) {
    return value != null ? props.items.length - 1 - value : -1;
  } else {
    return value ?? -1;
  }
});

function getItemState(index: number): 'active' | 'completed' | undefined {
  if (currentStepIndex.value === -1) {
    return undefined;
  }
  if (index === currentStepIndex.value) {
    return 'active';
  }

  if (props.reverse) {
    return index > currentStepIndex.value ? 'completed' : undefined;
  } else {
    return index < currentStepIndex.value ? 'completed' : undefined;
  }
}
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="timeline-root"
  >
    <div
      v-for="(item, index) in items"
      :key="item.value ?? index"
      :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item, item.class] })"
      :data-state="getItemState(index)"
      data-pohon="timeline-item"
    >
      <div
        :class="pohon.container({ class: [pohonProp?.container, item.pohon?.container] })"
        data-pohon="timeline-container"
      >
        <PAvatar
          :size="size"
          :icon="item.icon"
          v-bind="typeof item.avatar === 'object' ? item.avatar : {}"
          :class="pohon.indicator({ class: [pohonProp?.indicator, item.pohon?.indicator] })"
          :pohon="{ icon: 'akar:color-inherit', fallback: 'color-inherit' }"
          data-pohon="timeline-indicator"
        >
          <slot
            :name="((item.slot ? `${item.slot}-indicator` : 'indicator') as keyof PTimelineSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          />
        </PAvatar>

        <ASeparator
          v-if="index < items.length - 1"
          :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator] })"
          :orientation="props.orientation"
          data-pohon="timeline-separator"
        />
      </div>

      <div
        data-pohon="timeline-wrapper"
        :class="pohon.wrapper({ class: [pohonProp?.wrapper, item.pohon?.wrapper] })"
      >
        <slot
          :name="((item.slot ? `${item.slot}-wrapper` : 'wrapper') as keyof PTimelineSlots<T>)"
          :item="(item as Extract<T, { slot: string; }>)"
        >
          <div
            v-if="item.date || !!slots[(item.slot ? `${item.slot}-date` : 'date') as keyof PTimelineSlots<T>]"
            data-pohon="timeline-date"
            :class="pohon.date({ class: [pohonProp?.date, item.pohon?.date] })"
          >
            <slot
              :name="((item.slot ? `${item.slot}-date` : 'date') as keyof PTimelineSlots<T>)"
              :item="(item as Extract<T, { slot: string; }>)"
            >
              {{ item.date }}
            </slot>
          </div>
          <div
            v-if="item.title || !!slots[(item.slot ? `${item.slot}-title` : 'title') as keyof PTimelineSlots<T>]"
            data-pohon="timeline-title"
            :class="pohon.title({ class: [pohonProp?.title, item.pohon?.title] })"
          >
            <slot
              :name="((item.slot ? `${item.slot}-title` : 'title') as keyof PTimelineSlots<T>)"
              :item="(item as Extract<T, { slot: string; }>)"
            >
              {{ item.title }}
            </slot>
          </div>
          <div
            v-if="item.description || !!slots[(item.slot ? `${item.slot}-description` : 'description') as keyof PTimelineSlots<T>]"
            data-pohon="timeline-description"
            :class="pohon.description({ class: [pohonProp?.description, item.pohon?.description] })"
          >
            <slot
              :name="((item.slot ? `${item.slot}-description` : 'description') as keyof PTimelineSlots<T>)"
              :item="(item as Extract<T, { slot: string; }>)"
            >
              {{ item.description }}
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </APrimitive>
</template>
