<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PAvatarProps, IconProps } from '../types';
import type { DynamicSlots } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/timeline';

type Timeline = ComponentConfig<typeof theme, AppConfig, 'timeline'>;

export interface TimelineItem {
  date?: string;
  title?: string;
  description?: string;
  icon?: IconProps['name'];
  avatar?: PAvatarProps;
  value?: string | number;
  slot?: string;
  class?: any;
  pohon?: Pick<Timeline['slots'], 'item' | 'container' | 'indicator' | 'separator' | 'wrapper' | 'date' | 'title' | 'description'>;
  [key: string]: any;
}

export interface TimelineProps<T extends TimelineItem = TimelineItem> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
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

type SlotProps<T extends TimelineItem> = (props: { item: T }) => any;

export type TimelineSlots<T extends TimelineItem = TimelineItem> = {
  indicator: SlotProps<T>;
  date: SlotProps<T>;
  title: SlotProps<T>;
  description: SlotProps<T>;
} & DynamicSlots<T, 'indicator' | 'date' | 'title' | 'description', { item: T }>;

</script>

<script setup lang="ts" generic="T extends TimelineItem">
import { useAppConfig } from '#imports';
import { APrimitive, Separator } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';

const props = withDefaults(defineProps<TimelineProps<T>>(), {
  orientation: 'vertical',
});
const slots = defineSlots<TimelineSlots<T>>();

const modelValue = defineModel<string | number>();

const appConfig = useAppConfig() as Timeline['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.timeline || {}) })({
  orientation: props.orientation,
  size: props.size,
  color: props.color,
  reverse: props.reverse,
}));

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
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div
      v-for="(item, index) in items"
      :key="item.value ?? index"
      :class="pohon.item({ class: [props.pohon?.item, item.pohon?.item, item.class] })"
      :data-state="getItemState(index)"
    >
      <div :class="pohon.container({ class: [props.pohon?.container, item.pohon?.container] })">
        <PAvatar
          :size="size"
          :icon="item.icon"
          v-bind="typeof item.avatar === 'object' ? item.avatar : {}"
          :class="pohon.indicator({ class: [props.pohon?.indicator, item.pohon?.indicator] })"
          :ui="{ icon: 'text-inherit', fallback: 'text-inherit' }"
        >
          <slot
            :name="((item.slot ? `${item.slot}-indicator` : 'indicator') as keyof TimelineSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          />
        </PAvatar>

        <Separator
          v-if="index < items.length - 1"
          :class="pohon.separator({ class: [props.pohon?.separator, item.pohon?.separator] })"
          :orientation="props.orientation"
        />
      </div>

      <div :class="pohon.wrapper({ class: [props.pohon?.wrapper, item.pohon?.wrapper] })">
        <div
          v-if="item.date"
          :class="pohon.date({ class: [props.pohon?.date, item.pohon?.date] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-date` : 'date') as keyof TimelineSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          >
            {{ item.date }}
          </slot>
        </div>
        <div
          v-if="item.title || !!slots.title"
          :class="pohon.title({ class: [props.pohon?.title, item.pohon?.title] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-title` : 'title') as keyof TimelineSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          >
            {{ item.title }}
          </slot>
        </div>
        <div
          v-if="item.description || !!slots.description"
          :class="pohon.description({ class: [props.pohon?.description, item.pohon?.description] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description` : 'description') as keyof TimelineSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          >
            {{ item.description }}
          </slot>
        </div>
      </div>
    </div>
  </APrimitive>
</template>
