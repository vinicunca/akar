<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  AStepperRootEmits,
  AStepperRootProps,
} from 'akar';
import type { PIconProps } from '../types';
import type { DynamicSlots } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/stepper';

type Stepper = ComponentConfig<typeof theme, AppConfig, 'stepper'>;

export interface PStepperItem {
  slot?: string;
  value?: string | number;
  title?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  content?: string;
  disabled?: boolean;
  class?: any;
  pohon?: Pick<Stepper['slots'], 'item' | 'container' | 'trigger' | 'indicator' | 'icon' | 'separator' | 'wrapper' | 'title' | 'description'>;
  [key: string]: any;
}

export interface PStepperProps<T extends PStepperItem = PStepperItem> extends Pick<AStepperRootProps, 'linear'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  items: Array<T>;
  /**
   * @defaultValue 'md'
   */
  size?: Stepper['variants']['size'];
  /**
   * @defaultValue 'primary'
   */
  color?: Stepper['variants']['color'];
  /**
   * The orientation of the stepper.
   * @defaultValue 'horizontal'
   */
  orientation?: Stepper['variants']['orientation'];
  /**
   * The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.
   */
  defaultValue?: string | number;
  disabled?: boolean;
  class?: any;
  pohon?: Stepper['slots'];
}

export type PStepperEmits<T extends PStepperItem = PStepperItem> = Omit<AStepperRootEmits, 'update:modelValue'> & {
  next: [value: T];
  prev: [value: T];
};

type SlotProps<T extends PStepperItem> = (props: { item: T }) => any;

export type PStepperSlots<T extends PStepperItem = PStepperItem> = {
  indicator: (props: { item: T; pohon: Stepper['pohon'] }) => any;
  wrapper: SlotProps<T>;
  title: SlotProps<T>;
  description: SlotProps<T>;
  content: SlotProps<T>;
} & DynamicSlots<T, 'wrapper' | 'title' | 'description', { item: T }>;

</script>

<script setup lang="ts" generic="T extends PStepperItem">
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  AStepperDescription,
  AStepperIndicator,
  AStepperItem,
  AStepperRoot,
  AStepperSeparator,
  AStepperTitle,
  AStepperTrigger,
  useForwardProps,
} from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PStepperProps<T>>(),
  {
    orientation: 'horizontal',
    linear: true,
  },
);
const emits = defineEmits<PStepperEmits<T>>();
const slots = defineSlots<PStepperSlots<T>>();

const modelValue = defineModel<string | number>();

const appConfig = useAppConfig() as Stepper['AppConfig'];
const pohonProp = useComponentPohon('stepper', props);

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'linear'));

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.stepper || {}),
  })({
    orientation: props.orientation,
    size: props.size,
    color: props.color,
  }),
);

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue;

    return ((isString(value))
      ? props.items.findIndex((item) => item.value === value)
      : value) ?? 0;
  },
  set(value: number) {
    modelValue.value = props.items?.[value]?.value ?? value;
  },
});

const currentStep = computed(() => props.items?.[currentStepIndex.value]);
const hasNext = computed(() => currentStepIndex.value < props.items?.length - 1);
const hasPrev = computed(() => currentStepIndex.value > 0);

defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1;
      emits('next', currentStep.value as T);
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1;
      emits('prev', currentStep.value as T);
    }
  },
  hasNext,
  hasPrev,
});
</script>

<template>
  <AStepperRoot
    v-bind="rootProps"
    v-model="currentStepIndex"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    data-pohon="stepper-root"
  >
    <div
      :class="pohon.header({ class: pohonProp?.header })"
      data-pohon="stepper-header"
    >
      <AStepperItem
        v-for="(item, count) in items"
        :key="item.value ?? count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        :class="pohon.item({ class: [pohonProp?.item, item.pohon?.item, item.class] })"
        data-pohon="stepper-item"
      >
        <div
          :class="pohon.container({ class: [pohonProp?.container, item.pohon?.container] })"
          data-pohon="stepper-container"
        >
          <AStepperTrigger
            :class="pohon.trigger({ class: [pohonProp?.trigger, item.pohon?.trigger] })"
            data-pohon="stepper-trigger"
          >
            <AStepperIndicator
              :class="pohon.indicator({ class: [pohonProp?.indicator, item.pohon?.indicator] })"
              data-pohon="stepper-indicator"
            >
              <slot
                name="indicator"
                :item="item"
                :pohon="pohon"
              >
                <PIcon
                  v-if="item.icon"
                  :name="item.icon"
                  :class="pohon.icon({ class: [pohonProp?.icon, item.pohon?.icon] })"
                  data-pohon="stepper-icon"
                />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </AStepperIndicator>
          </AStepperTrigger>

          <AStepperSeparator
            v-if="count < items.length - 1"
            :class="pohon.separator({ class: [pohonProp?.separator, item.pohon?.separator] })"
            data-pohon="stepper-separator"
          />
        </div>

        <div
          :class="pohon.wrapper({ class: [pohonProp?.wrapper, item.pohon?.wrapper] })"
          data-pohon="stepper-wrapper"
        >
          <slot
            :name="((item.slot ? `${item.slot}-wrapper` : 'wrapper') as keyof PStepperSlots<T>)"
            :item="(item as Extract<T, { slot: string; }>)"
          >
            <AStepperTitle
              v-if="item.title || !!slots[(item.slot ? `${item.slot}-title` : 'title') as keyof PStepperSlots<T>]"
              as="div"
              data-pohon="stepper-title"
              :class="pohon.title({ class: [pohonProp?.title, item.pohon?.title] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-title` : 'title') as keyof PStepperSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
              >
                {{ item.title }}
              </slot>
            </AStepperTitle>

            <AStepperDescription
              v-if="item.description || !!slots[(item.slot ? `${item.slot}-description` : 'description') as keyof PStepperSlots<T>]"
              as="div"
              data-pohon="stepper-description"
              :class="pohon.description({ class: [pohonProp?.description, item.pohon?.description] })"
            >
              <slot
                :name="((item.slot ? `${item.slot}-description` : 'description') as keyof PStepperSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
              >
                {{ item.description }}
              </slot>
            </AStepperDescription>
          </slot>
        </div>
      </AStepperItem>
    </div>

    <div
      v-if="currentStep?.content || !!slots.content || currentStep?.slot"
      :class="pohon.content({ class: pohonProp?.content })"
      data-pohon="stepper-content"
    >
      <slot
        :name="((currentStep?.slot || 'content') as keyof PStepperSlots<T>)"
        :item="(currentStep as Extract<T, { slot: string }>)"
      >
        {{ currentStep?.content }}
      </slot>
    </div>
  </AStepperRoot>
</template>
